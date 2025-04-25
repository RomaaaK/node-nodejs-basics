import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const spawnChildProcess = async (args = []) => {
    if (!Array.isArray(args)) {
        throw new TypeError('`args` must be an array');
    }

    const scriptPath = path.join(__dirname, 'files', 'script.js');

    const child = spawn(
        process.execPath,
        [scriptPath, ...args],
        {
            stdio: ['pipe', 'pipe', 'inherit']
        }
    );

    process.stdin.pipe(child.stdin);
    child.stdout.pipe(process.stdout);

    return child;
};

// Put your arguments in function call to test this functionality
spawnChildProcess( /* [someArgument1, someArgument2, ...] */);
