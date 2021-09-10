/* eslint-disable */

import React from 'react';
import { connect } from 'dva';
import {Table,Button,Popconfirm,Form,Divider,Tooltip,
  Modal,Icon} from 'antd';
import CreateForm from './createForm';
import EditableForm from './editable';
import styles from './index.less';
import dele from '@/assets/delete.svg';
import {openNotificationLocal,openNotificationServer} from '@/utils/notification'
const EditableContext = React.createContext();
// 表格行内编辑

@connect(({ menuPageModel }) => ({
  dataSource: menuPageModel.data,
}))
class MenuPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true, //表格是否加载
      visibleAdd: false, //添加显示对话框
      visibleDelete: false, //删除显示对话框
      visibleEdit: false, //编辑显示对话框
      confirmLoading: false, //添加是否加载
      editLoading: false, //编辑保存是否加载
      editingKey: '', //行是否可编辑
      selectedRowKeys: [], //选择一行
      deleteLoading: false, //选择多行删除是否加载
      editData: {}, //某一行编辑时的默认数据
    };
    this.columns = [
      {
        title: 'parentCode',
        dataIndex: 'parentCode',
        key: 'parentCode',
        fixed: 'left',
        width: 130,
        sorter: (a, b) => a.parentCode - b.parentCode,
        sortDirections: ['descend'],
        editable: true,
      }, // 父节点
      {
        title: 'parentLabel',
        dataIndex: 'parentLabel',
        key: 'parentLabel',
        width: 120,
        editable: true,
        ellipsis: true,
      }, // 父标签
      {
        title: 'level',
        dataIndex: 'level',
        key: 'level',
        width: 120,
        editable: true,
        ellipsis: true,
      }, // 级别
      { title: 'code', dataIndex: 'code', key: 'code', width: 120, editable: true, ellipsis: true }, // 编号
      { title: 'sort', dataIndex: 'sort', key: 'sort', width: 120, editable: true, ellipsis: true }, // 排序编号
      {
        title: 'classLabel',
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
        title: 'jumpCode',
        dataIndex: 'jumpCode',
        key: 'jumpCode',
        width: 120,
        editable: true,
        ellipsis: true,
      },
      {
        title: 'jumpPath',
        dataIndex: 'jumpPath',
        key: 'jumpPath',
        width: 120,
        editable: true,
        ellipsis: true,
        onCell: () => {
          return {
            style: {
              maxWidth: 120,
              overflow: 'hidden',
              whiteSpace: 'nowrap',
              textOverflow: 'ellipsis',
            },
          };
        },
        render: text => (
          <Tooltip placement="topLeft" title={text}>
            {text}
          </Tooltip>
        ),
      }, // 跳转路径
      {
        title: 'layoutType',
        dataIndex: 'layoutType',
        key: 'layoutType',
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
        onCell: () => {
          return {
            style: {
              maxWidth: 120,
              overflow: 'hidden',
              whiteSpace: 'nowrap',
              textOverflow: 'ellipsis',
            },
          };
        },
        render: text => (
          <Tooltip placement="topLeft" title={text}>
            {text}
          </Tooltip>
        ),
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
        title: 'componentCode',
        dataIndex: 'componentCode',
        key: 'componentCode',
        width: 150,
        editable: true,
        ellipsis: true,
        onCell: () => {
          return {
            style: {
              maxWidth: 150,
              overflow: 'hidden',
              whiteSpace: 'nowrap',
              textOverflow: 'ellipsis',
            },
          };
        },
        render: text => (
          <Tooltip placement="topLeft" title={text}>
            {text}
          </Tooltip>
        ),
      }, // 组件编号
      {
        title: 'Operation',
        key: 'Operation',
        fixed: 'right',
        width: 210,
        render: (text, record) => {
          return (
            <span style={{ width: '100%', display: 'block' }}>
              <Button
                type="primary"
                size="small"
                onClick={() => this.showEdit(record)}
                style={{ marginLeft: 35 }}
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
          );
        },
      },
    ];
  }

  //初始化获得表格
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'menuPageModel/getMenuPage',
      payload: {},
      callback: (res) => {
        if(res === 401 ||res === 403||res === 404){
          this.setState({ loading: false });
          openNotificationLocal(res);
        }
        else if(res.status === 500 ){
          this.setState({ loading: false });
          openNotificationServer(res.status);
        }else if(res === undefined ){
          this.setState({ loading: false }); 
        }
        this.setState({ loading: false });
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
    // const {data} = this.state;
    const { dispatch } = this.props;
    // const regexp = new RegExp(/^1(3|4|5|6|7|8)\d{9}$/);
    form.validateFields((err, values) => {
      // console.log('Received values of form: ', values);
      if (err) {
        //如果有一个校验不通过，代码将不再往下执行
        return;
      }
      this.setState({
        confirmLoading: true,
        loading: true,
      });
      //校验通过，调接口传参
      dispatch({
        type: 'menuPageModel/postNewMenu',
        payload: values,
        callback: res => {
          if (res === 200) {
            this.setState({
              confirmLoading: false,
              visibleAdd: false,
              loading: false,
            });
          }
          if(res === 401 ||res === 403||res === 404){
            this.setState({
              confirmLoading: false,
              visibleAdd: false,
              loading: false,
            });
            openNotificationLocal(res);
          }
          else if(res.status === 500 ){
            this.setState({
              confirmLoading: false,
              visibleAdd: false,
              loading: false,
            });
            openNotificationServer(res.status);
          }else{
            this.setState({
              confirmLoading: false,
              visibleAdd: false,
              loading: false,
            }); 
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
    const { dispatch } = this.props;
    dispatch({
      type: 'menuPageModel/getDeleteMenu',
      payload: id,
      callback: (res) => {
        if(res === 401 ||res === 403||res === 404){
          openNotificationLocal(res);
        }else if(res.status === 500 ){
          openNotificationServer(res.status);
        }
      }
    });
  };

  //删除选择项
  showDelete = () => {
    this.setState({ visibleDelete: true });
  };
  deleteSelection = selectedRowKeys => {
    // console.log(selectedRowKeys);
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
      callback: () => {
        if(res === 401 ||res === 403||res === 404){
          this.setState({
            deleteLoading: false,
            visibleDelete: false,
            loading: false,
          });
          openNotificationLocal(res);
        }else if(res.status === 500 ){
          this.setState({
            deleteLoading: false,
            visibleDelete: false,
            loading: false,
          });
          openNotificationServer(res.status);
        }else{
          this.setState({
            deleteLoading: false,
            visibleDelete: false,
            loading: false,
          }); 
        }
      },
    });
  };
  deleteSelectionCancel = () => {
    this.setState({ visibleDelete: false });
  };

  onSelectChange = selectedRowKeys => {
    // console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({ selectedRowKeys });
  };

  //编辑弹框
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
    this.setState({
      editLoading: true,
      loading: true,
    });
    form.validateFields((err, values) => {
      console.log('Received values of form: ', values);
      if (err) {
        return;
      }
      //校验通过，调接口传参
      dispatch({
        type: 'menuPageModel/postEditMenu',
        payload: values,
        callback: res => {
          if (res === 200) {
            this.setState({
              editLoading: false,
              visibleEdit: false,
              loading: false,
            });
          }
          if(res === 400 || res === 401 ||res === 403||res === 404){
            this.setState({
              editLoading: false,
              visibleEdit: false,
              loading: false,
            });
            openNotificationLocal(res);
          }else if(res.status === 500 ){
            this.setState({
              editLoading: false,
              visibleEdit: false,
              loading: false,
            });
            openNotificationServer(res.status);
          }
          // this.setState({
          //   editLoading: false,
          //   visibleEdit: false,
          //   loading: false,
          // });
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
    const hasSelected = selectedRowKeys.length > 0;
    const titleDelete = <p style={{ fontSize: 30, marginBottom: 5, textAlign: 'center' }}>删除</p>;
    return (
      <div style={{ margin: '0 50px' }}>
        <div className={styles.title}>菜单页面维护</div>
        <div className={styles.bar}>
          <Button
            type="danger"
            size="large"
            onClick={this.showDelete}
            disabled={!hasSelected}
            icon="delete"
          >
            删除
          </Button>
          <Button onClick={this.showModal} type="primary" size="large" style={{ marginLeft: 30 }}>
            添加一项
          </Button>
        </div>
        <Modal
          okType="danger"
          title={titleDelete}
          visible={visibleDelete}
          onOk={() => this.deleteSelection(rowSelection.selectedRowKeys)}
          onCancel={this.deleteSelectionCancel}
          confirmLoading={deleteLoading}
        >
          <p style={{ textAlign: 'center', marginBottom: 15 }}>
            {/* <Icon type="delete" style={{ color:'red',fontSize: 50}}/> */}
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
          // rowClassName={styles.editableRow}
        />
      </div>
    );
  }
}
const EditableFormTable = Form.create()(MenuPage);

export default EditableFormTable;
