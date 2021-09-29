import express from "express";
import bcrypt from "bcrypt";
import { SignupMiddleware } from "../Middleware/SignupMiddleware.js";
import { UserModel } from "../Models/userModel.js";
import { GenerateJWTToken } from "./login-router.js";

const router = express.Router();

const HashThisString = async (string) => {
  const hashedString = await bcrypt.hash(string, 12);
  return hashedString;
};

export const CheckUserRedundency = async (Username) => {
  const response = await UserModel.findOne({ Username });
  if (response) return true;
  return false;
};

router.post("/", SignupMiddleware, async (req, res) => {
  let { UserName, Password, Email } = req.body;
  Password = await HashThisString(Password);
  const UserRedundancyStatus = await CheckUserRedundency(UserName);
  if (UserRedundancyStatus === false) {
    const data = new UserModel({
      Username: UserName,
      Password,
      Email,
    });
    const response = await data.save();
    const config = { UserName, uid: response.uid, id: response._id };
    const token = GenerateJWTToken(config);
    if (token) {
      const cookie_option = {
        httpOnly: true,
        sameSite: 'strict',
        secure: true,
        expires: new Date(new Date().getTime()+86409000).toUTCString()
      }
      res.cookie("authToken", token, cookie_option);
      res.cookie("uid", response.uid, cookie_option);
      res.cookie("id", response.id, cookie_option);

      return res.json({
        authStatus: true,
        error: false,
        userID: response.id,
        UserName: req.body.UserName,
      });
    } else {
      return res.json({ error: false, authStatus: false });
    }
  } else {
    return res.json({ error: false, authStatus: false });
  }
});

export default router;