import { AuthConfig } from 'uih-uplus-auth-client';

const authConfig = new AuthConfig({
  provider: `${process.env.authServerUrl}v1/`,
  clientId: 'nRlTni3EpGWx6Bs7',
  loginCallback: `${process.env.currentDomain}/auth/loginCallback`,
  silentRenewCallback: `${process.env.currentDomain}/auth/silentRenewCallback`,
  logoutRedirect: '/',
  onError: () => {},
})
export default authConfig
