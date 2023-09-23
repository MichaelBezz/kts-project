export type UserId = number;

export interface IUser {
  id: UserId;
  email: string;
  password: string;
  name: string;
  role: string;
  avatar: string;
};
