import http from 'node:http';
import {ResponseMessage} from '../enum/response-message';

export function serverErrorHandler(res: http.ServerResponse): void {
    res.writeHead(500, ResponseMessage.Server);
    res.end();
}
