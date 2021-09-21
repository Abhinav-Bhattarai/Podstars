import { Decrypt } from "../Cryptography/crypto.js";

export const LoginMiddleware = (req, res, next) => {
  const { Enc } = req.body;
  const DecryptedData = Decrypt(Enc);
  if (DecryptedData) {
    const { UserName, Password } = DecryptedData;
    if (UserName.length > 4 && Password.length > 7) {
      const number_regex = /[0-9]/;
      if (number_regex.exec(Password) !== null) {
        req.body = DecryptedData;
        next();
      }
      return res.json({
        error: true,
        errorMessage: { Password: "Password Doesnot Have a Number" },
      });
    }
    return res.json({
      error: true,
      errorMessage: { Credentials: "Invalid Credentials" },
    });
  }
  return res.json({
    error: true,
    errorMessage: { Tampering: "The encryption is tampered" },
  });
};