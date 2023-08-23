import CryptoJS from 'crypto-js';

const SECRET_KEY = process.env.SECRET_KEY || 'password';

export const encrypt = (data: string) => {
  const encrypted = CryptoJS.AES.encrypt(data, SECRET_KEY);
  return encrypted.toString();
};

export const decrypt = (data: string) => {
  const decrypt = CryptoJS.AES.decrypt(data, SECRET_KEY).toString(CryptoJS.enc.Utf8);
  return decrypt.toString();
};