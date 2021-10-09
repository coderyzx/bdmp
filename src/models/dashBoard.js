import { getDashboardList, addDashboard, deleteDashboard, getMenuPage, deleteDashboardByArray, getDashBoardById, updateDashBoard, addCharttoDash, getCharttoDash } from '@/services/dashBoard';

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
      if (response) {
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
      } else {
        failCallback()
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
    // 更新
    *updateList({ payload, callback }, { call, put }) {
      const response = yield call(updateDashBoard, payload.data);
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
    // 获取图表
    *getChart({ payload, callback }, { call }) {
      const response = yield call(getCharttoDash, payload);
      if (response.msgCode === 'SUCCESS') {
        if (callback) {
          callback(response);
        }
      }
    },
    // 添加图表
    *addChart({ payload, callback }, { call, put }) {
      const response = yield call(addCharttoDash, payload.data);
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
        if (!res.data.lists.length) {
          const newPage = payload.current - 1;
          const params = { current: newPage, pageSize: payload.pageSize }
          const result = yield call(getDashboardList, params);
          const { totalCount, currentPage, pageSize, lists } = result.data
          yield put({
            type: 'list',
            current: currentPage,
            pageSize,
            totalCount,
            dashboardList: lists,
          });
        } else {
          const { totalCount, currentPage, pageSize, lists } = res.data
          yield put({
            type: 'list',
            current: currentPage,
            pageSize,
            totalCount,
            dashboardList: lists,
          });
        }
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
        if (!res.data.lists.length) {
          const newPage = payload.current - 1;
          const params = { current: newPage, pageSize: payload.pageSize }
          const result = yield call(getDashboardList, params);
          const { totalCount, currentPage, pageSize, lists } = result.data
          yield put({
            type: 'list',
            current: currentPage,
            pageSize,
            totalCount,
            dashboardList: lists,
          });
        } else {
          const { totalCount, currentPage, pageSize, lists } = res.data
          yield put({
            type: 'list',
            current: currentPage,
            pageSize,
            totalCount,
            dashboardList: lists,
          });
        }
      }
      if (callback) {
        callback(response);
      }
    },
    // 查询一条记录
    *getById({ payload, callback }, { call }) {
      const response = yield call(getDashBoardById, payload);
      if (response.msgCode === 'SUCCESS') {
        if (callback) {
          callback(response);
        }
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
