import { IAuthRequest } from 'models/AuthMode';

export const validate = (authRequest: IAuthRequest): IAuthRequest => {
  const errors: IAuthRequest = {} as IAuthRequest;

  const isEmailCorrect: boolean = (/^([a-z0-9_.-]+)@([\da-z.-]+).([a-z.]{2,6})$/).test(authRequest.email);
  const isPasswordCorrect: boolean = (/[a-z0-9]{3,}/).test(authRequest.password);

  if (!authRequest.email) {
    errors.email = 'Email required';
  }

  if (!isEmailCorrect) {
    errors.email = 'Enter the correct email, for example: john@mail.com';
  }

  if (!authRequest.password) {
    errors.password = 'Password required';
  }

  if (!isPasswordCorrect) {
    errors.password = 'The password must contain more than three symbols, for example: changeme';
  }

  return errors;
};
