
import request from '@/utils/request';

// 根据图表名称查询所有的option
export async function getChartByTypeName(payload) {
  // console.log(payload);
  return request(`/api/chartOption/findAllChartOption/${payload}`, {
      method: 'get',
      payload,
  });
}
// 新增一条option记录
export async function postChartData(payload) {
  // console.log(payload);
  return request('/api/chartOption/insertSelective', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
      // body: payload,
  });
}
// 根据id删除option记录
export async function getDelete(id) {
  return request(`/api/chartOption/deleteByPrimaryKey/${id}`, {
      method: 'get',
  });
}

// 更新option记录
export async function postUpdate(payload) {
  return request('/api/chartOption/updateByPrimaryKeySelective', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
  });
}
// 根据id查询option记录
export async function getChartById(id) {
  return request(`/api/chartOption/selectByPrimaryKey/${id}`, {
      method: 'get',
  });
}

// 查询所有的图表
export async function getAllChart() {
  return request('/api/chartOption/findAllChartOption', {
      method: 'get',
  });
}

// 查询图表类型信息
export async function getTypeList() {
  return request('/chartType/consumer/selectTypeAll', {
      method: 'get',
  });
}
// 查询图表类型名称
export async function getTypeName() {
  return request('/chartType/consumer/selectTypeName', {
      method: 'get',
  });
}
