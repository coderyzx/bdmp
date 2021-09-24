
import { getMenuPageData, getMenuDataById, postNewMenu, postUpdateMenu, getDeleteMenu, postDeleteMenuArray, getParentLabel } from '@/services/menuPage';
// import { getMenuPageKey } from '@/utils/templateLib';

const menuPageModel = {
  namespace: 'menuPageModel',
  state: {
    data: [],
    editData: [],
    parentLabel: [],
  },

  effects: {
    // 查询所有
    *getMenuPage ({ callback, failCallback }, { call, put }) {
      const response = yield call(getMenuPageData);
      if (response.code === 'U000000') {
        yield put({
          type: 'menuPage',
          payload: response.data,
        });
        if (callback) {
          callback(response);
        }
      } else {
        failCallback(response);
      }
    },
    // 增加
    *postNewMenu({ payload, callback }, { call, put }) {
      const response = yield call(postNewMenu, payload);
      if (response.code === 'U000000') {
        const res = yield call(getMenuPageData);
        yield put({
          type: 'menuPage',
          payload: res.data,
        });
      }
      if (callback) {
        callback(response);
      }
    },
    // 查询单一行ID
    *getMenuById({ payload, callback }, { call, put }) {
      const response = yield call(getMenuDataById, payload);
        yield put({
          type: 'editData',
          payload: response.data,
        });
      callback(response);
    },
    // 修改
    *postEditMenu({ payload, callback }, { call, put }) {
      const response = yield call(postUpdateMenu, payload);
      console.log(response);
      if (response.code === 'U000000') {
        const res = yield call(getMenuPageData);
        yield put({
          type: 'menuPage',
          payload: res.data,
        });
      }
      if (callback) {
        callback(response);
      }
    },
    // 删除
    *getDeleteMenu({ payload, callback }, { call, put }) {
      const response = yield call(getDeleteMenu, payload);
      if (response.code === 'U000000') {
        const res = yield call(getMenuPageData);
        yield put({
          type: 'menuPage',
          payload: res.data,
        });
      }
      if (callback) {
        callback(response);
      }
    },
    // 批量删除
    *postDeleteMenu({ payload, callback }, { call, put }) {
      const response = yield call(postDeleteMenuArray, payload);
      if (response.code === 'U000000') {
        const res = yield call(getMenuPageData);
        yield put({
          type: 'menuPage',
          payload: res.data,
        });
      }
      if (callback) {
        callback(response);
      }
    },
    // 查询父名称
    *getLabel({ payload, callback, failCallback }, { call, put }) {
      const response = yield call(getParentLabel, payload);
      if (response.code === 'U000000') {
        yield put({
          type: 'parentLabel',
          payload: response.data,
        });
        if (callback) {
          callback(response);
        }
      } else {
        failCallback(response);
      }
    },

  },
  reducers: {
    menuPage(state, { payload }) {
      return {
        ...state,
        // data: getMenuPageKey(payload),
        data: payload,
      }
    },
    editData(state, { payload }) {
      return {
        ...state,
        // editData: getMenuPageKey(payload),
        editData: payload,
      }
    },
    parentLabel(state, { payload }) {
      return {
        ...state,
        parentLabel: payload,
      }
    },

  },
};

export default menuPageModel;
