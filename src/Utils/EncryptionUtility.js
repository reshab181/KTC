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

// export const decryptData = (encryptedData) => {


//   const ClientID = '!IV@_$2123456789';
//   const ClientKey = '*F-JaNdRfUjXn2r5u8x/A?D(G+KbPeSh';
//   const rawData = CryptoJS.enc.Base64.parse(encryptedData);
//   const key = CryptoJS.enc.Latin1.parse(ClientKey);
//   const iv = CryptoJS.enc.Latin1.parse(ClientID);

//   const decryptedData = CryptoJS.AES.decrypt(
//     {
//       ciphertext: rawData
//     },
//     key,
//     { iv: iv }
//   );

//   return JSON.parse(decryptedData.toString(CryptoJS.enc.Utf8));
// };



// export const decryptData = (encryptedData) => {
//   try {
//     const ClientID = '!IV@_$2123456789';
//     const ClientKey = '*F-JaNdRfUjXn2r5u8x/A?D(G+KbPeSh';

//     // Convert ClientKey and IV to Utf8
//     const key = CryptoJS.enc.Utf8.parse(ClientKey);
//     const iv = CryptoJS.enc.Utf8.parse(ClientID);

//     // Decode Base64 Encrypted Data
//     const rawData = CryptoJS.enc.Base64.parse(encryptedData);

//     // Decrypt the Data
//     const decrypted = CryptoJS.AES.decrypt(
//       { ciphertext: rawData },
//       key,
//       { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 }
//     );

//     // Convert decrypted data to string
//     const decryptedText = decrypted.toString(CryptoJS.enc.Utf8);
    
//     // Check if decrypted text is valid JSON
//     return decryptedText ? JSON.parse(decryptedText) : null;

//   } catch (error) {
//     console.error("Decryption failed:", error);
//     return null;
//   }
// };
export const decryptData = (encryptedData) => {
  try {
    console.log("Incoming encryptedData:", encryptedData);
    if (typeof encryptedData !== 'string') {
      console.error("Error: encryptedData is not a string!");
      return null;
    }

    
    if (encryptedData.length % 4 !== 0) {
      console.error("Error: encryptedData does not seem to be Base64 encoded!");
      return null;
    }

    const ClientID = '!IV@_$2123456789';
    const ClientKey = '*F-JaNdRfUjXn2r5u8x/A?D(G+KbPeSh';

    
    const key = CryptoJS.enc.Utf8.parse(ClientKey);
    const iv = CryptoJS.enc.Utf8.parse(ClientID);

   
    const rawData = CryptoJS.enc.Base64.parse(encryptedData);


    const decrypted = CryptoJS.AES.decrypt(
      { ciphertext: rawData },
      key,
      { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 }
    );

    const decryptedText = decrypted.toString(CryptoJS.enc.Utf8);

    if (decryptedText) {
      try {
        const jsonData = JSON.parse(decryptedText);
        return jsonData;
      } catch (e) {
        console.error("Error parsing decrypted data as JSON:", e);
        return null;
      }
    }

    return null;

  } catch (error) {
    console.error("Decryption failed:", error);
    return null;
  }
};