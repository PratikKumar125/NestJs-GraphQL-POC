import { randomBytes, createCipheriv, createDecipheriv } from 'crypto';

export class CryptoHelpers {
  static ENCRYPTION_KEY; //must be 256 bits (32 characters)
  static IV_LENGTH;
  constructor() {
    CryptoHelpers.ENCRYPTION_KEY = 'asdfghjklmnbvcxzqwertyuioplkjhgff';
    CryptoHelpers.IV_LENGTH = 16;
  }

  static keyGen() {
    return randomBytes(32).toString('hex');
  }

  static encrypt(
    plainText,
    keyHex = CryptoHelpers.ENCRYPTION_KEY,
  ) {
    const iv = randomBytes(CryptoHelpers.IV_LENGTH);
    const cipher = createCipheriv(
      'aes-256-cbc',
      Buffer.from(keyHex, 'hex'),
      iv,
    );
    const encrypted = Buffer.concat([
      cipher.update(plainText, 'utf8'),
      cipher.final(),
    ]);
    return iv.toString('hex') + ':' + encrypted.toString('hex');
  }

  static decrypt(text, keyHex = CryptoHelpers.ENCRYPTION_KEY) {
    const [ivHex, encryptedHex] = text.split(':');
    if (!ivHex || !encryptedHex) {
      throw new Error('Invalid or corrupted cipher format');
    }

    const encryptedText = Buffer.from(encryptedHex, 'hex');
    const decipher = createDecipheriv(
      'aes-256-cbc',
      Buffer.from(keyHex, 'hex'),
      Buffer.from(ivHex, 'hex'),
    );
    let decrypted = Buffer.concat([
      decipher.update(encryptedText),
      decipher.final(),
    ]);

    return decrypted.toString();
  }
}
