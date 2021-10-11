/** *********form表单管理请求**************** */
import request from '@/utils/request';
// 分页获取所有form数据记录
export async function getAllFormRecordByPage(params) {
    return request(`/api/consumer/findAllFormByPage/${params.current}/${params.pageSize}`, {
        method: 'GET',
    });
}

// 查询仪表盘所有记录
export async function getAllDashBoard() {
    return request('/api/consumer/findAllDashBoard/', {
        method: 'GET',
    });
}

// 新增FormRecords数据
export async function addFormRecord(params) {
    return request('/api/consumer/insertFormSelective', {
      method: 'POST',
      data: params,
    });
}

// 编辑FormRecords数据
export async function editFormRecord(params) {
    return request('/api/consumer/form/updateFormByPrimaryKeySelective', {
      method: 'POST',
      data: params,
    });
}

// 批量删除Form数据记录
export async function deleteFormRecords(params) {
    // console.log(params);
    return request('/api/consumer/deleteFormByList', {
      method: 'POST',
      data: params,
    });
  }

// 配置Form表单属性
export async function configFormProps(params) {
  return request('/api/consumer/addFormToForm/', {
    method: 'POST',
    data: params,
  });
}

/* ******************************************* */
// 初始化获取所有formProps数据
export async function getAllFormProps() {
  return request('/api/consumer/findAllFormProperties/', {
      method: 'GET',
  });
}

// 批量删除FormProps数据
export async function deleteSelectedData(params) {
  // console.log(params);
  return request('/api/consumer/deleteFormPropertiesByArray', {
    method: 'POST',
    data: params,
  });
}

// 新增FormProps数据
export async function addFormProp(params) {
  return request('/api/consumer/insertFormPropertiesSelective', {
    method: 'POST',
    data: params,
  });
}

//  获取form预览及穿梭框右侧keys

export async function getFormPreview(params) {
  return request(`/api/consumer/findRecordByFormId/${params}`, {
      method: 'GET',
  });
}
