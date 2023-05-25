import { ResponseData } from '../interfaces/response-data';
import { ResponseMessage } from '../enum/response-message';
import { findUserIndex } from '../utils/find-user';
import { isUuidValid } from '../utils/is-uuid-valid';
import { users } from "../constants/database";
import { hasRequiredFields } from '../utils/has-required-fields';
import { User } from '../interfaces/user';

export const updateUser = (id: string, body: User): ResponseData => {
    const userIndex = findUserIndex(id);

    if (userIndex === -1 || !hasRequiredFields(body)) return { code: 404, statusMessage: ResponseMessage.Client };

    if (!isUuidValid(id)) return { code: 400, statusMessage: ResponseMessage.Id };

    const updatedUser = {
        ...users[userIndex],
        ...body,
    }

    users[userIndex] = updatedUser;

    return {
        code: 200,
        data: updatedUser,
        statusMessage: ResponseMessage.Updated,
    }
};
