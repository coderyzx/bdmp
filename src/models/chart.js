import { getChartByTypeName, postChartData, getDelete, postUpdate, getChartById, getTypeList, getTypeName } from '@/services/chart';
import { openNotificationServer } from '@/utils/notification';

const chartModel = {
  namespace: 'chartModel',
  state: {
    chartList: [],
    chartType: [],
    chartTypeName: [],
    chartEdit: {},
  },

  effects: {
    // 获取所有chart
    *getChartList({ payload }, { call, put }) {
      const response = yield call(getChartByTypeName, payload);
      if (response) {
        yield put({
          type: 'chartList',
          payload: response,
        });
      } else if (response.status === 500) {
        openNotificationServer();
      }
    },
    // 新增chart
    *postNewChart({ payload, callback }, { call }) {
      const response = yield call(postChartData, payload);
      if (response) {
        callback(response);
      } else {
        callback(response);
      }
    },
    // 删除chart
    *getDeleteChart({ payload, callback }, { call }) {
      const response = yield call(getDelete, payload);
      if (response === 200) {
        callback(response);
      } else if (response.status === 500) {
        openNotificationServer();
      }
    },
    // 修改chart
    *postUpdateChart({ payload, callback }, { call }) {
      const response = yield call(postUpdate, payload);
      console.log(response);
      if (response.code === 'U000000') {
        callback(response);
      } else {
        callback(response);
      }
    },
    // 查一个chart，用于编辑的时候查询一个chart
    *getChart({ payload, callback }, { call, put }) {
      // console.log(payload);
      const response = yield call(getChartById, payload);
      // console.log(response);
      if (response) {
        yield put({
          type: 'chartEdit',
          payload: response,
        });
        if (callback) {
          callback();
        }
      }
    },

    // 获取图表类型的所有信息
    *getChartType({ payload, callback }, { call, put }) {
      const response = yield call(getTypeList, payload);
      if (response.code === 'U000000') {
        yield put({
          type: 'chartType',
          payload: response.data,
        });
      } else {
        callback()
      }
    },
    // 获取图表类型的名称
    *getChartTypeName({ payload, callback }, { call, put }) {
      const response = yield call(getTypeName, payload);
      if (response.code === 'U000000') {
        yield put({
          type: 'chartTypeName',
          payload: response.data,
        });
      } else {
        callback()
      }
    },


  },
  reducers: {
    chartList(state, { payload }) {
      // console.log(payload);
      return {
        ...state,
        chartList: payload,
      }
    },
    chartEdit(state, { payload }) {
      // console.log(payload);
      return {
        ...state,
        chartEdit: payload,
      }
    },
    chartType(state, { payload }) {
      // console.log(payload);
      return {
        ...state,
        chartType: payload,
      }
    },
    chartTypeName(state, { payload }) {
      // console.log(payload);
      return {
        ...state,
        chartTypeName: payload,
      }
    },

  },
};

export default chartModel;
