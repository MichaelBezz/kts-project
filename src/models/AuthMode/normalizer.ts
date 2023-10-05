import { AuthResponseServer, IAuthResponse } from 'models/AuthMode';

export const normalizeAuthResponse = (from: AuthResponseServer): IAuthResponse => ({
  accessToken: from['access_token'],
  refreshToken: from['refresh_token']
});
