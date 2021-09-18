// import { requestUap } from '@/utils/request';
import request from '@/utils/request';

const doMain = process.env.apiURL;

export async function createContainer2Dashboard (displayId, data, params) {
  return request(`${doMain}api/${displayId}/widget/addBatch`, {
    method: 'post',
    params,
    data,
  });
}

export async function getContainerForDashboard (displayId) {
  return request(`${doMain}api/${displayId}/widget/list`, {
    method: 'post',
  });
}


// 请求仪表盘的所有数据
export async function getDashboardList(data) {
  return request('/api/consumer/findAllDashBoard', {
    method: 'GET',
    data,
  });
}

// 查询所有子菜单
export async function getMenuPage(params) {
  return request('api/consumer/findAllSubmenu', {
    method: 'get',
    params,
  });
}

export async function addDashboard(params) {
  return request(`${doMain}api/display/add`, {
    method: 'post',
    params,
  });
}

export async function deleteDashboard(data) {
  return request.delete(`${doMain}api/display/delete/${data}`)
}

export async function addProject(params) {
  return request(`${doMain}api/project/add`, {
    method: 'post',
    params,
  });
}

export async function updateProject(data) {
  return request(`${doMain}api/project/update/${data.id}`, {
    method: 'post',
    data: data.projectUpdate,
  });
}

export async function deleteProject(data) {
  return request.delete(`${doMain}api/project/delete/${data}`)
}

export async function addGroup(params) {
  return request(`${doMain}api/displayGroup/add`, {
    method: 'post',
    params,
  });
}

export async function deleteGroup(data) {
  const { id, ...payload } = data;
  return request(`${doMain}api/displayGroup/delete/${id}`, {
    method: 'delete',
    params: payload,
  })
}

export async function getGroup(params) {
  return request(`${doMain}api/displayGroup/list`, {
    method: 'post',
    params,
  });
}

export async function updateGroup(data) {
  return request(`${doMain}api/displayGroup/update/${data.id}`, {
    method: 'post',
    params: data.groupUpdate,
  });
}
