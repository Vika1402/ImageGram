import { checkIfUserExists } from "../services/userService.js";
import { verifyJwt } from "../utils/jwt.js";

export const isAuthenticated = async (req, res, next) => {
  const token = req.headers["access-token"];
  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Token is required",
    });
  }

  try {
    const response = verifyJwt(token);
    const doesUserExists = await checkIfUserExists(response.email);
    if (!doesUserExists) {
      return res.status(404).json({
        success: false,
        message: "user not found",
      });
    }
    req.user = response;
    next();
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Invalid token",
    });
  }
};
