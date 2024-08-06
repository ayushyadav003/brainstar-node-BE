import asyncHandler from "express-async-handler";
import bcrypt from "bcrypt";
import { User } from "../models/User.js";
import { Student } from "../models/student.js";
import { Teacher } from "../models/teacher.js";
import { SuperAdmin } from "../models/superAdmin.js";
import otpGenerator from "otp-generator";
import Cache from "cache";
import nodeMailer from "nodemailer";
const memoryCache = new Cache(30 * 1000);

// POST /auth
// public
export const login = asyncHandler(async (req, res) => {
  const { email, password, role } = req.body;
  if (!email || !password) {
    return res
      .status(200)
      .json({ statusCode: 400, message: "All fields are required.`" });
  }

  var foundUser;

  foundUser = await Student.findOne({ email }).exec();

  if (!foundUser) {
    foundUser = await Teacher.findOne({ email }).exec();
  }
  if (!foundUser) {
    foundUser = await User.findOne({ email }).exec();
  }

  if (!foundUser) {
    return res
      .status(200)
      .json({ statusCode: 404, message: "No user found with this email" });
  }

  const match = await bcrypt.compare(password, foundUser.password);

  if (!match)
    return res
      .status(200)
      .json({ statusCode: 401, message: "Wrong password." });

  // const accessToken = Jwt.sign(
  //   {
  //     userInfo: {
  //       email: foundUser.email,
  //       role: foundUser.role,
  //     },
  //   },
  //   process.env.ACCESS.TOKEN_SECRET,
  //   { expireIn: "30d" }
  // );
  // const refreshToken = Jwt.sign(
  //   {
  //     userInfo: {
  //       email: foundUser.email,
  //     },
  //   },
  //   process.env.ACCESS.TOKEN_SECRET,
  //   { expireIn: "1d" }
  // );

  delete foundUser.password;
  return res.status(200).json({
    statusCode: 200,
    message: "Login successful",
    data: { foundUser },
  });
});

export const sendOtp = async (req, res) => {
  const { email } = req.body;

  if (!email)
    return res.status(401).json({ message: "Wrong credentials provided" });

  const user = await SuperAdmin.findOne({ email });

  if (user) return res.status(400).json("User already exist");

  const generatedOtp = otpGenerator.generate(4, {
    lowerCaseAlphabets: false,
    upperCaseAlphabets: false,
    specialChars: false,
  });

  const transporter = nodeMailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: "rs20021023@gmail.com   ",
      pass: "sjpg crnj kpto xgoq",
    },
  });

  const mailOptions = {
    from: {
      name: "Brainster",
      address: "rs20021023@gmail.com",
    },
    to: email,
    subject: "Your One Time Password For Brainster",
    html: `
    <p>OTP-${generatedOtp}
    <p>Ignore this mail if you haven't tried to register on Brainster</p>`,
  };

  try {
    await transporter.sendMail(mailOptions);
    memoryCache.put("generatedOtp", generatedOtp);
    res.status(200).json("Otp sent successfully");
  } catch (error) {
    console.log(error);
    res.status(500).json("Otp not sent");
  }
};

export const superAdminSignup = asyncHandler(async (req, res) => {
  const generatedOtp = memoryCache.get("generatedOtp");

  const { userOtp, email, password, phoneNumber, instituteName, fullName } =
    req.body;

  if (!generatedOtp)
    return res
      .status(500)
      .json({ message: "Otp expired please generated a new Otp" });
  if (userOtp === generatedOtp) {
    const superAdmin = await SuperAdmin.findOne({ email });

    if (superAdmin)
      return res.status(400).json({ message: "User already exist" });

    //TODO:
    // CREATE INSTITUTE ID WITH UUD PACKAGE

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    const newSuperAdmin = await SuperAdmin.create({
      fullName,
      email,
      password: hashedPassword,
      phoneNumber,
      instituteName,
    });

    return res.status(201).json({
      statusCode: 201,
      message: "Institute created",
      data: newSuperAdmin,
    });
  } else {
    res.status(401).json({ message: "Wrong otp entered" });
  }
});

export const superAdminLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const superAdmin = await SuperAdmin.findOne({ email });

  if (!superAdmin)
    return res.status(404).json({ message: "User does not exist" });

  const isPasswordCorrect = await bcrypt.compare(password, superAdmin.password);

  if(!isPasswordCorrect)
    return res.status(404).json({ message: "Wrong password please try again" });

  if (isPasswordCorrect)
    return res.status(200).json({ statusCode: 200, superAdmin })
});
