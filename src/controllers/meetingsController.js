import asyncHandler from "express-async-handler";
import axios from "axios";
import { Meeting } from "../models/meetings.js";

let zoomToken = null;
let tokenExpiry = 0;

const durationObj = {
  "30 min": 30,
  "45 min": 45,
  "1 hr": 60,
  "2 min": 120,
};

function formatDateTime(hour, minute) {
  const now = new Date();
  now.setUTCHours(hour, minute, 0, 0);
  const formattedDateTime = now.toISOString();
  return formattedDateTime;
}

export const createMeeting = asyncHandler(async (req, res) => {
  const {
    startTime,
    title,
    duration,
    description,
    classId,
    batch,
    instituteId,
  } = req.body;
  const currentTime = Math.floor(Date.now() / 1000);

  if (!startTime || !duration || !title || !classId || !batch || !instituteId) {
    res.status(400).json({
      statusCode: 400,
      message: `${
        !classId
          ? "Class"
          : !instituteId
          ? "InstituteId"
          : !startTime
          ? "Staet Time"
          : !duration
          ? "Duration"
          : !title && "Title"
      } is required`,
    });
  }
  const splittedTime = startTime.split(":");

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
        topic: title,
        type: 2,
        start_time: formatDateTime(splittedTime[0], splittedTime[1]),
        duration: durationObj[duration],
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
      topic: title,
      zoom_meetingId: response?.id,
      description,
      join_url: response?.join_url,
      start_url: response?.start_url,
      instituteId,
      classId,
      batch,
      startTime,
      duration,
    };

    const scheduleMeeting = Meeting.create(meetingObject);
    if (scheduleMeeting) {
      res.status(201).json({
        statusCode: 201,
        data: {
          message: "Meeting created successfully.",
        },
      });
    } else {
      res.status(200).json({
        statusCode: 400,
        data: {
          message: "Something went wrong, Please contact support.",
        },
      });
    }
  } catch (error) {
    console.log(error);
  }
});

export const getAllMeetings = asyncHandler(async (req, res) => {
  const { instituteId, classId, batchId } = req.query;

  let query = { instituteId };

  if (classId) {
    query["classId"] = classId;
  }

  if (batchId) {
    query["batchId"] = batchId;
  }
  const meetings = await Meeting.find(query).lean();

  if (!meetings) {
    return res
      .status(200)
      .json({ statusCode: 404, data: { message: "No Meetings found." } });
  }

  res.status(200).json({ statusCode: 200, meetings });
});
