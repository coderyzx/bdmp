 /* eslint-disable */ 
import React from 'react';
import { connect } from 'dva';
import { Table, Button, Popconfirm, Form, Divider, Input, InputNumber,Tooltip,Modal } from 'antd';
import CreateForm from './createForm';
// import Editable from './editable';
// import EditableCell from './editableCell';
import styles from './index.less';

const EditableContext = React.createContext();
// 表格行内编辑
class EditableCell extends React.Component {
  getInput = () => {
    // console.log(this.props.inputType);
    if (this.props.inputType === 'number') {
      return <InputNumber />;
    }
    return <Input />;
  };
  renderCell = ({ getFieldDecorator }) => {
    const {
        editing,
        dataIndex,
        title,
        inputType,
        record,
        index,
        children,
        ...restProps
    } = this.props;
    // console.log('inputType: ',inputType);
    return (
      <td {...restProps}>
        {editing ? (
          <Form.Item style={{ margin: 0 }}>
            {getFieldDecorator(dataIndex, {
              // rules: [
              //   {
              //     required: true,
              //     message: `请选择内容 ${title}!`,
              //   }
              // ],
              initialValue: record[dataIndex],
            })(this.getInput())}
          </Form.Item>
        ) : (
          children
        )}
      </td>
    );
  };

  render() {
      return (
          <EditableContext.Consumer>{this.renderCell}</EditableContext.Consumer>
      );
  }
}


