// import { message } from 'antd';
import moment from 'moment';
import * as service from '@/services/chartType';// 把所有方法都存在service这个对象中，所以下面可以通过点获取对应方法

export default {
    namespace: 'chartType',
    state: {
      chartTypeData: [],
      selectedRowKeys: [],
      typeIdList: [],
      typeNameList: [],
      totalCount: 10,
      current: 1,
      pageSize: 10,

    },

    reducers: {
      // 进入table页面展示数据
      showData(state, { resp, typeIdList, typeNameList }) {
        const respData = resp.data;
        let currentData = [...respData.lists];
        currentData = respData.lists.map((item, index) => {
          const time = moment(item.createDate);
          currentData[index].createDate = time.format('YYYY/MM/DD HH:mm:ss');
          return currentData[index];
        })
        return { ...state,
                chartTypeData: currentData,
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
        return { ...state, selectedRowKeys }
      },
      // 选中table整行
      selectRow(state, { record }) {
        const selectedRowKeys = [...state.selectedRowKeys];
        if (selectedRowKeys.indexOf(record.id) >= 0) {
          selectedRowKeys.splice(selectedRowKeys.indexOf(record.id), 1);
        } else {
          selectedRowKeys.push(record.id);
        }
        return { ...state, selectedRowKeys }
      },
    },
    effects: {
      // 获取后台所有数据
      *initial({ successCB = () => {} }, { call, put, select }) {
        const pageSize = yield select(state => state.chartType.pageSize);
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
        const resp = yield call(service.pageChangeData, payload);
        const { typeIdList, typeNameList } = yield select(state => state.chartType);
        yield put({
          type: 'showData',
          resp,
          typeIdList,
          typeNameList,
        });
      },
        // 编辑table行数据
      *editRowData({ payload, callback }, { call, put, select }) {
        const { pageSize, current } = yield select(state => state.chartType);
        yield call(service.editeRowData, payload);
        const resp = yield call(service.pageChangeData, { pageSize, current });
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
      *deleteSelectedRow({ callback }, { call, put, select }) {
        const { pageSize, current, selectedRowKeys } = yield select(state => state.chartType);
        yield call(service.deleteSelectedData, selectedRowKeys);
        let resp = yield call(service.pageChangeData, { pageSize, current });
        const typeIdList = yield call(service.getTypeIdList);
        const typeNameList = yield call(service.getTypeNameList);
        if (resp.data.lists.length === 0 && current > 1) {
          const update = { current: current - 1, pageSize };
          resp = yield call(service.pageChangeData, update);
          yield put({
            type: 'showData',
            resp,
            typeIdList: typeIdList.data,
            typeNameList: typeNameList.data,
          });
        } else {
          const update = { current, pageSize };
          resp = yield call(service.pageChangeData, update);
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
      *singleRowDelete({ payload, callback }, { call, put, select }) {
        const { pageSize, current } = yield select(state => state.chartType);
        yield call(service.deleteRowData, payload);
        let resp = yield call(service.pageChangeData, { pageSize, current });
        const typeIdList = yield call(service.getTypeIdList);
        const typeNameList = yield call(service.getTypeNameList);
        if (resp.data.lists.length === 0 && current > 1) {
          const update = { current: current - 1, pageSize };
          resp = yield call(service.pageChangeData, update);
          yield put({
            type: 'showData',
            resp,
            typeIdList: typeIdList.data,
            typeNameList: typeNameList.data,
          });
        } else {
          const update = { current, pageSize };
          resp = yield call(service.pageChangeData, update);
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
      *addRowData({ payload, callback }, { call, put, select }) {
        const { pageSize } = yield select(state => state.chartType);
        yield call(service.addData, payload);
        const resp = yield call(service.pageChangeData, { pageSize, current: 1 });
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
      // 多条件查询过滤数据
      *queryData({ payload }, { call, put, select }) {
        const { pageSize } = yield select(state => state.chartType);
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
    },
    subscriptions: {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      setup({ dispatch, history }) {
        return history.listen(({ pathname }) => {
          if (pathname === '/templateLib/chartType') {
            // 监听进入页面时，发个请求获取数据。
              // dispatch({ type: 'selectAll' });
          }
        });
      },
    },
  };
