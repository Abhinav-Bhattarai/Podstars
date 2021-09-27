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

router.get("/", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  try {
    const { authToken, uid, id } = req.cookies;
    const data = CheckJSONwebToken(authToken, uid, id);
    if (data) {
      return res.json({ error: false, authStatus: true });
    }
    res.setHeader('Clear-Site-Data', '"cookies"');
    return res.json({ error: false, authStatus: false });
  } catch {
    res.setHeader('Clear-Site-Data', '"cookies"');
    return res.json({ error: true, authStatus: false });
  }
});

export default router;