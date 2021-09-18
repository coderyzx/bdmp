// import { requestUap } from '@/utils/request';
import request from '@/utils/request';

export async function getChartTypeList(data) {
  return request('chart/chartType/list', {
    method: 'get',
    data,
  });
}

export async function getChartList(data) {
  return request('chart/list', {
    method: 'get',
    data,
  });
}

export async function setChartType(data) {
  return request(`${process.env.apiURL}api/chart/chartType/add`, {
    method: 'post',
    data,
  });
}

export async function updateChartType(data) {
  return request(`${process.env.apiURL}api/chart/chartType/update`, {
    method: 'post',
    data,
  });
}

export async function deleteChartType(data) {
  return request('chart/chartType/delete', {
    method: 'get',
    data,
  });
}

export async function addChartConfig(data) {
  return request(`${process.env.apiURL}api/chart/add`, {
    method: 'post',
    data,
  });
}

export async function updateChartConfig(data) {
  return request(`${process.env.apiURL}api/chart/update`, {
    method: 'post',
    data,
  });
}

export async function deleteChart(data) {
  return request('chart/delete', {
    method: 'get',
    data,
  });
}
