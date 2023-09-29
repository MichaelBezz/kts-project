export type UserId = number;
export type UserProfile = Omit<IUser, 'id' | 'role'>;

export interface IUser {
  id: UserId;
  email: string;
  password: string;
  name: string;
  role: string;
  avatar: string;
};
