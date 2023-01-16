import { User } from '../interfaces/user';

export const hasRequiredFields = (body: User, creationMode = false): boolean => {
    const validId = creationMode ? true : !!body.id;

    return Boolean(validId && body.age && body.hobby && body.username);
};
