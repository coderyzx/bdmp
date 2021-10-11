// import { requestUap } from '@/utils/request';
import request from '@/utils/request';

// 请求仪表盘的所有数据
export async function getDashboardList(params) {
  return request(`/api/consumer/findAllDashBoard/${params.current}/${params.pageSize}`, {
    method: 'GET',
  });
}

// 查询所有子菜单
export async function getMenuPage() {
  return request('/api/consumer/findAllSubmenu', {
    method: 'GET',
  });
}

// 新增仪表盘记录
export async function addDashboard(payload) {
  return request('/api/consumer/insertDashBoardSelective', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });
}

// 删除仪表盘
export async function deleteDashboard(payload) {
  return request(`/api/consumer/deleteDashBoardByPrimaryKey/${payload}`, {
    method: 'get',
  });
}

// 批量删除仪表盘
export async function deleteDashboardByArray(payload) {
  return request('/api/consumer/deleteDashBoardByArray', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });
}

// 添加图表组件到仪表盘
export async function addCharttoDash(payload) {
  return request('/api/consumer/addCharttoDash', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });
}
// 获取图表组件
export async function getCharttoDash(payload) {
  return request(`/api/consumer/findDashOptionByDashId/${payload}`, {
    method: 'get',
  });
}

// 更新仪表盘信息
export async function updateDashBoard(payload) {
  return request('/api/consumer/updateDashBoardByPrimaryKeySelective', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });
}

// 根据id查询仪表盘信息
export async function getDashBoardById (id) {
  return request(`/api/consumer/selectDashBoardByPrimaryKey/${id}`, {
    method: 'get',
  });
}
