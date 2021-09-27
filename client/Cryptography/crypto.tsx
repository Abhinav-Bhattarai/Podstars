import crpyto from "crypto-js";

export const Encrypt = (data: object) => {
  const SerializedData = JSON.stringify(data);
  const byte = crpyto.AES.encrypt(SerializedData, "VJ02394JGKP0@!").toString();
  return byte;
};

export const Decrypt = (enc: string) => {
  const byte = crpyto.AES.decrypt(enc, "VJ02394JGKP0@!").toString(crpyto.enc.Utf8);
  const SerializedData = JSON.parse(byte);
  return SerializedData;
};
