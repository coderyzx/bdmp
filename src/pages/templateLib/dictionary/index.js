import React, { Component, Fragment } from 'react';
import { Table, Divider, Tooltip, Row, Col, Spin } from 'antd';
import { connect } from 'dva';
import TableEditModal from './component/TableEditModal';
import TableDeleteModal from './component/TableDeleteModal';
import TableAddModal from './component/TableAddModal';
import TableSelectDelModal from './component/TableSelectDelModal';
import TableDetailsModal from './component/TableDetailsModal';
import Filter from './component/Filter';
import DictItem from './component/DictItem';
import styles from './index.less';

@connect(({ dict }) => ({
  dictData: dict.dictData,
  selectedRowKeys: dict.selectedRowKeys,
  totalCount: dict.totalCount,
  current: dict.current,
  pageSize: dict.pageSize,
}))
class Dictionary extends Component {
      state = {
          tableRow: { },
          verified: false,
        };

      componentDidMount() {
        this.props.dispatch({
          type: 'dict/initial',
          successCB: () => {
            this.setState({ verified: true });
           },
          });
      }

      // 选中table行事件
      selectRow = record => {
        const { dispatch } = this.props;
        dispatch({
          type: 'dict/getDictItemInitial',
          payload: record,
        });
      }

      onSelectedRowKeysChange = selectedRowKeys => {
        const { dispatch } = this.props;
        console.log(selectedRowKeys)
        dispatch({
          type: 'dict/selectedRowKeysChange',
          selectedRowKeys,
        });
      }

      handleRowEidtModal = tableRow => {
        this.edit.showModal();
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
        console.log({ current: page.current, pageSize: page.pageSize })
        const { dispatch } = this.props;
        dispatch({
          type: 'dict/pageChange',
          payload: { current: page.current, pageSize: page.pageSize },
        });
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

      // table标题
      renderTitle = () => {
        const ele = (
          <div className={styles.tableTitle}>
            <div className={styles.titleLeft}>字典管理列表</div>
          <div className={styles.titleRight}><TableAddModal /><TableSelectDelModal /></div>
          </div>
        )
        return ele
      }

      render() {
        const { selectedRowKeys, dictData, totalCount, current, pageSize } = this.props;
        const paginationProps = {
          showQuickJumper: true,
          showSizeChanger: true,
          showTotal: () => `共${totalCount}条`,
          current,
          pageSize,
          total: totalCount,
      }
        const columns = [
          {
            title: '字典编号',
            dataIndex: 'type_id',
            key: 'type_id',
            width: '10%',
            align: 'center',
            render: text => <a href="#!">{text}</a>,
          },
          {
            title: '字典名称',
            dataIndex: 'type',
            key: 'type',
            width: '15%',
            align: 'center',
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
            title: '创建时间',
            dataIndex: 'create_datetime',
            key: 'create_datetime',
            width: '15%',
            align: 'center',
          },
          {
            title: '操作',
            dataIndex: 'operation',
            key: 'operation',
            align: 'center',
            render: (text, record) => (
              dictData.length >= 1 ? (
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
        const rowSelection = {
          selectedRowKeys,
          onChange: this.onSelectedRowKeysChange,
        };
        return (
          <div>
            {
              verified ? (
            <Row className={styles.controlButton}>
                <Col span={24} style={{ textAlign: 'left' }}>
                  <Filter/>
                </Col>
            </Row>) : <Spin size="large" tip="淡定点，有点卡，要么你网卡，要么你电脑不行，当然，也可能是服务器炸了"/>
            }
            <div className={styles.layout}>
              <div className={styles.layoutLeft}>
                <Table
                  rowKey="id"
                  className={styles.table}
                  loading={!verified}
                  rowSelection={rowSelection}
                  columns={columns}
                  dataSource={dictData}
                  bordered
                  title = { () => this.renderTitle() }
                  onRow={record => ({
                    onClick: () => {
                      this.selectRow(record);
                    },
                  })}
                  pagination={paginationProps}
                  onChange={this.pageChange}
                />
                <TableEditModal onRef={this.onRefEdit} editRow={this.state.tableRow}/>
                <TableDeleteModal onRef={this.onRefDelete} deleteRow={this.state.tableRow}/>
                <TableDetailsModal tableRow={this.state.tableRow} onRef={this.onRefDetails}/>
              </div>
              <div className={styles.layoutRight}>
                <DictItem />
              </div>
            </div>
          </div>
        )
      }
}
export default Dictionary;
