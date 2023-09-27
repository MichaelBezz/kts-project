import { AuthDataServer, IAuthData } from 'models/AuthMode';

export const normalizeAuthData = (from: AuthDataServer): IAuthData => ({
  accessToken: from['access_token'],
  refreshToken: from['refresh_token']
});
