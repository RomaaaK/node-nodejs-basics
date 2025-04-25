import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { pipeline } from 'stream/promises';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const write = async () => {
    const destinationPath = path.join(__dirname, 'files', 'fileToWrite.txt');

    try {
        await pipeline(
            process.stdin,
            fs.createWriteStream(destinationPath)
        );
    } catch {
        throw new Error('FS operation failed');
    }
};

await write();