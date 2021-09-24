import { getDashboardList, addDashboard, deleteDashboard, getMenuPage,
deleteDashboardByArray } from '@/services/dashBoard';

const dashBoard = {
  namespace: 'dashBoard',
  state: {
    current: 1,
    pageSize: 10,
    totalCount: 10,
    dashboardList: [],
    subMenuList: [],
  },

  effects: {
    // 获取所有
    *getList({ payload, callback, failCallback }, { call, put }) {
      const response = yield call(getDashboardList, payload);
      if (response.msgCode === 'SUCCESS') {
        const { totalCount, currentPage, pageSize, lists } = response.data
        yield put({
          type: 'list',
          current: currentPage,
          pageSize,
          totalCount,
          dashboardList: lists,
        });
        if (callback) {
          callback(response);
        }
      } else {
        failCallback(response)
      }
    },
    // 新增
    *addList({ payload, callback }, { call, put }) {
      const response = yield call(addDashboard, payload.values);
      if (response.msgCode === 'SUCCESS') {
        const res = yield call(getDashboardList, payload);
        const { totalCount, currentPage, pageSize, lists } = res.data
        yield put({
          type: 'list',
          current: currentPage,
          pageSize,
          totalCount,
          dashboardList: lists,
        });
      }
      if (callback) {
        callback(response);
      }
    },
    // 获取所有子菜单
    *getMenu({ callback }, { call, put }) {
      const response = yield call(getMenuPage);
      if (response.msgCode === 'SUCCESS') {
        yield put({
          type: 'menuList',
          payload: response.data,
        });
      }
      if (callback) {
        callback(response);
      }
    },
    // 批量删除
    *deleteList({ payload, callback }, { call, put }) {
      const response = yield call(deleteDashboardByArray, payload.selectedRowKeys);
      if (response.msgCode === 'SUCCESS') {
        const res = yield call(getDashboardList, payload);
        const { totalCount, currentPage, pageSize, lists } = res.data
        yield put({
          type: 'list',
          current: currentPage,
          pageSize,
          totalCount,
          dashboardList: lists,
        });
      }
      if (callback) {
        callback(response);
      }
    },
    // 删除
    *deleteById({ payload, callback }, { call, put }) {
      const response = yield call(deleteDashboard, payload.id);
      if (response.msgCode === 'SUCCESS') {
        const res = yield call(getDashboardList, payload);
        const { totalCount, currentPage, pageSize, lists } = res.data
        yield put({
          type: 'list',
          current: currentPage,
          pageSize,
          totalCount,
          dashboardList: lists,
        });
      }
      if (callback) {
        callback(response);
      }
    },

  },
  reducers: {
    list(state, { totalCount, current, pageSize, dashboardList }) {
      // console.log(state, payload);
      return {
        ...state,
        current,
        pageSize,
        totalCount,
        dashboardList,
      }
    },
    menuList(state, { payload }) {
      // console.log(state, payload);
      return {
        ...state,
        subMenuList: payload,
      }
    },
  },
};

export default dashBoard;
