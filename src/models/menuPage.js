
import { getMenuPageData, getMenuDataById, postNewMenu, postUpdateMenu, getDeleteMenu, postDeleteMenuArray } from '@/services/menuPage';
import { getMenuPageKey } from '@/utils/templateLib';

const menuPageModel = {
  namespace: 'menuPageModel',
  state: {
    data: [],
    editData:[],
  },

  effects: {
    // 查询所有
    *getMenuPage ({ payload, callback }, { call, put }) {
      const response = yield call(getMenuPageData, payload);
      // console.log(response);
      if (response) {
        yield put({
          type: 'menuPage',
          payload: response,
        });
        if (callback) {
          callback();
        }
      }
    },
    // 增加
    *postNewMenu({ payload,callback }, { call, put }) {
      // console.log(payload);
      const response = yield call(postNewMenu, payload);
      // console.log(response);
      if (response === 200) {
        const res = yield call(getMenuPageData);
        yield put({
          type: 'menuPage',
          payload: res,
        });
        if (callback) {
          callback(response);
        }
      }
    },
    // 查询单一行ID
    *getMenuById({ payload }, { call, put }) {
      // console.log(payload);
      const response = yield call(getMenuDataById, payload);
      // console.log(response);
      if (response) {
        yield put({
          type: 'editData',
          payload: response,
        });
      }
    },
    // 修改
    *postEditMenu({ payload,callback }, { call, put }) {
      console.log(payload);
      const response = yield call(postUpdateMenu, payload);
      // console.log(response);
      if (response === 200) {
        const res = yield call(getMenuPageData, payload);
        yield put({
          type: 'menuPage',
          payload: res,
        });
        if (callback) {
          callback(response);
        }
      }else{
        console.log('error');
      }
    },
    // 删除
    *getDeleteMenu({ payload }, { call, put }) {
      // console.log(payload);
      const response = yield call(getDeleteMenu, payload);
      // console.log(response);
      if (response === 200) {
        const res = yield call(getMenuPageData);
        yield put({
          type: 'menuPage',
          payload: res,
        });
      }
    },
    // 批量删除
    *postDeleteMenu({ payload ,callback}, { call, put }) {
      // console.log(payload);
      const response = yield call(postDeleteMenuArray, payload);
      // console.log(response);
      if (response) {
        const res = yield call(getMenuPageData);
        yield put({
          type: 'menuPage',
          payload: res,
        });
        if(callback){
          callback();
        }
      }
    },


  },
  reducers: {
    menuPage(state, { payload }) {
      // console.log(payload);
      return {
        ...state,
        data: getMenuPageKey(payload),
      }
    },
    editData(state, { payload }) {
      // console.log(payload);
      return {
        ...state,
        editData: getMenuPageKey(payload),
      }
    },

  },
};

export default menuPageModel;
