// import { message } from 'antd';
import moment from 'moment';
import * as service from '@/services/dict';// 把所有方法都存在service这个对象中，所以下面可以通过点获取对应方法

export default {
    namespace: 'dict',
    state: {
      dictData: [],
      selectedRowKeys: [],
      typeIdList: [],
      typeNameList: [],
      totalCount: 10,
      current: 1,
      pageSize: 10,
      treeData: [],
      selectedDict: {},
    },

    reducers: {
      // 进入table页面展示数据
      showData(state, { resp, typeIdList, typeNameList }) {
        const respData = resp.data;
        let currentData = [...respData.lists];
        currentData = respData.lists.map((item, index) => {
          const time = moment(item.create_datetime);
          currentData[index].create_datetime = time.format('YYYY/MM/DD HH:mm:ss');
          return currentData[index];
        })
        return { ...state,
                dictData: currentData,
                typeIdList,
                typeNameList,
                totalCount: respData.totalCount,
                current: respData.currentPage,
                pageSize: respData.pageSize,
                selectedRowKeys: [],
               };
      },
      // 存储已选的table行的key值
      selectedRowKeysChange(state, { selectedRowKeys }) {
        // console.log(selectedRowKeys)
        return { ...state, selectedRowKeys }
      },
      // 选中table整行
      showDictItem(state, { resp, selectedDict }) {
        const treeData = [{}];
        treeData[0].id = '0';
        treeData[0].children = [...resp.data];
        treeData[0].value = selectedDict.type;
        // console.log(treeData)
        return { ...state, treeData, selectedDict }
      },
    },
    effects: {
      // 获取后台所有数据
      *initial({ successCB = () => {} }, { call, put, select }) {
        const pageSize = yield select(state => state.dict.pageSize);
        const resp = yield call(service.getInitial, pageSize);
        const typeIdList = yield call(service.getTypeIdList);
        const typeNameList = yield call(service.getTypeNameList);
        // console.log(resp)
        if (resp.msgCode === 'SUCCESS') {
          yield put({
            type: 'showData',
            resp,
            typeIdList: typeIdList.data,
            typeNameList: typeNameList.data,
          });
          successCB();
        }
      },
      // 更改page后的数据
      *pageChange({ payload }, { call, put, select }) {
        const resp = yield call(service.pageChange, payload);
        const { typeIdList, typeNameList } = yield select(state => state.dict);
        yield put({
          type: 'showData',
          resp,
          typeIdList,
          typeNameList,
        });
      },
      // 编辑table行数据
      *editDictData({ payload, callback }, { call, put, select }) {
        const { pageSize, current } = yield select(state => state.dict);
        yield call(service.editDictData, { ...payload });
        const resp = yield call(service.pageChange, { pageSize, current });
        const typeIdList = yield call(service.getTypeIdList);
        const typeNameList = yield call(service.getTypeNameList);
        yield put({
          type: 'showData',
          resp,
          typeIdList: typeIdList.data,
          typeNameList: typeNameList.data,
        });
        callback();
      },
      // 删除已选的table行数据
      *deleteSelectedDict({ callback }, { call, put, select }) {
        const { pageSize, current, selectedRowKeys } = yield select(state => state.dict);
        yield call(service.deleteSelectedDict, selectedRowKeys);
        let resp = yield call(service.pageChange, { pageSize, current });
        const typeIdList = yield call(service.getTypeIdList);
        const typeNameList = yield call(service.getTypeNameList);
        if (resp.data.lists.length === 0 && current > 1) {
          const update = { current: current - 1, pageSize };
          resp = yield call(service.pageChange, update);
          yield put({
            type: 'showData',
            resp,
            typeIdList: typeIdList.data,
            typeNameList: typeNameList.data,
          });
        } else {
          const update = { current, pageSize };
          resp = yield call(service.pageChange, update);
          yield put({
            type: 'showData',
            resp,
            typeIdList: typeIdList.data,
            typeNameList: typeNameList.data,
          });
        }
        callback();
      },
      // 删除单行table数据
      *singleRowDictDelete({ payload, callback }, { call, put, select }) {
        const { pageSize, current } = yield select(state => state.dict);
        yield call(service.deleteDictData, payload);
        let resp = yield call(service.pageChange, { pageSize, current });
        const typeIdList = yield call(service.getTypeIdList);
        const typeNameList = yield call(service.getTypeNameList);
        if (resp.data.lists.length === 0 && current > 1) {
          const update = { current: current - 1, pageSize };
          resp = yield call(service.pageChange, update);
          yield put({
            type: 'showData',
            resp,
            typeIdList: typeIdList.data,
            typeNameList: typeNameList.data,
          });
        } else {
          const update = { current, pageSize };
          resp = yield call(service.pageChange, update);
          yield put({
            type: 'showData',
            resp,
            typeIdList: typeIdList.data,
            typeNameList: typeNameList.data,
          });
        }
        callback();
      },
      // 创建一条table数据
      *addDictData({ payload, callback }, { call, put, select }) {
        const { pageSize } = yield select(state => state.dict);
        yield call(service.addDictData, { ...payload });
        const resp = yield call(service.pageChange, { pageSize, current: 1 });
        const typeIdList = yield call(service.getTypeIdList);
        const typeNameList = yield call(service.getTypeNameList);
        yield put({
          type: 'showData',
          resp,
          typeIdList: typeIdList.data,
          typeNameList: typeNameList.data,
        });
        callback();
      },
      // 多条件查询
      *queryData({ payload }, { call, put, select }) {
        const { pageSize } = yield select(state => state.dict);
        const resp = yield call(service.queryData, { ...payload, pageSize, currentPage: 1 });
        const typeIdList = yield call(service.getTypeIdList);
        const typeNameList = yield call(service.getTypeNameList);
        console.log(resp.data.lists)
        yield put({
          type: 'showData',
          resp,
          typeIdList: typeIdList.data,
          typeNameList: typeNameList.data,
        });
      },
      /** ****字典子项**** */
      // 获取相关字典类型的所有子项
      *getDictItemInitial({ payload }, { call, put }) {
        const resp = yield call(service.getDictItemInitial, payload.id);
        console.log(resp);
        yield put({
          type: 'showDictItem',
          resp,
          selectedDict: payload,
        });
      },
      *addDictItemData({ payload, callback }, { call, put, select }) {
        const { selectedDict } = yield select(state => state.dict);
        yield call(service.addDictItemData, { ...payload, dict_id: selectedDict.id });
        const resp = yield call(service.getDictItemInitial, selectedDict.id);
        yield put({
          type: 'showDictItem',
          resp,
          selectedDict,
        });
        callback();
      },
      *editDictItemData({ payload, callback }, { call, put, select }) {
        const { selectedDict } = yield select(state => state.dict);
        yield call(service.editDictItemData, { ...payload, dict_id: selectedDict.id });
        const resp = yield call(service.getDictItemInitial, selectedDict.id);
        yield put({
          type: 'showDictItem',
          resp,
          selectedDict,
        });
        callback();
      },
      *deleteDictItemData({ payload, callback }, { call, put, select }) {
        const { selectedDict } = yield select(state => state.dict);
        yield call(service.deleteDictItemData, payload);
        const resp = yield call(service.getDictItemInitial, selectedDict.id);
        yield put({
          type: 'showDictItem',
          resp,
          selectedDict,
        });
        callback();
      },
    },
    subscriptions: {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      setup({ dispatch, history }) {
        return history.listen(({ pathname }) => {
          if (pathname === '/templateLib/dictionary') {
            // // 监听进入页面时，发个请求获取数据。
              // dispatch({ type: 'test' });
          }
        });
      },
    },
  };
