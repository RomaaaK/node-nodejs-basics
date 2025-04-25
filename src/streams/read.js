import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const read = async () => {
    const sourcePath = path.join(__dirname, 'files', 'fileToRead.txt');
    const stream = fs.createReadStream(sourcePath, { encoding: 'utf-8' });

    let dataBuffer = '';

    stream.on('error', () => {
        throw new Error('FS operation failed');
    });

    stream.on('data', chunk => {
        dataBuffer += chunk;
    });

    stream.on('end', () => {
        if (!dataBuffer.endsWith('\n')) {
            dataBuffer += '\n';
        }
        process.stdout.write(dataBuffer);
    });
};

await read();
