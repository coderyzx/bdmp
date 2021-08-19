 /* eslint-disable */ 
import React from 'react';
import { connect } from 'dva';
import { Table, Button, Popconfirm, Form, Divider, Input, InputNumber, } from 'antd';
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
    // console.log('editing: ',editing);
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
      visible: false,
      confirmLoading: false,
      loading:true,
      editingKey:'',
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
        { title: 'parentCode', dataIndex: 'parentCode', key: 'parentCode', width: 120,editable: true, ellipsis: true,}, // 父节点
        { title: 'parentLabel', dataIndex: 'parentLabel', key: 'parentLabel', width: 120 ,editable: true,ellipsis: true,}, // 父标签
        { title: 'level', dataIndex: 'level', key: 'level', width: 120,editable: true,ellipsis: true, }, // 级别
        { title: 'code', dataIndex: 'code', key: 'code', width: 120,editable: true,ellipsis: true, }, // 编号
        { title: 'sort', dataIndex: 'sort', key: 'sort', width: 120 ,editable: true,ellipsis: true,}, // 排序编号
        { title: 'classLabel', dataIndex: 'classLabel', key: 'classLabel', width: 120,editable: true,ellipsis: true, },
        { title: 'classTttle', dataIndex: 'classTttle', key: 'classTttle', width: 120,editable: true,ellipsis: true, },
        { title: 'classPath', dataIndex: 'classPath', key: 'classPath', width: 120,editable: true,ellipsis: true, },
        { title: 'jumpCode', dataIndex: 'jumpCode', key: 'jumpCode', width: 120,editable: true, ellipsis: true,},
        { title: 'jumpPath', dataIndex: 'jumpPath', key: 'jumpPath', width: 200 ,editable: true,ellipsis: true,}, // 跳转路径
        { title: 'layoutType', dataIndex: 'layoutType', key: 'layoutType', width: 120 ,editable: true,ellipsis: true,},
        { title: 'classInfo', dataIndex: 'classInfo', key: 'classInfo', width: 120,editable: true,ellipsis: true, },
        { title: 'classLabelEn', dataIndex: 'classLabelEn', key: 'classLabelEn', width: 120,editable: true,ellipsis: true, },
        { title: 'classTttleEn', dataIndex: 'classTttleEn', key: 'classTttleEn', width: 120,editable: true, ellipsis: true,},
        { title: 'classInfoEn', dataIndex: 'classInfoEn', key: 'classInfoEn', width: 120 ,editable: true,ellipsis: true,},
        { title: 'classIcon', dataIndex: 'classIcon', key: 'classIcon', width: 120 ,editable: true,ellipsis: true,},
        { title: 'introCrid', dataIndex: 'introCrid', key: 'introCrid', width: 120 ,editable: true,ellipsis: true,},
        { title: 'componentCode', dataIndex: 'componentCode', key: 'componentCode', width: 150,editable: true,ellipsis: true, }, // 组件编号
        {
          title: 'Operation',
          key: 'Operation',
          fixed: 'right',
          width: 200,
          render: (text,record) => {
            const { editingKey } = this.state;
            const editable = this.isEditing(record);
            // console.log(editable);
            return(
              <span style={{width:"100%",}}  >
                {editable ? (
                  <span>
                    <EditableContext.Consumer>
                      {form => (
                        <a
                          onClick={() => this.save(form,  record.key)}
                          style={{ marginRight: 8 }}
                        >
                          Save
                        </a>
                      )}
                    </EditableContext.Consumer>
                    <Popconfirm title="Sure to cancel?" onConfirm={() => this.cancel(record.key)}>
                      <a>Cancel</a>
                    </Popconfirm>
                  </span>
                  ):(
                    <Button type="primary" size="small" 
                      disabled={editingKey !== ''} 
                      onClick={() => this.edit(record.key)}
                      style={{ marginLeft:30}}
                    >
                      Edit
                    </Button>
                  )
                }
                <Divider type="vertical" />
                {this.props.dataSource.length >= 1 ? (
                  <Popconfirm title="Sure to delete?" onConfirm={() => this.handleDelete(record.id)}>
                    <Button type="danger" size="small">Delete</Button>
                  </Popconfirm>
                  ) : null}
              </span>
            )
          },
        },
    ];
  }

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
  
  //编辑行
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
        const item = newData[index];
        console.log(item);
        // newData.splice(index, 1, {
        //   ...item,
        //   ...row,
        // });
        // console.log(row);
        dispatch({
          type: 'menuPageModel/postEditMenu',
          payload: row,
        });
        this.setState({
          editingKey: '' 
        });
      } else {
        // newData.push(row);
        dispatch({
          type: 'menuPageModel/postEditMenu',
          payload: row,
        });
        this.setState({
          // data:newData,
          editingKey: '' 
        });
      }
    });
  }

  edit(key) {
    this.setState({ editingKey: key });
  }

  // 删除某一行
  handleDelete = id => {
    // console.log(key);
    // const dataSource = [...this.props.dataSource];
    // const data = [...this.state.data];
    // this.setState({ data: data.filter(item => item.key !== key) });
    const {dispatch} = this.props;
    dispatch({
      type: 'menuPageModel/getDeleteMenu',
      payload: id,
    });
  };


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
      });
      this.timer2 = setTimeout(() => {
        this.setState({ 
          confirmLoading: false,
          visible: false 
        });
      }, 800);
      form.resetFields();
    });
  };

  saveFormRef = formRef => {
    this.formRef = formRef;
  };

  componentWillUnMount = () => {

    // //清除定时器
    clearTimeout( this.timer1);
    clearTimeout( this.timer2);
    clearTimeout( this.timer3);
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
    const {confirmLoading,visible,loading} = this.state;
    return (
      <div style={{ margin: '0 50px' }}>  
        <div className={styles.title} >菜单页面维护</div>
        <Button onClick={this.showModal} type="primary" size='large' style={{ marginBottom: 16 }}>
          Add New
        </Button>
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
            // dataSource={data}
            bordered
            loading={loading}
            // rowKey="id"
            scroll={{ x: 1500, y: 500 }}
            pagination={{
              onChange: this.cancel,
            }}
            rowClassName={styles.editableRow}
          />
        </EditableContext.Provider>
      </div>
    );
  }
}
const EditableFormTable = Form.create()(MenuPage);

export default EditableFormTable;

// MenuPage.propTypes = {
//   form: PropTypes.object,
// };