import * as crypto from 'crypto';

export class EncryptionService {
  private static readonly algorithm = 'aes-256-cbc';

  // CLAVE FIJA DE 32 BYTES
  private static readonly key = Buffer.from(
    '12345678901234567890123456789012',
    'utf8',
  );

  static encrypt(text: string): string {
    const iv = crypto.randomBytes(16);

    const cipher = crypto.createCipheriv(
      this.algorithm,
      this.key,
      iv,
    );

    let encrypted = cipher.update(
      text,
      'utf8',
      'hex',
    );

    encrypted += cipher.final('hex');

    return `${iv.toString('hex')}:${encrypted}`;
  }

  static decrypt(text: string): string {
    const [ivHex, encryptedHex] =
      text.split(':');

    const decipher =
      crypto.createDecipheriv(
        this.algorithm,
        this.key,
        Buffer.from(ivHex, 'hex'),
      );

    let decrypted = decipher.update(
      encryptedHex,
      'hex',
      'utf8',
    );

    decrypted += decipher.final('utf8');

    return decrypted;
  }
}