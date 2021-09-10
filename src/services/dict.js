/** *********字典管理请求**************** */
import request from '@/utils/request';
// 初始化获取table数据
export async function getInitial(payload) {
  return request(`/dict/consumer/dict/findAllDict?currentPage=1&pageSize=${payload}`, {
      method: 'get',
  });
}

// 获取所有字典类型ID
export async function getTypeIdList() {
  return request('/dict/consumer/dict/selectAllTypeId', {
    method: 'get',
  });
}

// 获取所有字典类型Name
export async function getTypeNameList() {
  return request('/dict/consumer/dict/selectAllType', {
    method: 'get',
  });
}

// 更新page后获取的table数据
export async function pageChange(payload) {
  return request(`/dict/consumer/dict/findAllDict?currentPage=${payload.current}&pageSize=${payload.pageSize}`, {
      method: 'get',
  });
}
// 编辑字典行数据
export async function editDictData(payload) {
  // console.log(payload);
  return request('/dict/consumer/dict/updateByPrimaryKeySelective', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
  });
}
// 删除行数据
export async function deleteDictData(payload) {
  // console.log(payload);
  return request(`/dict/consumer/dict/deleteByPrimaryKey?id=${payload}`, {
      method: 'get',
  });
}
// 批量删除数据
export async function deleteSelectedDict(payload) {
  // console.log(payload);
  return request('/dict/consumer/dict/deleteByIdList', {
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
  return request('/dict/consumer/dict/findDictByRequired', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });
}
// 新增数据
export async function addDictData(payload) {
  // console.log(payload);
  return request('/dict/consumer/dict/insertSelective', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });
}
/** ************字典子项crud ** */
// 初始化获取字典子项数据
export async function getDictItemInitial(payload) {
  return request(`/dict/consumer/dict_item/findByPrimaryKey?id=${payload}`, {
      method: 'get',
  });
}

// 新增字典子项数据
export async function addDictItemData(payload) {
  // console.log(payload);
  return request('/dict/consumer/dict_item/insertSelective', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });
}

// 删除字典子项行数据
export async function deleteDictItemData(payload) {
  // console.log(payload);
  return request(`/dict/consumer/dict_item/deleteByPrimaryKey?id=${payload}`, {
      method: 'get',
  });
}

// 编辑字典子项行数据
export async function editDictItemData(payload) {
  // console.log(payload);
  return request('/dict/consumer/dict_item/updateByPrimaryKeySelective', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
  });
}

// 获取已选字典子项的相关信息
export async function selectedDictItem(payload) {
  return request(`/dict/consumer/dict_item/selectByPrimaryKey?id=${payload}`, {
    method: 'get',
});
}
