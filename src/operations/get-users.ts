import { users } from "../constants/database";
import { ResponseData } from '../interfaces/response-data';

export const getUsers = (): ResponseData => {
    return { code: 200, data: users };
}
