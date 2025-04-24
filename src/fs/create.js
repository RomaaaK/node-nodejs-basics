import path from 'path';
import fs from 'fs/promises';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const create = async () => {
    const filePath = path.join(__dirname, 'files', 'fresh.txt');

    try {
        await fs.access(filePath);
        throw new Error('FS operation failed');
    } catch(err) {
        if (err.code === 'ENOENT') {
            await fs.writeFile(filePath, 'I am fresh and young');
            console.log('File created successful!');
        } else {
            throw err;
        }
    }
};

await create();