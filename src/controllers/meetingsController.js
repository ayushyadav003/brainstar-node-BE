import express from "express";
import { GooggoogleleApis } from "googleapis";

export const scheduleMeetings = asyncHandler(async (req, res) => {
  const auth2Client = new google.auth.OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    process.env.REDIRECT_URL
  );
});
