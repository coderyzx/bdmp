
import React from 'react';
import { connect } from 'dva';
import { Table, Button, Popconfirm, Form, Divider, Tooltip,
  Modal, Icon, notification } from 'antd';
import CreateForm from './createForm';
import EditableForm from './editable';
import styles from './index.less';
import dele from '@/assets/delete.svg';
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
    };
    this.columns = [
      {
        title: '父节点编号',
        dataIndex: 'parentCode',
        key: 'parentCode',
        fixed: 'left',
        width: 130,
        sorter: (a, b) => a.parentCode - b.parentCode,
        sortDirections: ['descend'],
        editable: true,
      },
      {
        title: '父标签',
        dataIndex: 'parentLabel',
        key: 'parentLabel',
        width: 140,
        editable: true,
        ellipsis: true,
      },
      {
        title: '级别',
        dataIndex: 'level',
        key: 'level',
        width: 120,
        editable: true,
        ellipsis: true,
      },
      { title: '编号', dataIndex: 'code', key: 'code', width: 120, editable: true, ellipsis: true },
      { title: '排序编号', dataIndex: 'sort', key: 'sort', width: 120, editable: true, ellipsis: true },
      {
        title: '跳转编号',
        dataIndex: 'jumpCode',
        key: 'jumpCode',
        width: 120,
        editable: true,
        ellipsis: true,
      },
      {
        title: '跳转路径',
        dataIndex: 'jumpPath',
        key: 'jumpPath',
        width: 120,
        editable: true,
        ellipsis: true,
        onCell: () => ({
          style: {
            maxWidth: 120,
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
          },
        }),
        render: text => (
          <Tooltip placement="topLeft" title={text}>
            {text}
          </Tooltip>
        ),
      },
      {
        title: '布局编号',
        dataIndex: 'layoutType',
        key: 'layoutType',
        width: 120,
        editable: true,
        ellipsis: true,
      },
      {
        title: '组件编号',
        dataIndex: 'componentCode',
        key: 'componentCode',
        width: 120,
        editable: true,
        ellipsis: true,
        onCell: () => ({
            style: {
              maxWidth: 150,
              overflow: 'hidden',
              whiteSpace: 'nowrap',
              textOverflow: 'ellipsis',
            },
          }),
        render: text => (<Tooltip placement="topLeft" title={text}>{text}</Tooltip>),
      },
      {
        title: '类标签',
        dataIndex: 'classLabel',
        key: 'classLabel',
        width: 120,
        editable: true,
        ellipsis: true,
      },
      {
        title: 'classTttle',
        dataIndex: 'classTttle',
        key: 'classTttle',
        width: 120,
        editable: true,
        ellipsis: true,
      },
      {
        title: 'classPath',
        dataIndex: 'classPath',
        key: 'classPath',
        width: 120,
        editable: true,
        ellipsis: true,
      },
      {
        title: 'classInfo',
        dataIndex: 'classInfo',
        key: 'classInfo',
        width: 120,
        editable: true,
        ellipsis: true,
        onCell: () => ({
            style: {
              maxWidth: 120,
              overflow: 'hidden',
              whiteSpace: 'nowrap',
              textOverflow: 'ellipsis',
            },
          }),
        render: text => (<Tooltip placement="topLeft" title={text}>{text}</Tooltip>),
      },
      {
        title: 'classLabelEn',
        dataIndex: 'classLabelEn',
        key: 'classLabelEn',
        width: 120,
        editable: true,
        ellipsis: true,
      },
      {
        title: 'classTttleEn',
        dataIndex: 'classTttleEn',
        key: 'classTttleEn',
        width: 120,
        editable: true,
        ellipsis: true,
      },
      {
        title: 'classInfoEn',
        dataIndex: 'classInfoEn',
        key: 'classInfoEn',
        width: 120,
        editable: true,
        ellipsis: true,
      },
      {
        title: 'classIcon',
        dataIndex: 'classIcon',
        key: 'classIcon',
        width: 120,
        editable: true,
        ellipsis: true,
      },
      {
        title: 'introCrid',
        dataIndex: 'introCrid',
        key: 'introCrid',
        width: 120,
        editable: true,
        ellipsis: true,
      },
      {
        title: '操作',
        key: 'Operation',
        fixed: 'right',
        width: 200,
        align: 'center',
        render: (text, record) => (
            <span style={{ width: '100%', display: 'block' }}>
              <Button
                type="primary"
                size="small"
                onClick={() => this.showEdit(record)}
                icon="edit"
              >
                编辑
              </Button>
              <Divider type="vertical" />
              {this.props.dataSource.length >= 1 ? (
                <Popconfirm
                  title="确认删除吗?"
                  onConfirm={() => this.handleDelete(record.id)}
                  icon={<Icon type="question-circle-o" style={{ color: 'red' }} />}
                  okType="danger"
                >
                  <Button type="danger" size="small" icon="delete"></Button>
                </Popconfirm>
              ) : null}
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
      callback: res => {
        this.setState({ loading: false });
        if (res.code !== 'U000000') {
          this.setState({ loading: false });
          const args = {
            message: '提示',
            description: '菜单页面管理获取数据失败',
          };
          notification.info(args);
        }
      },
    });
  }

  // 新建一项,添加到表格中去
  showModal = () => {
    this.setState({
      visibleAdd: true,
    });
  };

  handleCancel = () => {
    this.setState({ visibleAdd: false });
  };

  handleCreate = () => {
    const { form } = this.formRef.props;
    const { dispatch } = this.props;
    form.validateFields((err, values) => {
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
            // dispatch({
            //   type: 'menuPageModel/getMenuPage',
            // })
            const args = {
              message: '提示',
              description: '新建数据成功',
            };
            notification.info(args);
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
          notification.info(args);
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

  // 删除选择项
  showDelete = () => {
    this.setState({ visibleDelete: true });
  };

  // selectRow = record => {
  //   // console.log(record);
  // }

  onSelectChange = selectedRowKeys => {
    this.setState({ selectedRowKeys });
  };

  deleteSelection = selectedRowKeys => {
    const { dispatch } = this.props;
    this.setState({
      selectedRowKeys: [],
      visibleDelete: true,
      deleteLoading: true,
      loading: true,
    });
    dispatch({
      type: 'menuPageModel/postDeleteMenu',
      payload: selectedRowKeys,
      callback: res => {
        if (res.code === 'U000000') {
          this.setState({
            deleteLoading: false,
            visibleDelete: false,
            loading: false,
          });
          const args = {
            message: '提示',
            description: '批量删除成功',
          };
          notification.info(args);
        } else {
          this.setState({
            deleteLoading: false,
            visibleDelete: false,
            loading: false,
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
  };

  cancelEdit = () => {
    this.setState({ visibleEdit: false });
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
      console.log('Received values of form: ', values);
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
          notification.info(args);
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
    } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };
    // console.log(rowSelection);
    const hasSelected = selectedRowKeys.length > 0;
    const titleDelete = <p style={{ fontSize: 30, marginBottom: 5, textAlign: 'center' }}>删除</p>;
    return (
      <div style={{ margin: '0 15px' }}>
        <div className={styles.title}>菜单页面维护</div>
        <div className={styles.bar}>
          <Button
            type="danger"
            size="large"
            onClick={this.showDelete}
            disabled={!hasSelected}
            icon="delete"
          >
            批量删除
          </Button>
          <Button onClick={this.showModal} type="primary" size="large" style={{ marginLeft: 30 }}>
            添加一项
          </Button>
        </div>
        <Modal
          okType="danger"
          title={titleDelete}
          visible={visibleDelete}
          onOk={() => this.deleteSelection(selectedRowKeys)}
          onCancel={this.deleteSelectionCancel}
          confirmLoading={deleteLoading}
        >
          <p style={{ textAlign: 'center', marginBottom: 15 }}>
            <img src={dele} />
          </p>
          <p className={styles.selectItem}>
            确认删除所选择的&nbsp;<b>{hasSelected ? `${selectedRowKeys.length}` : ''}</b>
            &nbsp;项吗？
          </p>
        </Modal>
        <EditableForm
          wrappedComponentRef={this.saveRef}
          visible={visibleEdit}
          onCancel={this.cancelEdit}
          onCreate={this.saveEdit}
          confirmLoading={editLoading}
          editData={editData}
        />
        <CreateForm
          wrappedComponentRef={this.saveFormRef}
          visible={visibleAdd}
          onCancel={this.handleCancel}
          onCreate={this.handleCreate}
          confirmLoading={confirmLoading}
        />
        <Table
          // components={components}
          columns={this.columns}
          dataSource={dataSource}
          bordered
          loading={loading}
          // rowKey="id"
          scroll={{ x: 1500, y: 470 }}
          // pagination={{
          //   onChange: this.cancel,
          // }}
          rowSelection={rowSelection}
          // onRow={record => ({
          //   onClick: () => {
          //     this.selectRow(record);
          //   },
          // })}
        />
      </div>
    );
  }
}
const EditableFormTable = Form.create()(MenuPage);

export default EditableFormTable;
