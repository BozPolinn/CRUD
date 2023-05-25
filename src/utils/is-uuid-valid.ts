import { validate } from 'uuid';

export const isUuidValid = (id: string): boolean => validate(id);
