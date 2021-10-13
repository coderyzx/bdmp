import React, { Component, Fragment } from 'react';
import { Table, Divider, Tooltip } from 'antd';
import { connect } from 'dva';
import RowEditModal from './component/RowEditModal';
import RowAddModal from './component/RowAddModal';
import RowSelectDelModal from './component/RowSelectDelModal';
import RowDetailsModal from './component/RowDetailsModal';
import FormPropsAddDrawer from './component/FormPropsAddDrawer';
import PreviewDisplayDrawer from './component/PreviewDisplayDrawer';
import { getAllFormRecordByPage, getAllDashBoard } from '@/services/formManage';
import { selectAllDict } from '@/services/dict';
import styles from './index.less';

@connect(({ formManage }) => ({
  dictItemList: formManage.dictItemList,
}))
class FormConfigManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tableRow: {},
      verified: false,
      chartTypeData: [],
      totalCount: 10,
      current: 1,
      pageSize: 10,
      selectedRowKeys: [],
      allDashBoard: [],
    };
  }

  componentDidMount() {
    this.initial();
  }

  initial = async () => {
    const resp = await getAllFormRecordByPage({ current: 1, pageSize: 10 });
    const allDashBoard = await getAllDashBoard();
    await this.getDictTypeList();
    this.setState({
      verified: false,
      allDashBoard,
     });
    this.getFormRecordData(resp);
  }

  getFormRecordData = resp => {
    if (resp.msgCode === 'SUCCESS') {
      this.setState({
        chartTypeData: resp.data.lists,
        totalCount: resp.data.totalCount,
        current: resp.data.currentPage,
        pageSize: resp.data.pageSize,
        verified: true,
      });
    }
  }

  getDictTypeList = async () => {
    const dictResp = await selectAllDict();
    const dictTypeList = dictResp.data;
    const { dispatch } = this.props;
    dispatch({
      type: 'formManage/getDictTypeList',
      payload: dictTypeList,
    });
  }

  onSelectedRowKeysChange = selectedRowKeys => {
    this.setState({
      selectedRowKeys,
    });
  }

  handleRowEidtModal = tableRow => {
    this.edit.showModal();
    const { dispatch } = this.props;
    dispatch({
      type: 'formManage/changeFormId',
      payload: tableRow.id,
    });
    this.setState({
      tableRow,
      selectedRowKeys: [],
    });
  }

  handleRowDeleteMoadl = tableRow => {
    this.delete.showModal();
    this.setState({
      tableRow,
      selectedRowKeys: [],
    });
  }

  handleRowDetailsModal = tableRow => {
    this.details.showModal();
    this.setState({
      tableRow,
      selectedRowKeys: [],
    })
  }

  handlePreview = tableRow => {
    this.previewForm.showDrawer();
    this.setState({
      tableRow,
      selectedRowKeys: [],
    })
  }

  handleAddFormProps = tableRow => {
    this.addFormProps.showDrawer();
    const { dispatch } = this.props;
    dispatch({
      type: 'formManage/changeFormId',
      payload: tableRow.id,
    });
    this.setState({
      tableRow,
      selectedRowKeys: [],
    })
  }

  // 分页
  pageChange = async page => {
    // console.log({ current: page.current, pageSize: page.pageSize })
    const resp = await getAllFormRecordByPage({ current: page.current, pageSize: page.pageSize });
    this.getFormRecordData(resp);
  }

  renderTitle = () => {
    const { pageSize, selectedRowKeys, current, allDashBoard } = this.state;
    const ele = (
      <div className={styles.tableTitle}>
          <div className={styles.titleLeft}>Form管理列表</div>
          <div className={styles.titleRight}>
            <RowAddModal updateData={this.getFormRecordData} pageSize={pageSize}
                         allDashBoard={allDashBoard}/>
            <RowSelectDelModal updateData={this.getFormRecordData} pageSize={pageSize}
                               selectedRowKeys={selectedRowKeys} current={current}/>
          </div>
      </div>
    );
    return ele
  }

  // 父组件调用子组件方法
  onRefEdit = ref => {
    this.edit = ref;
  }

  onRefDetails = ref => {
    this.details = ref;
  }

  onRefAddFormProps = ref => {
    this.addFormProps = ref;
  }

  onRefPreviewForm = ref => {
    this.previewForm = ref;
  }

  render() {
    const { chartTypeData, tableRow, allDashBoard,
            totalCount, current, pageSize, selectedRowKeys, verified } = this.state;
    const paginationProps = {
        showQuickJumper: true,
        showSizeChanger: true,
        showTotal: () => `共${totalCount}条`,
        current,
        pageSize,
        total: totalCount,
    }
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectedRowKeysChange,
    };
    const columns = [
      {
        title: '表单名称',
        dataIndex: 'formName',
        key: 'formName',
        width: '10%',
        align: 'center',
        render: text => <a href="#!">{text}</a>,
      },
      {
        title: '描述说明',
        dataIndex: 'describtion',
        key: 'describtion',
        width: '25%',
        align: 'center',
        onCell: () => ({
            style: {
              maxWidth: 180,
              overflow: 'hidden',
              whiteSpace: 'nowrap',
              textOverflow: 'ellipsis',
              cursor: 'pointer',
            },
          }),
          render: text => <Tooltip placement="topLeft" title={text}>{text}</Tooltip>,
      },
      {
        title: '创建时间',
        dataIndex: 'createTime',
        key: 'createTime',
        align: 'center',
      },
      {
        title: '修改时间',
        dataIndex: 'updateTime',
        key: 'updateTime',
        width: '15%',
        align: 'center',
      },
      {
        title: '关联仪表盘',
        dataIndex: 'type',
        key: 'type',
        align: 'center',
      },
      {
        title: '操作',
        dataIndex: 'operation',
        key: 'operation',
        align: 'center',
        render: (text, record) => (
          chartTypeData.length >= 1 ? (
            <Fragment>
              <a href="#!" onClick={() => this.handleRowEidtModal(record)}>
                <i className="iconfont icon-edit">编辑</i>
              </a>
              <Divider type="vertical" />
              <a href="#!" onClick={() => this.handleAddFormProps(record)}>
                <i className="iconfont icon-add-circle">添加属性</i>
              </a>
              <Divider type="vertical" />
              <a href="#!" onClick={() => this.handlePreview(record)}>
                <i className="iconfont icon-dongtaiyulan">表单预览</i>
              </a>
              <Divider type="vertical" />
              <a href="#!" onClick={() => this.handleRowDetailsModal(record)}>
                <i className="iconfont icon-xiangqing-">详情</i>
              </a>
            </Fragment>
          ) : null
        ),
      },
    ];
    return (
      <div className={styles.layout}>
        <Table
          rowKey="id"
          loading={!verified}
          className={styles.table}
          rowSelection={rowSelection}
          columns={columns}
          dataSource={chartTypeData}
          bordered
          title={() => this.renderTitle()}
          pagination={paginationProps}
          onChange={this.pageChange}
        />
        <RowEditModal onRef={this.onRefEdit} updateData={this.getFormRecordData}
                      editRow={tableRow} current={current} pageSize={pageSize}
                      allDashBoard={allDashBoard}/>
        <RowDetailsModal tableRow={tableRow} onRef={this.onRefDetails}/>
        <FormPropsAddDrawer onRef={this.onRefAddFormProps}/>
        <PreviewDisplayDrawer onRef={this.onRefPreviewForm} tableRow={tableRow}/>
      </div>
    )
  }
}
export default FormConfigManage;
