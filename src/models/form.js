// import { message } from 'antd';
// import * as service from '@/services/formManage';// 把所有方法都存在service这个对象中，所以下面可以通过点获取对应方法

export default {
    namespace: 'formManage',
    state: {
      // isPreview: false,
      formId: undefined,
      dictTypeList: [],
      dictId: undefined,
    },

    reducers: {
      changeFormId(state, { payload }) {
        return { ...state, formId: payload }
      },
      getDictTypeList(state, { payload }) {
        return { ...state, dictTypeList: payload }
      },
      getDictItemList(state, { payload }) {
        return { ...state, dictId: payload }
      },
    },
    effects: {
    },
    subscriptions: {
    },
  };
