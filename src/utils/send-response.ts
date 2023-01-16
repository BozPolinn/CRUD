import http from 'node:http';
import { ResponseData } from '../interfaces/response-data';

export function sendResponse(res: http.ServerResponse, data?: ResponseData): void {
    if (data?.data) {
        res.writeHead(data.code, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify(data.data));

        return;
    }

    res.writeHead(data.code, data?.statusMessage);
    res.end();
}
