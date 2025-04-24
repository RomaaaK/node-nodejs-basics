import path from 'path';
import fs from 'fs/promises';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rename = async () => {
    const oldPath = path.join(__dirname, 'files', 'wrongFilename.txt');
    const newPath = path.join(__dirname, 'files', 'properFilename.md');
       
    try {
        await fs.access(oldPath);
    } catch {
        throw new Error('FS operation failed');
    }

    try {
        await fs.access(newPath);
        throw new Error();
    } catch (err) {
        if (err.code === 'ENOENT') {
            await fs.rename(oldPath, newPath);
            console.log('Rename successful!');
        } else {
            throw new Error('FS operation failed');
        }
    }


};

await rename();