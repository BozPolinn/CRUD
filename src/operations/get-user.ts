import { ResponseData } from '../interfaces/response-data';
import { findUser } from '../utils/find-user';
import { isUuidValid } from '../utils/is-uuid-valid';
import { ResponseMessage } from '../enum/response-message';

export const getUser = (id: string): ResponseData => {
    const user = findUser(id);

    if (!user) return { code: 404, statusMessage: ResponseMessage.Client };

    if (!isUuidValid(id)) return { code: 400, statusMessage: ResponseMessage.Id };

    return {
        code: 200,
        data: user,
    };
}
