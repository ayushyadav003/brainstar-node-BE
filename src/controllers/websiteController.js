import { Website } from "../models/website.js";

export const createWebsite = async (req, res) => {
  const { html, css, instituteId } = req.body;

  if (!html || !css || !instituteId) {
    return res
      .status(400)
      .json({ statusCode: 400, message: "All fields must be provided." });
  }

  const website = new Website({
    instituteId,
    html,
    css,
  });

  await website.save();

  res.status(200).json({
    statusCode: 200,
    message: "Website created",
    data: website,
  });
};
export const updateWebsite = async (req, res) => {
  const { instituteId, websiteId, updatedWebsite } = req.body;
  const website = await Website.findOneAndUpdate(
    {
      instituteId,
      _id: websiteId,
    },
    { $set: updatedWebsite },
    { new: true }
  );

  if (!website) {
    return res.status(403).json({
      statusCode: 403,
      message: `Website cannot be updated try again`,
    });
  }

  return res.status(200).json({
    statusCode: 200,
    message: "Website updated",
    data: website,
  });
};
export const deleteWebsite = async (req, res) => {
  const { instituteId, websiteId } = req.body;
  const website = await Website.findOneAndDelete({
    instituteId,
    _id: websiteId,
  });

  if (!website) {
    return res.status(403).json({
      statusCode: 403,
      message: `Website cannot be deleted try again`,
    });
  }

  return res.status(200).json({
    statusCode: 200,
    message: "Website deleted",
    data: website,
  });
};
export const getWebsite = async (req, res) => {
  const { instituteId } = req.params;

  if (!instituteId) {
    const website = await Website.find();
    return res.status(200).json({
      statusCode: 200,
      message: "All websites",
      data: website,
    });
  }

  const website = await Website.findOne({ instituteId });

  if (!website) {
    return res.status(404).json({
      statusCode: 404,
      message: `Website with ${instituteId} is not present`,
    });
  }

  return res.status(200).json({
    statusCode: 200,
    message: "single website fetched",
    data: website,
  });
};
