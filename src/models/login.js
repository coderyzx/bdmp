
import { getLogin } from '@/services/global';

const loginModel = {
  namespace: 'loginModel',
  state: {
   username: '',
   password: '',
   loginStatus: false,
  },
  effects: {

    *submit({ payload }, { call, put }) {
      // console.log('payload:', payload);
      const response = yield call(getLogin, payload.username, payload.password);
      // console.log(response);
      if (response.code === 'U000000' && response.data.username === payload.username && response.data.password === payload.password) {
        yield put({
          type: 'login',
          payload: response.data.data,
        });
        // console.log(loginStatus);
      }
    },
  },
  reducers: {
    login(state, { payload }) {
      // console.log(payload);
      return {
        ...state,
        loginStatus: payload,
      }
    },

  },
};

export default loginModel;
