import { Decrypt } from "../Cryptography/crypto.js";

export const SignupMiddleware = (req, res, next) => {
  const { Enc } = req.body;
  const DecryptedData = Decrypt(Enc);
  if (DecryptedData) {
    const { UserName, Password, Confirm, Email } = DecryptedData;
    if (
      UserName.length > 4 &&
      Password.length > 7 &&
      Confirm === Password &&
      Email.length > 11
    ) {
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
