import React, { Component, Fragment } from 'react';
import { Table, Divider, Tooltip, Row, Col, Spin } from 'antd';
import { connect } from 'dva';
import RowEditModal from './component/RowEditModal';
import RowDeleteModal from './component/RowDeleteModal';
import RowAddModal from './component/RowAddModal';
import RowSelectDelModal from './component/RowSelectDelModal';
import RowDetailsModal from './component/RowDetailsModal'
import Filter from './component/Filter';
import styles from './index.less';

@connect(({ chartType }) => ({
  chartTypeData: chartType.chartTypeData,
  selectedRowKeys: chartType.selectedRowKeys,
  totalCount: chartType.totalCount,
  current: chartType.current,
  pageSize: chartType.pageSize,
}))
class ChartType extends Component {
      state = {
          tableRow: { },
          verified: false,
        };

      componentDidMount() {
       this.props.dispatch({
         type: 'chartType/initial',
         successCB: () => {
          this.setState({ verified: true });
         },
        });
      }

      selectRow = record => {
        const { dispatch } = this.props;
        dispatch({
          type: 'chartType/selectRow',
          record,
        });
      }

      onSelectedRowKeysChange = selectedRowKeys => {
        const { dispatch } = this.props;
        console.log(selectedRowKeys)
        dispatch({
          type: 'chartType/selectedRowKeysChange',
          selectedRowKeys,
        });
      }

      handleRowEidtModal = tableRow => {
        this.edit.showModal(tableRow);
        this.setState({
          tableRow,
        });
      }

      handleRowDeleteMoadl = tableRow => {
        this.delete.showModal();
        this.setState({
          tableRow,
        });
      }

      handleRowDetailsModal = tableRow => {
        this.details.showModal();
        this.setState({
          tableRow,
        })
      }

      // 分页
      pageChange = page => {
        // console.log({ current: page.current, pageSize: page.pageSize })
        const { dispatch } = this.props;
        dispatch({
          type: 'chartType/pageChange',
          payload: { current: page.current, pageSize: page.pageSize },
        });
      }

      renderTitle = () => {
        const ele = (
          <div className={styles.title}>图表类型管理列表</div>
        )
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
        const { selectedRowKeys, chartTypeData, totalCount, current, pageSize } = this.props;
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
                  <a href="#!" onClick={() => this.handleRowEidtModal(record)}>编辑</a>
                  <Divider type="vertical" />
                  <a href="#!" onClick={() => this.handleRowDeleteMoadl(record)}>删除</a>
                  <Divider type="vertical" />
                  <a href="#!" onClick={() => this.handleRowDetailsModal(record)}>详情</a>
                </Fragment>
              ) : null
            ),
          },
        ];
        const { verified } = this.state;
        return (
          <div className={styles.layout}>
            {
              verified ? (
            <Row className={styles.controlButton}>
              <Col span={16} style={{ textAlign: 'left' }}>
                <Filter/>
              </Col>
              <Col span={8} style={{ textAlign: 'right' }}>
                <RowAddModal />
                <RowSelectDelModal />
              </Col>
            </Row>) : <Spin size="large" tip="淡定点，有点卡，要么你网卡，要么你电脑不行，当然，也可能是服务器炸了"/>
            }
            <Table
            rowKey="id"
            loading={!verified}
            className={styles.table}
            rowSelection={rowSelection}
            columns={columns}
            dataSource={chartTypeData}
            bordered
            title={() => this.renderTitle()}
            onRow={record => ({
              onClick: () => {
                this.selectRow(record);
              },
            })}
            pagination={paginationProps}
            onChange={this.pageChange}
            />
            <RowEditModal onRef={this.onRefEdit} editRow={this.state.tableRow}/>
            <RowDeleteModal onRef={this.onRefDelete} deleteRow={this.state.tableRow}/>
            <RowDetailsModal tableRow={this.state.tableRow} onRef={this.onRefDetails}/>
          </div>
        )
      }
}
export default ChartType;
