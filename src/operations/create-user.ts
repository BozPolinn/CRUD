import { ResponseData } from '../interfaces/response-data';
import { ResponseMessage } from '../enum/response-message';
import { User } from '../interfaces/user';
import { hasRequiredFields } from '../utils/has-required-fields';
import { users } from "../constants/database";
import { v4 } from 'uuid';

const getUser = (body: User): User => {
    return { ...body, id: v4() };
}

export const createUser = (body: User): ResponseData => {
    if (hasRequiredFields(body, true)) {
        const newUser = getUser(body);

        users.push(newUser);

        return {
            code: 201,
            data: newUser,
            statusMessage: ResponseMessage.Created,
        };
    }

    return { code: 400, statusMessage: ResponseMessage.Client };
};