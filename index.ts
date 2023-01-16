import { env } from  'node:process';
import { config } from 'dotenv'
import { server } from './src/server';
import os from "os";
import cluster from "cluster";

config();

const port = +env.PORT || 4000;
const cpus = os.cpus().length;
const multi = Boolean(env.MULTI);

if (!multi) {
    server.listen(port);
} else {
    if (cluster.isPrimary) {
        cluster.schedulingPolicy = cluster.SCHED_RR;

        // Fork workers.
        for (let i = 0; i < cpus; i++) {
            cluster.fork({ PORT: port + i + 1 });
        }

        cluster.on('exit', (worker, code, signal) => {
            console.log(`worker ${worker.process.pid} died`);
        });
    } else {
        server.listen(port);
    }
}

