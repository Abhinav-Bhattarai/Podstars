import crypto from 'crypto-js';
import dotenv from 'dotenv';

dotenv.config();

export const Encrypt = (data) => {
    const SerializedData = JSON.stringify(data);
    const byte = crypto.AES.encrypt(SerializedData, process.env.ENCRYPTION_TOKEN).toString();
    return byte;
};

export const Decrypt = (encryptedData) => {
    const Data = crypto.AES.decrypt(encryptedData, process.env.ENCRYPTION_TOKEN).toString(crypto.enc.Utf8);
    if (Data) return JSON.parse(Data);
    return  null;
}