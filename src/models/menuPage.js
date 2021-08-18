
import { getMenuPage} from '@/services/menuPage';

const menuPageModel = {
  namespace: 'menuPageModel',
  state: {
    data: [],
  },
  // subscriptions: {
  //   setup({ dispatch, history }) {  // 这里的方法名可以随便命名，当监听有变化的时候就会依次执行这的变化,这里的dispatch和history和之前说的是一样的
  //     window.onresize = () => {   //这里表示的当浏览器的页面的大小变化时就会触发里面的dispatch方法，这里的save就是reducers中的方法名
  //       dispatch (type:"save")  
  //     }
  //   },
 
  //   onClick ({dispatch}) {
  //     document.addEventListener('click',() => {   //这里表示当鼠标点击时就会触发里面的dispatch命令，这里的save就是reducers中的方法名
  //       dispatch (type:"save")
  //     })
  //   }
  // },
 
  // setupHistory({dispatch,history}){
  //   history.listen((location) => {
  //     console.log(location)   //这里可以获取当前变化的history路径以及参数，hash所有值，这样就可以在路由地址变化后做处理
  //   })
  // },

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

    // *postNewMenuPage({payload,callback}, {call,put}){
    //   console.log(payload);
    //   const response = yield call(postNewMenuPage,payload);
    //   if (response.code === 'menu001') {
    //     yield put({
    //       type: 'menuPage',
    //       payload: response.data,
    //     });
    //     if (callback) {
    //       callback();
    //     }
    //   }
    // },

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
