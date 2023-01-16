import http from "node:http";
import { endpoints } from "./constants/endpoints";
import { notFoundHandler } from "./handlers/not-found.handler";
import { serverErrorHandler } from "./handlers/server-error.handler";

export const server = http.createServer(async (req: http.IncomingMessage, res: http.ServerResponse) => {
    try {
        const endpoint = endpoints.find(item => {
            item.pattern.lastIndex = 0;

            return item.pattern.test(req.url) && item.method === req.method;
        });

        if (endpoint) {
            endpoint.pattern.lastIndex = 0;
            const params = Array.from(req.url.matchAll(endpoint.pattern))[0]?.groups ?? {};

            await endpoint.handler(req, res, params.id);
        } else {
            notFoundHandler(req, res);
        }
    } catch (e) {
        serverErrorHandler(res);
    }
});
