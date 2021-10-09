/** *********图表类型管理请求**************** */
import request from '@/utils/request';
// 初始化获取table数据
export async function getInitial(params) {
  return request(`/chartType/consumer/selectByPage/1/${params}`, {
      method: 'GET',
  });
}

// 获取所有图表类型ID
export async function getTypeIdList() {
  return request('/chartType/consumer/selectTypeId', {
    method: 'GET',
  });
}

// 获取所有图表类型Name
export async function getTypeNameList() {
  return request('/chartType/consumer/selectTypeName', {
    method: 'GET',
  });
}

// 更新page后获取的table数据
export async function pageChangeData(params) {
  return request(`/chartType/consumer/selectByPage/${params.current}/${params.pageSize}`, {
      method: 'GET',
  });
}
// 编辑行数据
export async function editeRowData(params) {
  // console.log(params);
  return request('/chartType/consumer/update', {
      method: 'POST',
      data: params,
  });
}
// 删除行数据
export async function deleteRowData(params) {
  // console.log(params);
  return request(`/chartType/consumer/delete/${params}`, {
      method: 'GET',
  });
}
// 批量删除数据
export async function deleteSelectedData(params) {
  // console.log(params);
  return request('/chartType/consumer/deleteByIdList', {
    method: 'POST',
    data: params,
  });
}
// 过滤查询数据
export async function queryData(params) {
  // console.log(params);
  return request('/chartType/consumer/selectByConditionAndPage', {
    method: 'POST',
    data: params,
  });
}
// 新增数据
export async function addData(params) {
  return request('/chartType/consumer/insert', {
    method: 'POST',
    data: params,
  });
}
