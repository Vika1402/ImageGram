import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import {
  createUser,
  findUserByEmail,
} from "../repositories/userRepositories.js";
import { generateTokens } from "../utils/jwt.js";

const signupUserService = async (user) => {
  try {
    const newUser = await createUser(user);
    return newUser;
  } catch (error) {
    console.log("Service error", error.message);
    if (error.name === "MongoServerError" && error.code === 11000) {
      throw {
        status: 400,
        message: "user already exists",
      };
    }
    console.log("validation Error");
    throw error;
  }
};
export default signupUserService;

export const signinUserService = async (userDetail) => {
  try {
    const user = await findUserByEmail(userDetail.email);
    if (!user) {
      throw {
        status: 404,
        message: "user email not found",
      };
    }

    const isPassword = bcrypt.compareSync(userDetail.password, user.password);
    if (!isPassword) {
      throw {
        status: 401,
        message: "Invalid password",
      };
    }

    const token = generateTokens({
      email: user.email,
      _id: user._id,
      username: user.username,
    });
    return token;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const checkIfUserExists = async (email) => {
  try {
    const user = await findUserByEmail(email);
    return user;
  } catch (error) {
    throw error;
  }
};
