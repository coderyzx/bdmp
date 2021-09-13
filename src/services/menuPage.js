import request from '@/utils/request';
// 查询所有数据
export async function getMenuPageData() {
  return request('/api/consumer/findAllMenu', {
    method: 'GET',
  });
}
// 添加
export async function postNewMenu(payload) {
  return request('/api/consumer/createMenu', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
  })
}
// 编辑跟新
export async function postUpdateMenu(payload) {
  return request('/api/consumer/updateMenu', {
      method: 'POST',
      // payload,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
  })
}
// 删除
export async function getDeleteMenu(payload) {
  return request(`/api/consumer/deleteMenuById/${payload}`, {
      method: 'GET',
      payload,
  })
}
// 批量删除
export async function postDeleteMenuArray(payload) {
  return request('/api/consumer/deleteMenuByArray', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
}
// 根据ID查询一条数据
export async function getMenuDataById(payload) {
  return request(`/api/consumer/findMenuById/${payload}`, {
    method: 'GET',
    payload,
  })
}
