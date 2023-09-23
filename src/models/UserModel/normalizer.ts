import { IUser, UserServer } from 'models/UserModel';

export const normalizeUser = (from: UserServer): IUser => ({
  id: from.id,
  email: from.email,
  password: from.password,
  name: from.name,
  role: from.role,
  avatar: from.avatar
});
