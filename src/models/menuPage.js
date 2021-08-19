
import { getMenuPageData,postNewMenu,postUpdateMenu,getDeleteMenu } from '@/services/menuPage';
import { getMenuPageKey } from '@/utils/menuPage';

const menuPageModel = {
  namespace: 'menuPageModel',
  state: {
    data: [],
  },

  effects: {
    //查询
    *getMenuPage ({ payload, callback }, { call, put }) {
      const response = yield call(getMenuPageData, payload);
      // console.log(response);
      if(response){
        yield put({
          type: 'menuPage',
          payload: response,
        });
        if (callback) {
          callback();
        }
      }
    },
    //增加
    *postNewMenu({payload}, {call,put}){
      // console.log(payload);
      const response =  yield call(postNewMenu,payload);
      // console.log(response);
      if(response){
        const res = yield call(getMenuPageData);
        yield put({
          type: 'menuPage',
          payload: res,
        });
      }
    },
    //修改  
    *postEditMenu({payload}, {call,put}){
      // console.log(payload);
      const response =  yield call(postUpdateMenu,payload);
      // console.log(response);
      if(response){
        const res = yield call(getMenuPageData);
        yield put({
          type: 'menuPage',
          payload: res,
        });
      }
    },
    //删除
    *getDeleteMenu({payload}, {call,put}){
      // console.log(payload);
      const response =  yield call(getDeleteMenu,payload);
      // console.log(response);
      if(response){
        const res = yield call(getMenuPageData);
        yield put({
          type: 'menuPage',
          payload: res,
        });
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

  },
};

export default menuPageModel;
