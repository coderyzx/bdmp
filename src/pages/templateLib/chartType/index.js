import React, { Component, Fragment } from 'react';
import { Table, Divider, Tooltip, Row, Col } from 'antd';
import moment from 'moment';
import RowEditModal from './component/RowEditModal';
import RowDeleteModal from './component/RowDeleteModal';
import RowAddModal from './component/RowAddModal';
import RowSelectDelModal from './component/RowSelectDelModal';
import RowDetailsModal from './component/RowDetailsModal';
import Filter from './component/Filter';
import { getInitial, getTypeIdList, getTypeNameList, pageChangeData } from '@/services/chartType';
import styles from './index.less';

class ChartType extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tableRow: {},
      verified: false,
      chartTypeData: [],
      typeIdList: ['请选择'],
      typeNameList: ['请选择'],
      totalCount: 10,
      current: 1,
      pageSize: 10,
      selectedRowKeys: [],
      loadingFilter: true,
    };
  }

  componentDidMount() {
    this.initial();
  }

  initial = async () => {
    const resp = await getInitial(10);
    const typeIdList = await getTypeIdList();
    const typeNameList = await getTypeNameList();
    this.setState({ verified: false });
    this.getChartTypeData(resp, typeIdList, typeNameList);
  }

  getChartTypeData = (resp, typeIdList, typeNameList) => {
    if (resp.msgCode === 'SUCCESS') {
      let currentData = [...resp.data.lists];
      currentData = resp.data.lists.map((item, index) => {
        const time = moment(item.createDate);
        currentData[index].createDate = time.format('YYYY/MM/DD HH:mm:ss');
        return currentData[index];
      });
      this.setState({
        chartTypeData: currentData,
        totalCount: resp.data.totalCount,
        current: resp.data.currentPage,
        pageSize: resp.data.pageSize,
        verified: true,
      });
    }
    if (typeIdList.msgCode === 'SUCCESS' && typeNameList.msgCode === 'SUCCESS') {
      this.setState({
        typeIdList: typeIdList.data,
        typeNameList: typeNameList.data,
        loadingFilter: false,
      });
    }
  }

  // selectRow = record => {
  //   const selectedRowKeys = [...this.state.selectedRowKeys];
  //   if (selectedRowKeys.indexOf(record.id) >= 0) {
  //     selectedRowKeys.splice(selectedRowKeys.indexOf(record.id), 1);
  //   } else {
  //     selectedRowKeys.push(record.id);
  //   }
  //   this.setState({
  //     selectedRowKeys,
  //   })
  // }

  onSelectedRowKeysChange = selectedRowKeys => {
    this.setState({
      selectedRowKeys,
    });
  }

  handleRowEidtModal = tableRow => {
    this.edit.showModal(tableRow);
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

  // 分页
  pageChange = async page => {
    // console.log({ current: page.current, pageSize: page.pageSize })
    const resp = await pageChangeData({ current: page.current, pageSize: page.pageSize });
    const { typeIdList, typeNameList } = this.state;
    this.getChartTypeData(resp, typeIdList, typeNameList);
  }

  renderTitle = () => {
    const ele = (
      <div className={styles.title}>图表类型管理列表</div>
    );
    return ele
  }

  // 父组件调用子组件方法
  onRefEdit = ref => {
    this.edit = ref;
  }

  onRefDelete = ref => {
    this.delete = ref;
  }

  onRefDetails = ref => {
    this.details = ref;
  }

  render() {
    const { chartTypeData, typeIdList, typeNameList, tableRow, loadingFilter,
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
        title: '类型编号',
        dataIndex: 'typeId',
        key: 'typeId',
        width: '10%',
        align: 'center',
        render: text => <a href="#!">{text}</a>,
      },
      {
        title: '类型名称',
        dataIndex: 'typeName',
        key: 'typeName',
        width: '10%',
        align: 'center',
      },
      {
        title: '类型图标',
        dataIndex: 'typeIcon',
        key: 'typeIcon',
        width: '10%',
        align: 'center',
        render: text => <img alt="类型图标" style={{ width: '25px' }} src={text} />,
      },
      {
        title: '描述',
        dataIndex: 'description',
        key: 'description',
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
        title: '创建人',
        dataIndex: 'creator',
        key: 'creator',
        align: 'center',
      },
      {
        title: '创建时间',
        dataIndex: 'createDate',
        key: 'createDate',
        width: '15%',
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
              <a href="#!" onClick={() => this.handleRowDeleteMoadl(record)}>
                <i className="iconfont icon-shanchu">删除</i>
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
        <Row className={styles.controlButton}>
          <Col span={16} style={{ textAlign: 'left' }}>
            <Filter typeIdList={ typeIdList }
                    typeNameList={typeNameList}
                    filterData={this.getChartTypeData}
                    initial={this.initial}
                    loadingFilter={loadingFilter}/>
          </Col>
          <Col span={8} style={{ textAlign: 'right' }}>
            <RowAddModal updateData={this.getChartTypeData} pageSize={pageSize}/>
            <RowSelectDelModal updateData={this.getChartTypeData} pageSize={pageSize}
                               selectedRowKeys={selectedRowKeys} current={current}/>
          </Col>
        </Row>
        <Table
          rowKey="id"
          loading={!verified}
          className={styles.table}
          rowSelection={rowSelection}
          columns={columns}
          dataSource={chartTypeData}
          bordered
          title={() => this.renderTitle()}
          // onRow={record => ({
          //   onClick: () => {
          //     this.selectRow(record);
          //   },
          // })}
          pagination={paginationProps}
          onChange={this.pageChange}
        />
        <RowEditModal onRef={this.onRefEdit} updateData={this.getChartTypeData}
                      editRow={tableRow} current={current} pageSize={pageSize}/>
        <RowDeleteModal onRef={this.onRefDelete} updateData={this.getChartTypeData}
                        deleteRow={tableRow} current={current} pageSize={pageSize}/>
        <RowDetailsModal tableRow={tableRow} onRef={this.onRefDetails}/>
      </div>
    )
  }
}
export default ChartType;
