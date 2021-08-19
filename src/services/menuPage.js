import request from '@/utils/request';

export async function getMenuPageData(payload) {
  // console.log(payload);
  return request('/api/consumer/findAllMenu', {
      method: 'GET',
      payload,
  });
}
export async function postNewMenu(payload) {
  // console.log(payload);
  return request('/api/consumer/createMenu', {
      method: 'POST',
      // payload,
      headers: {
        'Content-Type': 'application/json',
      },
      body:JSON.stringify(payload)
      // body: {
      //   'menu' :JSON.stringify(payload),
      // },
      // credentials: 'include'  //是否携带cookie，默认为omit不携带; same-origi同源携带; include同源跨域都携带
  })
  // .then((res) => {
  //   console.log(res);
  // })
}
export async function postUpdateMenu(payload) {
  console.log(payload);
  return request('/api/consumer/updateMenu', {
      method: 'POST',
      // payload,
      headers: {
        'Content-Type': 'application/json',
      },
      body:JSON.stringify(payload)
  })
}

export async function getDeleteMenu(payload) {
  // console.log(payload);
  return request(`/api/consumer/deleteMenuById/${payload}`, {
      method: 'GET',
      payload,
  })
}
