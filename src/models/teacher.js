import mongoose from "mongoose";



const { Types } = mongoose;
const { ObjectId } = Types;

const teacher = mongoose.Schema;
const teacherSchema = new teacher(
  {
    fullName: { type: String, required: [true, "Full name is required"] },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    phoneNumber: {
      type: Number,
      unique: true,
    },
    classes: {
      type: [Number],
      require: [true, "Batch is required"],
      unique: true,
    },
    batches: {
      type: [String],
      require: [true, "Batch is required."],
    },
    role: {
      type: String,
      required: ["Role is required"],
      default: "teacher",
    },
    password:{
      type:String,
      required: ["Pasword is required"],
    },
    instituteId: {
      type: ObjectId,
      ref:"SuperAdmin",
      require: ["Institue Id is required"],
    },
    teacherId: {
      type: ObjectId,
      ref:"Teacher",
      require: ["Teacher Id is required"],
    },
  },

  {
    timestamps: true,
  }
);

export const Teacher = mongoose.model("Teachers", teacherSchema);
