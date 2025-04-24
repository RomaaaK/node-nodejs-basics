import path from 'path';
import fs from 'fs/promises';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const list = async () => {
    const srcDir = path.join(__dirname, 'files');

    try {
        await fs.access(srcDir)
        const files = await fs.readdir(srcDir);
        console.log(files);
    } catch {
        throw new Error('FS operation failed');
    }
};

await list();