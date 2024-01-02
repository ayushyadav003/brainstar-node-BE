import { rateLimit } from "express-rate-limit";

export const loginLimitter = rateLimit({
  windowMs: 60 * 1000,
  max: 5,
  message: {
    message:
      "Too many login attempts from this IP, please try again after a 60 second pause",
  },
  handler: (req, res, next, options) => {
    console.log(
      `Too many  requests ${options.message.message}\t ${req.method}\t ${req.method}\t${req.url}\t ${req.headers.origin}`
    );
    res.status(options.statusCode).send(options.message);
  },
  standardHeaders: true,
  legacyHeaders: false,
});
