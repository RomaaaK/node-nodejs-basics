import { Worker } from 'worker_threads';
import os from 'os';

const performCalculations = async () => {
    const numCPUs = os.cpus().length;
    const workers = [];

    for (let i = 0; i < numCPUs; i++) {
        const workerPromise = new Promise((resolve, reject) => {
            const worker = new Worker(new URL('./worker.js', import.meta.url));

            worker.postMessage(10 + i);

            worker.on('message', (result) => {
                if (result.status === 'resolved') {
                    resolve({ status: 'resolved', data: result.data });
                } else {
                    resolve({ status: 'error', data: null });
                }
            });

            worker.on('error', (err) => {
                reject({ status: 'error', data: null, error: err });
            });

            worker.on('exit', (code) => {
                if (code !== 0) {
                    reject({ status: 'error', data: null, error: 'Worker exited with non-zero code' });
                }
            });
        });

        workers.push(workerPromise);
    }

    try {
        const results = await Promise.all(workers);
        console.log(results);
    } catch (err) {
        console.error('Error in one of the workers:', err);
    }
};

await performCalculations();
