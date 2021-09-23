import express from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const router = express.Router();

const CheckJSONwebToken = (token, uid, id) => {
  const data = jwt.verify(token, process.env.JWT_AUTH_TOKEN);
  if (data) {
    const SerializedData = JSON.parse(data);
    if (SerializedData.uid === uid && SerializedData.id === id) {
      return SerializedData;
    }
    return null;
  }
  return null;
};

router.post("/", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader('Access-Control-Allow-Credentials', "'true'");
  console.log(req.cookies);
  try {
    const { authToken, uid } = req.cookies;
    const { id } = req.body;
    const data = CheckJSONwebToken(authToken, uid, id);
    if (data) {
      return res.json({ error: false, authStatus: true });
    }
    return res.json({ error: false, authStatus: false });
  } catch {
    return res.json({ error: true, authStatus: false });
  }
});

export default router;
