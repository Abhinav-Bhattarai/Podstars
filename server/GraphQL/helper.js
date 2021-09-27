import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const CheckAuthorization = (authToken, userID, uid) => {
  const data = jwt.verify(authToken, process.env.JWT_AUTH_TOKEN);
  if (data) {
    if (typeof data !== "string") {
      if (data.uid === uid && data.userID === userID) {
        return true;
      }
      return false;
    }
    return false;
  }
  return false;
};