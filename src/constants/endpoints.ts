import http from 'node:http';
import { RequestMethod } from '../enum/request-method';
import { getUsers } from '../operations/get-users';
import { getUser } from '../operations/get-user';
import { updateUser } from '../operations/update-user';
import { createUser } from '../operations/create-user';
import { deleteUser } from '../operations/delete-user';
import { sendResponse } from '../utils/send-response';

export const endpoints = [
    {
        // GET USERS
        method: RequestMethod.Get,
        pattern: new RegExp('^/api/users$', 'gi'),
        handler: (req: http.IncomingMessage, res: http.ServerResponse) => {
            const result = getUsers();

            sendResponse(res, result);
        },
    },
    {
        // GET USER
        method: RequestMethod.Get,
        pattern: new RegExp('^/api/users/(?<id>[\\w-]+)$', 'gi'),
        handler: (req: http.IncomingMessage, res: http.ServerResponse, id?: string) => {
            const result = getUser(id);

            sendResponse(res, result);
        },
    },
    {
        // UPDATE USER
        method: RequestMethod.Put,
        pattern: new RegExp('^/api/users/(?<id>[\\w-]+)$', 'gi'),
        handler: (req: http.IncomingMessage, res: http.ServerResponse, id?: string) => {
            req.on('data', data => {
                const parsedData = JSON.parse(Buffer.from(data).toString());
                const result = updateUser(id, parsedData)

                sendResponse(res, result);
            });
        },
    },
    {
        // CREATE USER
        method: RequestMethod.Post,
        pattern: new RegExp('^/api/users$', 'gi'),
        handler: (req: http.IncomingMessage, res: http.ServerResponse) => {
            req.on('data', data => {
                const parsedData = JSON.parse(Buffer.from(data).toString());
                const result = createUser(parsedData);

                sendResponse(res, result);
            })
        },
    },
    {
        // DELETE USER
        method: RequestMethod.Delete,
        pattern: new RegExp('^/api/users/(?<id>[\\w-]+)$', 'gi'),
        handler: (req: http.IncomingMessage, res: http.ServerResponse, id?: string) => {
            const result = deleteUser(id);

            sendResponse(res, result);
        },
    },
];
