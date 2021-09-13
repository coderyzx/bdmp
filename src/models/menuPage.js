
import { getMenuPageData, getMenuDataById, postNewMenu, postUpdateMenu, getDeleteMenu, postDeleteMenuArray } from '@/services/menuPage';
import { getMenuPageKey } from '@/utils/templateLib';

const menuPageModel = {
  namespace: 'menuPageModel',
  state: {
    data: [],
    editData: [],
  },

  effects: {
    // 查询所有
    *getMenuPage ({ callback }, { call, put }) {
      const response = yield call(getMenuPageData);
      console.log(response);
      if (response.code === 'U000000') {
        yield put({
          type: 'menuPage',
          payload: response.data,
        });
        callback(response);
      } else {
        callback(response);
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
        callback(res);
      } else {
        callback(response);
      }
    },
    // 查询单一行ID
    *getMenuById({ payload, callback }, { call, put }) {
      const response = yield call(getMenuDataById, payload);
      if (response.code === 'U000000') {
        yield put({
          type: 'editData',
          payload: response.data,
        });
        callback(response);
      } else {
        callback(response);
      }
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
        callback(res);
      } else {
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
        callback(res);
      } else {
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
        callback(res);
      } else {
        callback(response);
      }
    },


  },
  reducers: {
    menuPage(state, { payload }) {
      return {
        ...state,
        data: getMenuPageKey(payload),
      }
    },
    editData(state, { payload }) {
      return {
        ...state,
        editData: getMenuPageKey(payload),
      }
    },

  },
};

export default menuPageModel;
