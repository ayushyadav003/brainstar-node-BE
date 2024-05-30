import asyncHandler from "express-async-handler";
import axios from "axios";
import { Meeting } from "../models/meetings.js";

let zoomToken = null;
let tokenExpiry = 0;

export const createMeeting = asyncHandler(async (req, res) => {
  const {
    startTime,
    topic,
    duration,
    description,
    classId,
    batchId,
    instituteId,
  } = req.body;
  const currentTime = Math.floor(Date.now() / 1000);

  if (!startTime || !endTime || !classId || !batchId || !instituteId) {
    res.status(400).json({
      statusCode: 400,
      message: `${
        !classId
          ? "ClassId"
          : !instituteId
          ? "InstituteId"
          : !startTime
          ? "startTime"
          : !endTime
          ? "endTime"
          : !topic && "topic"
      } is required`,
    });
  }

  try {
    if (!zoomToken || !currentTime < tokenExpiry) {
      const authOptions = {
        url: "https://zoom.us/oauth/token",
        method: "POST",
        params: {
          grant_type: "account_credentials",
          account_id: process.env.ZOOM_ACCOUNT_ID,
        },
        auth: {
          username: process.env.ZOOM_CLIENT_ID,
          password: process.env.ZOOM_CLIENT_SECRET,
        },
      };
      const authResponse = await axios(authOptions);

      if (authResponse?.data?.access_token) {
        zoomToken = authResponse.data.access_token;
        tokenExpiry = authResponse.data.expires_in;
      }
    }

    const meetingOptions = {
      url: "https://api.zoom.us/v2/users/me/meetings",
      method: "POST",
      headers: {
        Authorization: `Bearer ${zoomToken}`,
        "Content-Type": "application/json",
      },
      data: {
        topic: topic,
        type: 2,
        start_time: startTime,
        duration: duration,
        timezone: "Asia/Kolkata",
        settings: {
          join_before_host: true,
          waiting_room: false,
        },
      },
    };
    const meetingResponse = await axios(meetingOptions);

    if (meetingResponse.status !== 201) {
      res.status(400).json({
        statusCode: 400,
        message: "Something went wrong, Please contact support.",
      });
      return;
    }

    const response = meetingResponse.data;
    console.log(response);

    const meetingObject = {
      topic,
      zoom_meetingId: response?.id,
      description,
      join_url: response?.join_url,
      start_url: response?.start_url,
      instituteId,
      classId,
      batchId,
      startTime,
      duration,
    };

    const scheduleMeeting = Meeting.create(meetingObject);
    if (scheduleMeeting) {
      res.status(201).json({
        statusCode: 201,
        message: "Meeting created successfully.",
      });
    } else {
      res.status(400).json({
        statusCode: 400,
        message: "Something went wrong, Please contact support.",
      });
    }
  } catch (error) {
    console.log(error);
  }
});

export const getAllMeetings = asyncHandler(async (req, res) => {
  const { instituteId, classId, batchId, teacherId } = req.body;

  let query = { instituteId, teacherId };

  if (classId) {
    query["classId"] = classId;
  }

  if (batchId) {
    query["batchId"] = batchId;
  }
  const meetings = await Meeting.find(query).lean();
  if (!meetings?.length) {
    return res.status(400).json({ message: "No student found." });
  }

  res.status(200).json({ statusCode: 200, meetings });
});
