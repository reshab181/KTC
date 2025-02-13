import CryptoJS from 'crypto-js';


export const encryptPayload = (data) => {
  const ClientID = '!IV@_$2123456789';
  const ClientKey = '*F-JaNdRfUjXn2r5u8x/A?D(G+KbPeSh';
  const CryptoJsCI = CryptoJS.enc.Utf8.parse(ClientID);
  const CryptoJsCK = CryptoJS.enc.Utf8.parse(ClientKey);
  const encryptedData = CryptoJS.AES.encrypt(JSON.stringify(data), CryptoJsCK, {
    iv: CryptoJsCI,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });

  return encryptedData.ciphertext.toString(CryptoJS.enc.Base64);
};

export const decryptData = (encryptedData) => {
  const ClientID = '!IV@_$2123456789';
  const ClientKey = '*F-JaNdRfUjXn2r5u8x/A?D(G+KbPeSh';
  const rawData = CryptoJS.enc.Base64.parse(encryptedData);
  const key = CryptoJS.enc.Latin1.parse(ClientKey);
  const iv = CryptoJS.enc.Latin1.parse(ClientID);

  const decryptedData = CryptoJS.AES.decrypt(
    {
      ciphertext: rawData
    },
    key,
    { iv: iv }
  );

  return JSON.parse(decryptedData.toString(CryptoJS.enc.Utf8));
};