@connect(({ menuPageModel }) => (
  {
    dataSource: menuPageModel.data,
  }),
)
class MenuPage extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      visible: false,//添加显示对话框
      visible2: false,//删除显示对话框
      confirmLoading: false,//添加加载
      loading:true,//表格加载
      editingKey:'',//行是否可编辑
      iconLoading: false,//编辑保存加载
      selectedRowKeys: [], //选择一行
      deleteLoading:false,//选择多行删除加载
    };
    this.columns = [
        {
          title: ' id',
          dataIndex: 'id',
          key: 'id',
          fixed: 'left',
          width: 100,
          sorter: (a, b) => a.id - b.id,
          sortDirections: ['descend'],
          editable: true,
        }, // 主键
        { title: 'parentCode', dataIndex: 'parentCode', key: 'parentCode', width: 120,editable: true, 
        }, // 父节点
        { title: 'parentLabel', dataIndex: 'parentLabel', key: 'parentLabel', width: 120 ,editable: true,ellipsis: true,}, // 父标签
        { title: 'level', dataIndex: 'level', key: 'level', width: 120,editable: true,ellipsis: true, }, // 级别
        { title: 'code', dataIndex: 'code', key: 'code', width: 120,editable: true,ellipsis: true, }, // 编号
        { title: 'sort', dataIndex: 'sort', key: 'sort', width: 120 ,editable: true,ellipsis: true,}, // 排序编号
        { title: 'classLabel', dataIndex: 'classLabel', key: 'classLabel', width: 120,editable: true,ellipsis: true, },
        { title: 'classTttle', dataIndex: 'classTttle', key: 'classTttle', width: 120,editable: true,ellipsis: true, },
        { title: 'classPath', dataIndex: 'classPath', key: 'classPath', width: 120,editable: true,ellipsis: true, },
        { title: 'jumpCode', dataIndex: 'jumpCode', key: 'jumpCode', width: 120,editable: true, ellipsis: true,},
        { title: 'jumpPath', dataIndex: 'jumpPath', key: 'jumpPath', width: 120 ,editable: true,ellipsis: true,
          onCell: () => {
            return {
              style: {
                maxWidth: 120,
                overflow: 'hidden',
                whiteSpace: 'nowrap',
                textOverflow:'ellipsis',
              }
            }
          },
          render: (text) => <Tooltip placement="topLeft" title={text}>{text}</Tooltip>
        }, // 跳转路径
        { title: 'layoutType', dataIndex: 'layoutType', key: 'layoutType', width: 120 ,editable: true,ellipsis: true,},
        { title: 'classInfo', dataIndex: 'classInfo', key: 'classInfo', width: 120,editable: true,ellipsis: true, 
          onCell: () => {
            return {
              style: {
                maxWidth: 120,
                overflow: 'hidden',
                whiteSpace: 'nowrap',
                textOverflow:'ellipsis',
              }
            }
          },
          render: (text) => <Tooltip placement="topLeft" title={text}>{text}</Tooltip>
        },
        { title: 'classLabelEn', dataIndex: 'classLabelEn', key: 'classLabelEn', width: 120,editable: true,ellipsis: true, },
        { title: 'classTttleEn', dataIndex: 'classTttleEn', key: 'classTttleEn', width: 120,editable: true, ellipsis: true,},
        { title: 'classInfoEn', dataIndex: 'classInfoEn', key: 'classInfoEn', width: 120 ,editable: true,ellipsis: true,},
        { title: 'classIcon', dataIndex: 'classIcon', key: 'classIcon', width: 120 ,editable: true,ellipsis: true,},
        { title: 'introCrid', dataIndex: 'introCrid', key: 'introCrid', width: 120 ,editable: true,ellipsis: true,},
        { title: 'componentCode', dataIndex: 'componentCode', key: 'componentCode', width: 150,editable: true,ellipsis: true,
          onCell: () => {
            return {
              style: {
                maxWidth: 150,
                overflow: 'hidden',
                whiteSpace: 'nowrap',
                textOverflow:'ellipsis',
              }
            }
          },
          render: (text) => <Tooltip placement="topLeft" title={text}>{text}</Tooltip>
        }, // 组件编号
        {
          title: 'Operation',
          key: 'Operation',
          fixed: 'right',
          width: 210,
          render: (text,record) => {
            const { editingKey } = this.state;
            const editable = this.isEditing(record);
            // console.log(editable);
            return(
              <span style={{width:"100%",display:'block'}}  >
                {editable ? (
                  <span>
                    <EditableContext.Consumer>
                      {form => (
                        <Button type="primary" size="small" 
                          onClick={() => this.save(form,  record.key)}
                          style={{ marginLeft: 3, marginRight: 8 }}
                          icon="save"
                          loading={this.state.iconLoading}
                        >
                          保存
                        </Button>
                      )}
                    </EditableContext.Consumer>
                    <Popconfirm title="Sure to cancel?" onConfirm={() => this.cancel(record.key)}>
                      <Button type="default" size="small"  >取&nbsp;&nbsp;&nbsp;消</Button>
                    </Popconfirm>
                  </span>
                  ):(
                    <Button type="primary" size="small" 
                      disabled={editingKey !== ''} 
                      onClick={() => this.edit(record.key)}
                      style={{ marginLeft:35}}
                      icon="edit"
                    >
                      编辑
                    </Button>
                  )
                }
                <Divider type="vertical" />
                {this.props.dataSource.length >= 1 ? (
                  <Popconfirm title="确认删除吗?" onConfirm={() => this.handleDelete(record.id)}>
                    <Button type="danger" size="small" icon="delete"  ></Button>
                  </Popconfirm>
                  ) : null}
              </span>
            )
          },
        },
    ];
  }

  //初始化获得表格
  componentDidMount () {
    const { dispatch } = this.props;
    dispatch({
      type: 'menuPageModel/getMenuPage',
      payload: {},
    });
    this.timer1 = setTimeout(() => {
      this.setState({ loading: false });
    }, 600);
  }

  // 新建一项,添加到表格中去
  showModal = () => {
    this.setState({ visible: true });
  };

  handleCancel = () => {
    this.setState({ visible: false });
  };

  handleCreate = () => {
    const { form } = this.formRef.props;
    // const {data} = this.state;
    const { dispatch } = this.props;
    // const regexp = new RegExp(/^1(3|4|5|6|7|8)\d{9}$/);
    form.validateFields((err, values) => {
      console.log('Received values of form: ', values);
      if (err) {//如果有一个校验不通过，代码将不再往下执行
        return;
      }
      //校验通过，调接口传参
      dispatch({
        type: 'menuPageModel/postNewMenu',
        payload: values,
      });
      // this.setState({ data:[...data,values]});
      this.setState({
          confirmLoading: true,
          loading: true
      });
      this.timer2 = setTimeout(() => {
        this.setState({ 
          confirmLoading: false,
          visible: false,
          loading: false 
        });
      }, 800);
      form.resetFields();
    });
  };

  saveFormRef = formRef => {
    this.formRef = formRef;
  };
  
  // 删除某一行
  handleDelete = id => {
    const {dispatch} = this.props;
    dispatch({
      type: 'menuPageModel/getDeleteMenu',
      payload: id,
    });
  };

  //删除选择项
  showDelete = () => {
    this.setState({ visible2: true });
  };
  deleteSelection = selectedRowKeys =>{
    // console.log(selectedRowKeys);
    const {dispatch} = this.props;
      dispatch({
        type: 'menuPageModel/postDeleteMenu',
        payload: selectedRowKeys,
      });
      this.setState({ 
        selectedRowKeys: [],
        visible2: true,
        deleteLoading:true, 
        loading: true
      });
      this.timer3 = setTimeout(() => {
        this.setState({
          deleteLoading:false, 
          visible2: false,
          loading: false
        });
      }, 800);
  };

  onSelectChange = selectedRowKeys => {
    // console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({ selectedRowKeys });
  };

  //编辑表格行
  isEditing = record => record.key === this.state.editingKey;

  cancel = () => {
    this.setState({ editingKey: '' });
  };

  save(form, key) {
    // console.log(record);
    form.validateFields((error, row) => {
      if (error) {
        return;
      }
      const {dataSource,dispatch} = this.props;
      const newData = [...dataSource];
      // console.log(newData);
      const index = newData.findIndex(item => key === item.key);
      // console.log(index);
      if (index > -1) {
        // const item = newData[index];
        // console.log(item);
        dispatch({
          type: 'menuPageModel/postEditMenu',
          payload: row,
        });
        this.setState({
          iconLoading: true 
        });
        this.timer4 = setTimeout(() => {
          this.setState({ 
            editingKey: '',
            iconLoading: false
          });
        }, 600);
      } else {
        // newData.push(row);
        dispatch({
          type: 'menuPageModel/postEditMenu',
          payload: row,
        });
        this.setState({
          iconLoading: true 
        });
        this.timer4 = setTimeout(() => {
          this.setState({ 
            editingKey: '',
            iconLoading: false
          });
        }, 600);
      }
    });
  }

  edit(key) {
    this.setState({ editingKey: key });
  }


  componentWillUnMount = () => {

    //清除定时器
    clearTimeout( this.timer1);
    clearTimeout( this.timer2);
    clearTimeout( this.timer3);
    clearTimeout( this.timer4);
  }


  render() {
    const { dataSource } = this.props;
    // 定义可编辑的row和cell
    const components = {
      body: {
        cell: EditableCell,
      },
    };
    // 为columns的每一列都增加onCell属性。
    const columns = this.columns.map((col, index) => {
      if (!col.editable) {
        return col;
      }
      return {
        ...col,
        onCell: record => ({
          record,
          inputType: col.dataIndex === 'age' ? 'number' : 'text',
          dataIndex: col.dataIndex,
          title: col.title,
          editing: this.isEditing(record),
        }),
      };
    });
    // const {confirmLoading,visible,data,loading} = this.state;
    const {confirmLoading,visible,loading,deleteLoading,selectedRowKeys} = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };
    const hasSelected = selectedRowKeys.length > 0;

    return (
      <div style={{ margin: '0 50px' }}>  
        <div className={styles.title} >菜单页面维护</div>
        <div className={styles.bar}>
          <Button type="danger" size='large' 
          onClick={this.showDelete}
          disabled={!hasSelected}
          icon="delete"
          >
            删除
          </Button>
          <Button onClick={this.showModal} type="primary" size='large' style={{ marginLeft: 30}}>
            添加一项
          </Button>
        </div>
        <Modal
          okType= 'danger'
          visible={this.state.visible2}
          onOk={()=>this.deleteSelection(rowSelection.selectedRowKeys)}
          onCancel={this.handleCancel}
          confirmLoading={deleteLoading}
        >
          <p className={styles.selectItem}>
            确认删除所选择的<b>{hasSelected ? `${selectedRowKeys.length}项` : ''}吗？</b>
          </p>
        </Modal>
        <CreateForm
          wrappedComponentRef={this.saveFormRef}
          visible={visible}
          onCancel={this.handleCancel}
          onCreate={this.handleCreate}
          confirmLoading={confirmLoading}
        />
        <EditableContext.Provider value={this.props.form}>
          <Table
            components={components}
            columns={columns}
            dataSource={dataSource}
            bordered
            loading={loading}
            // rowKey="id"
            scroll={{ x: 1500, y: 470 }}
            pagination={{
              onChange: this.cancel,
            }}
            rowSelection={rowSelection}
            // rowClassName={styles.editableRow}
          />
        </EditableContext.Provider>
      </div>
    );
  }
}
const EditableFormTable = Form.create()(MenuPage);

export default EditableFormTable;