import client from '@/components/Auth/authClient.js';

export const setAuthLoginInfo = authToken => {
  localStorage.userId = authToken.getUserId();
  localStorage.tenantId = authToken.profile.tenantId;
};

export const clearAuthLoginInfo = () => {
  delete localStorage.userId;
  delete localStorage.tenantId;
};

export const checkLogin = authToken => {
  const localUserId = localStorage.getItem('userId');
  if (
    authToken &&
    (authToken.getUserId() !== localUserId ||
      (localStorage.tenantId && authToken.profile.tenantId !== localStorage.tenantId))
  ) {
    client.logout();
    sessionStorage.redirectUrl = window.location.href.replace(origin, '');
    client.login();
    return false;
  }
  return true;
};
