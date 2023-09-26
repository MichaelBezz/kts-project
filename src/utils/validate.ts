import { LoginFormError } from 'App/pages/LoginPage/LoginPage';
import { IAuthRequest } from 'models/AuthMode';

export const validate = (
  formField: IAuthRequest,
  setError: (messages: LoginFormError) => void
): boolean => {
  const isEmailCorrect: boolean = (/^([a-z0-9_.-]+)@([\da-z.-]+).([a-z.]{2,6})$/).test(formField.email);
  const isPasswordCorrect: boolean = (/[a-z0-9]{3,}/).test(formField.password);

  if (!isEmailCorrect || !isPasswordCorrect) {
    setError({
      email: isEmailCorrect ? '' : 'Enter the correct email, for example: john@mail.com',
      password: isPasswordCorrect ? '' : 'The password must contain more than three symbols, for example: changeme'
    });
    return false;
  } else {
    setError({email: '', password: ''});
    return true;
  }
};
