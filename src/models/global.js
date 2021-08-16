
import { getMenusList } from '@/services/global';

const globalModel = {
  namespace: 'globalModel',
  state: {
   menus: [],
   layoutVisibal: false,
   login: true,
  },
  // effects: {

  // *getMenusList ({ payload, callback }, { call, put }) {
  //     const response = yield call(getMenusList, payload);
  //     if (response.code === 'U000000') {
  //       yield put({
  //         type: 'updateMenus',
  //         payload: response.data,
  //       });

  //       if (callback) {
  //         callback();
  //       }
  //     }
  // },
  // },
  // reducers: {
  //   updateModalVisibal(state, { payload }) {
  //     return {
  //       ...state,
  //       layoutVisibal: payload.layoutVisibal,
  //     }
  //   },

  // },
};

export default globalModel;
