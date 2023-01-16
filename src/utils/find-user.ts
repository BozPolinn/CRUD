import { users } from "../constants/database";
import { User } from '../interfaces/user';

export const findUser = (id: string): User => users.find(user => user.id === id);
export const findUserIndex = (id: string): number => users.findIndex(user => user.id === id);
