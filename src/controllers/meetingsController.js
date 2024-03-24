import asyncHandler from "express-async-handler";
import axios from "axios";

let zoomToken = null;
let tokenExpiry = 0;

export const createMeeting = asyncHandler(async (req, res) => {
  const {
    startTime,
    endTime,
    topic,
    duration,
    description,
    classId,
    batchId,
    instituteId,
  } = req.body;
  const currentTime = Math.floor(Date.now() / 1000);

  //   if (!startTime || !endTime || !classId || !batchId || !instituteId) {
  //     res.status(400).json({
  //       statusCode: 400,
  //       message: `${
  //         !classId
  //           ? "ClassId"
  //           : !instituteId
  //           ? "InstituteId"
  //           : !startTime
  //           ? "startTime"
  //           : !endTime
  //           ? "endTime"
  //           : !topic && "topic"
  //       } is required`,
  //     });
  //   }

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
      console.log("Unable to generate meeting link");
      return;
    }

    const response = meetingResponse.data;
    console.log(response);

    res
      .status(200)
      .json({ statusCode: 200, message: "Meeting creates successfuly!" });
  } catch (error) {
    console.log(error);
  }
});
