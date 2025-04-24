import path from 'path';
import fs from 'fs/promises';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const remove = async () => {
    const filePath = path.join(__dirname, 'files', 'fileToRemove.txt');

    try {
        await fs.access(filePath);
        await fs.unlink(filePath);
        console.log('File successfully delete!');
    } catch {
        throw new Error('FS operation failed');
    }
};

await remove();