
import React from 'react';
import { connect } from 'dva';
import { Table, Button, Popconfirm, Form, Divider, Tooltip,
  Modal, Icon, notification, Empty, Spin } from 'antd';
// import moment  from 'moment';
import CreateForm from './createForm';
import EditableForm from './editable';
import styles from './index.less';
import dele from '@/assets/delete.svg';
import RowDetailsModal from './DetailsModal';
// const EditableContext = React.createContext();
// 表格行内编辑

@connect(({ menuPageModel }) => ({
  dataSource: menuPageModel.data,
}))
class MenuPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true, // 表格是否加载
      visibleAdd: false, // 添加显示对话框
      visibleDelete: false, // 删除显示对话框
      visibleEdit: false, // 编辑显示对话框
      confirmLoading: false, // 添加是否加载
      editLoading: false, // 编辑保存是否加载
      // editingKey: '', // 行是否可编辑
      selectedRowKeys: [], // 选择一行
      deleteLoading: false, // 选择多行删除是否加载
      editData: {}, // 某一行编辑时的默认数据
      tableRow: {}, // 详情
      isParentLabel: true,
    };
    this.columns = [
      {
        title: '菜单名称',
        dataIndex: 'classLabel',
        key: 'classLabel',
        // fixed: 'left',
        width: '13%',
        editable: true,
        align: 'center',
        onCell: () => ({
          style: {
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
          },
        }),
        render: text => (
          <Tooltip placement="top" title={text}>
            {text}
          </Tooltip>
        ),
        sorter: (a, b) => a.classLabel.length - b.classLabel.length,
      },
      {
        title: '菜单级别',
        dataIndex: 'level',
        key: 'level',
        width: '10%',
        editable: true,
        align: 'center',
        sorter: (a, b) => a.level - b.level,
      },
      {
        title: '父级菜单名称',
        dataIndex: 'parentLabel',
        key: 'parentLabel',
        width: '13%',
        editable: true,
        align: 'center',
        onCell: () => ({
          style: {
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
          },
        }),
        render: text => (
          <Tooltip placement="top" title={text}>
            {text}
          </Tooltip>
        ),
      },
      { title: '排序序号', dataIndex: 'sort', key: 'sort', width: '10%', editable: true, ellipsis: true, align: 'center' },
      {
        title: '创建者',
        dataIndex: 'createUserId',
        key: 'createUserId',
        width: '10%',
        editable: true,
        align: 'center',
        onCell: () => ({
          style: {
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
          },
        }),
        render: text => (
          <Tooltip placement="top" title={text}>
            {text}
          </Tooltip>
        ),
      },
      {
        title: '创建时间',
        dataIndex: 'createDatatime',
        key: 'createDatatime',
        width: '15%',
        editable: true,
        align: 'center',
        onCell: () => ({
          style: {
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
          },
        }),
        render: text => (
          <Tooltip placement="top" title={text}>
            {text}
          </Tooltip>
        ),
      },
      {
        title: '修改者',
        dataIndex: 'modifyUserId',
        key: 'modifyUserId',
        width: '10%',
        editable: true,
        align: 'center',
        onCell: () => ({
          style: {
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
          },
        }),
        render: text => (
          <Tooltip placement="top" title={text}>
            {text}
          </Tooltip>
        ),
      },
      {
        title: '修改时间',
        dataIndex: 'modifyDatatime',
        key: 'modifyDatatime',
        width: '15%',
        editable: true,
        align: 'center',
        onCell: () => ({
          style: {
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
          },
        }),
        render: text => (
          <Tooltip placement="top" title={text}>
            {text}
          </Tooltip>
        ),
      },
      {
        title: '操作',
        key: 'Operation',
        // fixed: 'right',
        width: '20%',
        align: 'center',
        render: (text, record) => (
          <span style={{ width: '100%', display: 'block' }}>
            <a href="#!" onClick={() => this.showEdit(record)}>
              <i className="iconfont icon-edit">编辑</i>
            </a>
            <Divider type="vertical" style={{ margin: '0 10px' }} />
            {this.props.dataSource.length >= 1 ? (
              <Popconfirm
                title="确认删除吗?"
                onConfirm={() => this.handleDelete(record.id)}
                icon={<Icon type="question-circle-o" style={{ color: 'red' }} />}
                okType="danger"
              >
                <a href="#!" >
                  <i className="iconfont icon-shanchu">删除</i>
                </a>
              </Popconfirm>
            ) : null}
            <Divider type="vertical" style={{ margin: '0 10px' }} />
            <a href="#!" onClick={() => this.handleRowDetailsModal(record)}>
              <i className="iconfont icon-xiangqing-">详情</i>
            </a>
          </span>
        ),
      },
    ];
  }

  // 初始化获得表格
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'menuPageModel/getMenuPage',
      payload: {},
      callback: () => {
        this.setState({ loading: false });
      },
      failCallback: () => {
        this.setState({ loading: false });
        const args = {
          message: '提示',
          description: '服务器未响应',
        };
        notification.error(args);
      },
    });
  }

  // 新建一项,添加到表格中去
  showModal = () => {
    const { dispatch } = this.props;
    this.setState({
      visibleAdd: true,
    });
    console.log(1);
    dispatch({
      type: 'menuPageModel/getLabel',
      payload: {},
    });
  };

  handleCancel = () => {
    this.setState({ visibleAdd: false, loading: false });
  };

  handleCreate = () => {
    const { form } = this.formRef.props;
    const { dispatch } = this.props;
    form.validateFields((err, values) => {
      console.log(values);
      if (err) {
        return;
      }
      this.setState({
        confirmLoading: true,
        loading: true,
      });
      dispatch({
        type: 'menuPageModel/postNewMenu',
        payload: values,
        callback: res => {
          if (res.code === 'U000000') {
            this.setState({
              confirmLoading: false,
              visibleAdd: false,
              loading: false,
            });
            const args = {
              message: '提示',
              description: '新建数据成功',
            };
            notification.success(args);
          } else {
            this.setState({
              confirmLoading: false,
              visibleAdd: false,
              loading: false,
            });
            const args = {
              message: '提示',
              description: '新建数据失败',
            };
            notification.info(args);
          }
        },
      });
      form.resetFields();
    });
  };

  saveFormRef = formRef => {
    this.formRef = formRef;
  };

  // 删除某一行
  handleDelete = id => {
    console.log(id);
    const { dispatch } = this.props;
    dispatch({
      type: 'menuPageModel/getDeleteMenu',
      payload: id,
      callback: res => {
        if (res.code === 'U000000') {
          const args = {
            message: '提示',
            description: '删除成功',
          };
          notification.success(args);
        } else {
          const args = {
            message: '提示',
            description: '删除失败',
          };
          notification.info(args);
        }
      },
    });
  };

  // 删除多行
  showDelete = () => {
    this.setState({ visibleDelete: true });
  };

  // 选中table整行
  selectRow = record => {
    const { selectedRowKeys } = this.state;
    const selectRow = selectedRowKeys;
    if (selectRow.indexOf(record.id) >= 0) {
      selectRow.splice(selectRow.indexOf(record.id), 1);
    } else {
      selectRow.push(record.id);
    }
    this.setState({ selectedRowKeys: selectRow })
  }

  onSelectChange = selectedRowKeys => {
    this.setState({ selectedRowKeys });
  };

  deleteSelection = selectedRowKeys => {
    const { dispatch } = this.props;
    this.setState({
      selectedRowKeys: [],
      visibleDelete: true,
      deleteLoading: true,
    });
    dispatch({
      type: 'menuPageModel/postDeleteMenu',
      payload: selectedRowKeys,
      callback: res => {
        if (res.code === 'U000000') {
          this.setState({
            deleteLoading: false,
            visibleDelete: false,
          });
          const args = {
            message: '提示',
            description: '批量删除成功',
          };
          notification.success(args);
        } else {
          this.setState({
            deleteLoading: false,
            visibleDelete: false,
          });
          const args = {
            message: '提示',
            description: '批量删除失败',
          };
          notification.info(args);
        }
      },
    });
  };

  deleteSelectionCancel = () => {
    this.setState({ visibleDelete: false });
  };

  // 编辑弹框
  showEdit = record => {
    this.setState({
      visibleEdit: true,
      editData: record,
    });
    const { dispatch } = this.props;
    dispatch({
      type: 'menuPageModel/getLabel',
      payload: {},
      callback: res => {
        if (res.code === 'U000000') {
          if (record.level === '1') {
            this.setState({
              isParentLabel: true,
            });
          }
          if (record.level === '2') {
            this.setState({
              isParentLabel: false,
            });
          }
        }
      },
    });
  };

  cancelEdit = () => {
    this.setState({ visibleEdit: false, loading: false });
  };

  saveEdit = () => {
    const { form } = this.formRefEdit.props;
    const { dispatch } = this.props;
    const { editData } = this.state;
    console.log(editData);
    this.setState({
      editLoading: true,
      loading: true,
    });
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      dispatch({
        type: 'menuPageModel/postEditMenu',
        payload: { ...values, id: editData.id },
        callback: res => {
          if (res.code === 'U000000') {
          this.setState({
            editLoading: false,
            visibleEdit: false,
            loading: false,
          });
          const args = {
            message: '提示',
            description: '跟新数据成功',
          };
          notification.success(args);
          } else {
            this.setState({
              confirmLoading: false,
              visibleAdd: false,
              loading: false,
            });
            const args = {
              message: '提示',
              description: '跟新数据失败',
            };
            notification.info(args);
          }
        },
      });
      form.resetFields();
    });
  };

  saveRef = formRefEdit => {
    this.formRefEdit = formRefEdit;
  };

  // 详情
  handleRowDetailsModal = tableRow => {
    this.details.showModal();
    this.setState({
      tableRow,
    })
  }

  onRefDetails = ref => {
    this.details = ref;
  }

  render() {
    const { dataSource } = this.props;
    const {
      confirmLoading,
      visibleAdd,
      loading,
      visibleDelete,
      deleteLoading,
      selectedRowKeys,
      visibleEdit,
      editLoading,
      editData,
      isParentLabel,
    } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };
    const hasSelected = selectedRowKeys.length > 0;
    const titleDelete = <p style={{ fontSize: 30, marginBottom: 5, textAlign: 'center' }}>删除</p>;
    const renderList = dataSource.length > 0 && !loading;
    const emptyList = dataSource.length === 0 && !loading;
    return (
      <div style={{ marginRight: 20 }} className={styles.tableContent} >
        <div className={styles.title}>菜单页面维护</div>
        <div className={styles.bar}>
          <Button onClick={this.showModal} type="primary" style={{ marginRight: 30 }}>
            <i className="iconfont icon-add-circle">添加菜单页面</i>
          </Button>
          <Button
            type="danger"
            onClick={this.showDelete}
            disabled={!hasSelected}
          >
            <i className="iconfont icon-piliangshanchu"> 批量删除菜单页面</i>
          </Button>
        </div>
        <CreateForm
          wrappedComponentRef={this.saveFormRef}
          visible={visibleAdd}
          onCancel={this.handleCancel}
          onCreate={this.handleCreate}
          confirmLoading={confirmLoading}
        />
        { loading && <div className={styles.spin}><Spin />加载中...</div>}
        { emptyList && <Empty image={Empty.PRESENTED_IMAGE_SIMPLE}/> }
        { renderList &&
        <>
          <Modal
            okType="danger"
            title={titleDelete}
            visible={visibleDelete}
            onOk={() => this.deleteSelection(selectedRowKeys)}
            onCancel={this.deleteSelectionCancel}
            confirmLoading={deleteLoading}
          >
            <p style={{ textAlign: 'center', marginBottom: 15 }}>
              <img src={dele} alt="404"/>
            </p>
            <p className={styles.selectItem}>
              确认删除所选择的&nbsp;<b>{hasSelected ? `${selectedRowKeys.length}` : ''}</b>
              &nbsp;项吗？
            </p>
          </Modal>
          <RowDetailsModal tableRow={this.state.tableRow} onRef={this.onRefDetails}/>
          <EditableForm
            wrappedComponentRef={this.saveRef}
            visible={visibleEdit}
            onCancel={this.cancelEdit}
            onCreate={this.saveEdit}
            confirmLoading={editLoading}
            editData={editData}
            isParent={isParentLabel}
          />
          <Table
            // components={components}
            columns={this.columns}
            dataSource={dataSource}
            bordered
            // loading={loading}
            rowKey="id"
            // scroll={{ x: 1500, y: 470 }}
            // pagination={{
            //   onChange: this.cancel,
            // }}
            rowSelection={rowSelection}
            onRow={record => ({
              onDoubleClick: () => {
                this.selectRow(record);
              },
            })}
          />
        </>
        }
      </div>
    );
  }
}
const EditableFormTable = Form.create()(MenuPage);

export default EditableFormTable;
