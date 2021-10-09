
import { getLogin, getRegister } from '@/services/global';

const loginModel = {
  namespace: 'loginModel',
  state: {
   username: '',
   password: '',
   loginStatus: false,
  },
  effects: {

    *submit({ payload, callback }, { call }) {
      const response = yield call(getLogin, payload);
      // console.log(response);
      callback(response);
    },

    *register({ payload, callback }, { call }) {
      const response = yield call(getRegister, payload);
      callback(response);
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
