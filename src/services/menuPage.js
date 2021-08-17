import request from '@/utils/request';

export async function getMenuPage(payload) {
  // console.log(payload);
  return request('/api/query/menuPage', {
      method: 'get',
      payload,
  });
}
