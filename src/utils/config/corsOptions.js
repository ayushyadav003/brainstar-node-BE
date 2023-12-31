import { allowedOrigins } from "./allowOrigins";

export const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by cors."));
    }
  },
  credential: true,
  optionSuccessStatus: 200,
};
