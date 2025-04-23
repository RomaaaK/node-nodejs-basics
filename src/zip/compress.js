import path from 'path';
import fs from 'fs';
import zlib from 'zlib';
import { pipeline } from 'stream/promises';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compress = async () => {
    const sourcePath = path.join(__dirname, 'files', 'fileToCompress.txt');
    const destinationPath = path.join(__dirname, 'files', 'archive.gz');

    const readStream = fs.createReadStream(sourcePath);
    const gzip = zlib.createGzip();
    const writeStream = fs.createWriteStream(destinationPath);

    try {
        await pipeline(readStream, gzip, writeStream);

        console.log('Compression successful!');
    } catch(err) {
        console.log('Compression failed: ', err);
    }
};

await compress();