import request from '@/utils/request';
// 查询所有数据
export async function getMenuPageData(payload) {
  // console.log(payload);
  return request('/api/consumer/findAllMenu', {
      method: 'GET',
      payload,
  });
}
// 添加
export async function postNewMenu(payload) {
  // console.log(payload);
  return request('/api/consumer/createMenu', {
      method: 'POST',
      // payload,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
      // body: {
      //   'menu' :JSON.stringify(payload),
      // },
      // credentials: 'include'  //是否携带cookie，默认为omit不携带; same-origi同源携带; include同源跨域都携带
  })
  // .then((res) => {
  //   console.log(res);
  // })
}
// 编辑跟新
export async function postUpdateMenu(payload) {
  // console.log(payload);
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
  // console.log(typeof payload);
  return request(`/api/consumer/deleteMenuById/${payload}`, {
      method: 'GET',
      payload,
  })
}
// 批量删除
export async function postDeleteMenuArray(payload) {
  // console.log(payload);
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
  // console.log(typeof payload);
  return request(`/api/consumer/findMenuById/${payload}`, {
    method: 'GET',
    payload,
  })
}
