import path from 'path';
import fs from 'fs/promises';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const copy = async () => {
    const srcDir = path.join(__dirname, 'files');
    const destDir = path.join(__dirname, 'files_copy');

    try {
        await fs.access(srcDir);
    } catch(err) {
        throw new Error('FS operation failed')
    }

    try {
        await fs.access(destDir);
        throw new Error()
    } catch(err) {
        if (err.code === 'ENOENT') {
            await fs.cp(srcDir, destDir, { recursive: true });
            console.log('Copied!');
        } else {
            throw new Error('FS operation failed')
        }
    }
};

await copy();
