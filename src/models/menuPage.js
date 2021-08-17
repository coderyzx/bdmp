
import { getMenuPage } from '@/services/menuPage';

const menuPageModel = {
  namespace: 'menuPageModel',
  state: {
    data: [],
  },
  effects: {

    *getMenuPage ({ payload, callback }, { call, put }) {
        const response = yield call(getMenuPage, payload);
        if (response.code === 'menu000') {
          yield put({
            type: 'menuPage',
            payload: response.data,
          });
          if (callback) {
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
        data: payload,
      }
    },

  },
};

export default menuPageModel;
