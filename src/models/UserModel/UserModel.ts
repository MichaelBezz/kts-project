import { IUser, UserId, UserServer, normalizeUser } from 'models/UserModel';

export default class UserModel implements IUser {
  readonly id: number;
  readonly email: string;
  readonly password: string;
  readonly name: string;
  readonly role: string;
  readonly avatar: string;

  constructor({ id, email, password, name, role, avatar }: IUser = {
    id: 0,
    email: '',
    password: '',
    name: '',
    role: '',
    avatar: ''
  }) {
    this.id = id;
    this.email = email;
    this.password = password;
    this.name = name;
    this.role = role;
    this.avatar = avatar;
  }

  static fromJson(from: UserServer): UserModel {
    return new UserModel(normalizeUser(from));
  }

  static normalizeUserList(users: UserServer[]) {
    return users.reduce((acc, user) => ({
      ...acc,
      entities: {
        ...acc.entities,
        [user.id]: UserModel.fromJson(user),
      },
      keys: [...acc.keys, user.id],
    }), {
      entities: {} as Record<UserId, UserModel>,
      keys: [] as UserId[],
    });
  }
}
