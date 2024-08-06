import mongoose from "mongoose";

const website = mongoose.Schema;

const websiteSchema = new website(
  {
    html: { type: "string", required: [true, "Html is required"] },
    instituteId: {
      type: "string",
      required: [true, "Institue id is required"],
    },
    css: { type: "string", required: [true, "css is required"] },
  },
  {
    timestamps: true,
  }
);

export const Website = mongoose.model("Webiste", websiteSchema);
