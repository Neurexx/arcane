import crypto from 'crypto';

// const normalizeKey = (key) => {
//     if (Buffer.isBuffer(key)) {
//         // If key is already a buffer, ensure it's 32 bytes
//         if (key.length === 32) return key;

//         // If not 32 bytes, hash it to get exactly 32 bytes
//         return crypto.createHash('sha256').update(key).digest();
//     }

//     // If key is a string or other type, convert to buffer and ensure 32 bytes
//     return crypto.createHash('sha256').update(String(key)).digest();
// };

export const encrypt = (text, key, iv) => {
    const algorithm = 'aes-256-cbc';

    const cipher = crypto.createCipheriv(algorithm, key, iv);

    let encrypted = cipher.update(text, 'utf8', 'hex'); // 0123456789ABCDEF
    encrypted += cipher.final('hex');
    return encrypted;
}

export const decrypt = (encrypted, key, iv) => {
    const algorithm = 'aes-256-cbc';
    const decipher = crypto.createDecipheriv(algorithm, key, iv);
    let decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
}

export const generateKey = () => {
    const key = crypto.randomBytes(32);
    return key;
};

export const generateIV = () => {
    const iv = crypto.randomBytes(16);
    return iv;
};

