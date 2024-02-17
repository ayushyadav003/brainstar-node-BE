import jwt from "jsonwebtoken";
import { User } from "";
const { generateAccessToken, generateRefreshToken } = require("../utils/auth");

const checkAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer ")) {
      const token = authHeader.split(" ")[1];
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

      // Check if access token has expired
      if (decodedToken.exp <= Date.now() / 1000) {
        const user = await User.findById(decodedToken.sub);
        // Check if user exists and has a refresh token
        if (!user || !user.refreshToken) {
          throw new Error("Unauthorized");
        }
        // Verify refresh token and generate new access token
        jwt.verify(
          user.refreshToken,
          process.env.JWT_SECRET,
          (err, decoded) => {
            if (err) {
              throw new Error("Unauthorized");
            }

            const accessToken = generateAccessToken(user.id);
            res.setHeader("Authorization", "Bearer " + accessToken);
            next();
          }
        );
      } else {
        next();
      }
    } else {
      throw new Error("Unauthorized");
    }
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};
