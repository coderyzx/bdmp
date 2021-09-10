/** *********图表类型管理请求**************** */
import request from '@/utils/request';
// 初始化获取table数据
export async function getInitial(payload) {
  return request(`/chartType/consumer/selectByPage/1/${payload}`, {
      method: 'get',
  });
}

// 获取所有图表类型ID
export async function getTypeIdList() {
  return request('/chartType/consumer/selectTypeId', {
    method: 'get',
  });
}

// 获取所有图表类型Name
export async function getTypeNameList() {
  return request('/chartType/consumer/selectTypeName', {
    method: 'get',
  });
}

// 更新page后获取的table数据
export async function pageChange(payload) {
  return request(`/chartType/consumer/selectByPage/${payload.current}/${payload.pageSize}`, {
      method: 'get',
  });
}
// 编辑行数据
export async function editeRowData(payload) {
  // console.log(payload);
  return request('/chartType/consumer/update', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
  });
}
// 删除行数据
export async function deleteRowData(payload) {
  // console.log(payload);
  return request(`/chartType/consumer/delete/${payload}`, {
      method: 'get',
  });
}
// 批量删除数据
export async function deleteSelectedData(payload) {
  // console.log(payload);
  return request('/chartType/consumer/deleteByIdList', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });
}
// 过滤查询数据
export async function queryData(payload) {
  // console.log(payload);
  return request('/chartType/consumer/selectByConditionAndPage', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });
}
// 新增数据
export async function addData(payload) {
  // console.log(payload);
  return request('/chartType/consumer/insert', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });
}
