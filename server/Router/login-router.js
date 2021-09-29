import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { LoginMiddleware } from "../Middleware/LoginMiddleware.js";
import { UserModel } from "../Models/userModel.js";
import dotenv from "dotenv";
dotenv.config();

const router = express.Router();

const CompareHash = async (Password, Hash) => {
  const status = await bcrypt.compare(Password, Hash);
  return status;
};

export const GenerateJWTToken = (data) => {
  // const SerializedData = JSON.stringify(data);
  const token = jwt.sign(data, process.env.JWT_AUTH_TOKEN, {
    expiresIn: "3d",
  });
  return token;
};

const ValidateAuthenticationConfig = async (config) => {
  const { UserName, Password } = config;
  const data = await UserModel.findOne({ UserName });
  if (data) {
    const hashStatus = await CompareHash(Password, data.Password);
    if (hashStatus) {
      return { UserName, uid: data.uid, id: data._id };
    }
    return null;
  }
  return null;
};

router.post("/", LoginMiddleware, async (req, res) => {
  const AuthenticationConfig = await ValidateAuthenticationConfig(req.body);
  if (AuthenticationConfig) {
    const token = GenerateJWTToken(AuthenticationConfig);
    if (token) {
      const cookie_option = {
        httpOnly: true,
        sameSite: 'strict',
        secure: true
      }
      res.cookie("authToken", token, cookie_option);
      res.cookie("uid", AuthenticationConfig.uid, cookie_option);
      res.cookie("id", AuthenticationConfig.id, cookie_option);
      return res.json({
        authStatus: true,
        error: false,
        userID: AuthenticationConfig.id,
        UserName: req.body.UserName,
      });
    } else {
      return res.json({
        authStatus: false,
        error: false,
      });
    }
  } else {
    return res.json({
      authStatus: false,
      error: false,
    });
  }
});

export default router;