import { users } from "../constants/database";
import { ResponseData } from '../interfaces/response-data';
import { isUuidValid } from '../utils/is-uuid-valid';
import { findUserIndex } from '../utils/find-user';
import { ResponseMessage } from '../enum/response-message';

export const deleteUser = (id: string): ResponseData => {
    const userIndex = findUserIndex(id);

    if (userIndex === -1) return { code: 404, statusMessage: ResponseMessage.Client };

    if (!isUuidValid(id)) return { code: 400, statusMessage: id };

    users.splice(userIndex, 1);

    return { code: 204, statusMessage: ResponseMessage.Delete };
};
