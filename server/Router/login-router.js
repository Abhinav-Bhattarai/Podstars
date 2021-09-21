import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { LoginMiddleware } from "../Middleware/LoginMiddleware.js";
import { UserModel } from "../Models/userModel.js";

const router = express.Router();

const CompareHash = async (Password, Hash) => {
  const status = await bcrypt.compare(Password, Hash);
  return status;
};

export const GenerateJWTToken = (data) => {
  const SerializedData = JSON.stringify(data);
  const token = jwt.sign(SerializedData, process.env.JWT_AUTH_TOKEN, {
    expiresIn: "3d",
  });
  return token;
};

const ValidateAuthenticationStatus = async (config) => {
  const { UserName, Password } = config;
  const data = await UserModel.findOne({ UserName });
  if (data) {
    const hashStatus = await CompareHash(Password, data.Password);
    if (hashStatus) {
      return { UserName, uid: data.uid, id: data._id };
    }
  }
  return null;
};

router.post("/", LoginMiddleware, async(req, res) => {
  const AuthenticationStatus = await ValidateAuthenticationStatus(req.body);
  if (AuthenticationStatus) {
    const token = GenerateJWTToken(AuthenticationStatus);
    if (token) {
      res.setHeader("Set-Cookie", [
        `authToken: ${token}; SameSite=Strict; httponly`,
        `uid: ${AuthenticationStatus.uid}; httpOnly; SameSite=Strict`,
      ]);
      return res.json({ authStatus: true });
    }
  }
});

export default router;
