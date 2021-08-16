import request from '@/utils/request';

export async function getLogin(username, password) {
  // console.log(username, password);
  return request(`/api/query/login?username=${username}&password=${password}`, {
      method: 'get',
      username,
      password,
  });
}

export async function getLineChart(payload) {
  // console.log(payload);
  return request('/api/query/lineChart', {
      method: 'get',
      payload,
  });
}
export async function getBarChart(payload) {
  // console.log(payload);
  return request('/api/query/barChart', {
      method: 'get',
      payload,
  });
}
export async function getPieChart(payload) {
  // console.log(payload);
  return request('/api/query/pieChart', {
      method: 'get',
      payload,
  });
}
export async function getRadarChart(payload) {
  // console.log(payload);
  return request('/api/query/radarChart', {
      method: 'get',
      payload,
  });
}
