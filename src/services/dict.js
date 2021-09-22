/** *********字典管理请求**************** */
import request from '@/utils/request';
// 初始化获取table数据
export async function getInitial(params) {
  return request(`/dict/consumer/dict/findAllDict?currentPage=1&pageSize=${params}`, {
      method: 'GET',
  });
}

// 获取所有字典类型ID
export async function getTypeIdList() {
  return request('/dict/consumer/dict/selectAllTypeId', {
    method: 'GET',
  });
}

// 获取所有字典类型Name
export async function getTypeNameList() {
  return request('/dict/consumer/dict/selectAllType', {
    method: 'GET',
  });
}

// 更新page后获取的table数据
export async function pageChange(params) {
  return request(`/dict/consumer/dict/findAllDict?currentPage=${params.current}&pageSize=${params.pageSize}`, {
      method: 'GET',
  });
}
// 编辑字典行数据
export async function editDictData(params) {
  // console.log(params);
  return request('/dict/consumer/dict/updateByPrimaryKeySelective', {
      method: 'POST',
      data: params,
  });
}
// 删除行数据
export async function deleteDictData(params) {
  // console.log(params);
  return request(`/dict/consumer/dict/deleteByPrimaryKey?id=${params}`, {
      method: 'GET',
  });
}
// 批量删除数据
export async function deleteSelectedDict(params) {
  // console.log(params);
  return request('/dict/consumer/dict/deleteByIdList', {
    method: 'POST',
    data: params,
  });
}
// 过滤查询数据
export async function queryData(params) {
  // console.log(params);
  return request('/dict/consumer/dict/findDictByRequired', {
    method: 'POST',

    data: params,
  });
}
// 新增数据
export async function addDictData(params) {
  // console.log(params);
  return request('/dict/consumer/dict/insertSelective', {
    method: 'POST',

    data: params,
  });
}
/** ************字典子项crud ** */
// 初始化获取字典子项数据
export async function getDictItemInitial(params) {
  return request(`/dict/consumer/dict_item/findByPrimaryKey?id=${params}`, {
      method: 'GET',
  });
}

// 新增字典子项数据
export async function addDictItemData(params) {
  // console.log(params);
  return request('/dict/consumer/dict_item/insertSelective', {
    method: 'POST',
    data: params,
  });
}

// 删除字典子项行数据
export async function deleteDictItemData(params) {
  // console.log(params);
  return request(`/dict/consumer/dict_item/deleteByPrimaryKey?id=${params}`, {
      method: 'GET',
  });
}

// 编辑字典子项行数据
export async function editDictItemData(params) {
  // console.log(params);
  return request('/dict/consumer/dict_item/updateByPrimaryKeySelective', {
      method: 'POST',
      data: params,
  });
}

// 获取已选字典子项的相关信息
export async function selectedDictItem(params) {
  return request(`/dict/consumer/dict_item/selectByPrimaryKey?id=${params}`, {
    method: 'GET',
});
}
