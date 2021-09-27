import { Decrypt } from "../Cryptography/crypto.js";

export const LoginMiddleware = (req, res, next) => {
  const { Enc } = req.body;
  const DecryptedData = Decrypt(Enc);
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  if (DecryptedData) {
    const { UserName, Password } = DecryptedData;
    if (UserName.length > 4 && Password.length > 7) {
      const number_regex = /[0-9]/;
      if (number_regex.exec(Password) !== null) {
        req.body = DecryptedData;
        next();
      } else {
        return res.json({
          error: true,
          errorMessage: { Password: "Password Doesnot Have a Number" },
        });
      }
    } else {
      return res.json({
        error: true,
        errorMessage: { Credentials: "Invalid Credentials" },
      });
    }
  } else {
    return res.json({
      error: true,
      errorMessage: { Tampering: "The encryption is tampered" },
    });
  }
};
