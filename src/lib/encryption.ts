import CryptoJS from 'crypto-js';

// Encrypt data with user's password (or derived key)
export function encrypt(data: string, masterPassword: string): string {
  return CryptoJS.AES.encrypt(data, masterPassword).toString();
}

// Decrypt data
export function decrypt(encryptedData: string, masterPassword: string): string {
  const bytes = CryptoJS.AES.decrypt(encryptedData, masterPassword);
  return bytes.toString(CryptoJS.enc.Utf8);
}

// Generate encryption key from user password (PBKDF2)
export function deriveKey(password: string, salt: string): string {
  return CryptoJS.PBKDF2(password, salt, {
    keySize: 256 / 32,
    iterations: 1000,
  }).toString();
}