import http from 'node:http';
import { ResponseMessage } from '../enum/response-message';

export function notFoundHandler(req: http.IncomingMessage, res: http.ServerResponse): void {
    res.writeHead(404, ResponseMessage.Client);
    res.end();
}
