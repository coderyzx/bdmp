import { getLineChart, getBarChart,getPieChart,getRadarChart } from '@/services/global';

const chartModel = {
  namespace: 'chartModel',
  state: {
    chartMenu: [],
    lineChart: {},
    barChart: {},
    pieChart: {},
    radarChart: {},
  },

  effects: {
    *getLineChart({ payload }, { call, put }) {
      // console.log(payload);
      const response = yield call(getLineChart, payload);
      // console.log(response);
      if (response.code === '001') {
        yield put({
          type: 'lineChart',
          payload: response.lineChart,
        });
      }
    },
    *getBarChart({ payload }, { call, put }) {
      // console.log(payload);
      const response = yield call(getBarChart, payload);
      // console.log(response);
      if (response.code === '002') {
        yield put({
          type: 'barChart',
          payload: response.barChart,
        });
      }
    },
    *getPieChart({ payload }, { call, put }) {
      // console.log(payload);
      const response = yield call(getPieChart, payload);
      // console.log(response);
      if (response.code === '003') {
        yield put({
          type: 'pieChart',
          payload: response.pieChart,
        });
      }
    },
    *getRadarChart({ payload }, { call, put }) {
      // console.log(payload);
      const response = yield call(getRadarChart, payload);
      // console.log(response);
      if (response.code === '004') {
        yield put({
          type: 'radarChart',
          payload: response.radarChart,
        });
      }
    },



  },
  reducers: {
    lineChart(state, { payload }) {
      // console.log(payload);
      return {
        ...state,
        lineChart: payload,
      }
    },
    barChart(state, { payload }) {
      // console.log(payload);
      return {
        ...state,
        barChart: payload,
      }
    },
    pieChart(state, { payload }) {
      // console.log(payload);
      return {
        ...state,
        pieChart: payload,
      }
    },
    radarChart(state, { payload }) {
      // console.log(payload);
      return {
        ...state,
        radarChart: payload,
      }
    },
  },
};

export default chartModel;
