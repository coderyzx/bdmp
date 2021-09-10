import request from '@/utils/request';

export async function getLogin(username, password) {
  // console.log(username, password);
  return request(`/api/query/login?username=${username}&password=${password}`, {
      method: 'get',
      username,
      password,
  });
}
