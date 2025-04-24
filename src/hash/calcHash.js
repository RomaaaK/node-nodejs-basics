import path from 'path';
import fs from 'fs/promises';
import { createHash } from 'crypto';
import { fileURLToPath } from 'url';
import { pipeline } from 'stream/promises';
import { createReadStream } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const calculateHash = async () => {
    const filePath = path.join(__dirname, 'files', 'fileToCalculateHashFor.txt');
    const hash = createHash('sha256');

    try {
        await pipeline(createReadStream(filePath), hash);
        const digest = hash.digest('hex');
        console.log(digest);
    } catch (err) {
        console.error('Hashing failed:', err);
    }
};

await calculateHash();