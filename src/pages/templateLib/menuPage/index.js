 /* eslint-disable */ 
import React from 'react';
import { connect } from 'dva';
import { Table, Button, Popconfirm, Form, Divider} from 'antd';
import CreateForm from './createForm';
import EditableCell from './editableCell';
import styles from './index.less';

const EditableContext = React.createContext();

@connect(({ menuPageModel }) => (
  {
    dataSource: menuPageModel.data,
  }),
)
class MenuPage extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      data:[
        {
          id: '1',
          parentCode: '1',
          parentLabel: '1',
          level: '1',
          code: '1',
          sort: '1',
          classLabel: '1',
          classTttle: '1',
          classPath: '/api/classPath/classPath/',
          jumpCode: '1',
          jumpPath: '/api/classPath/',
          layoutType: '1',
          classInfo: '1',
          classLabelEn: '1',
          classTttleEn: '1',
          classInfoEn: '1',
          classIcon: '1',
          introCrid: '1',
          componentCode: '1',
        },
      ],
      visible: false,
      confirmLoading: false,
      loading:true,
      editingKey:'',
      columns : [
        {
          title: ' id',
          dataIndex: 'id',
          key: 'id',
          fixed: 'left',
          width: 100,
          sorter: (a, b) => a.id - b.id,
          sortDirections: ['descend'],
        }, // 主键
        { title: 'parentCode', dataIndex: 'parentCode', key: 'parentCode', width: 120 }, // 父节点
        { title: 'parentLabel', dataIndex: 'parentLabel', key: 'parentLabel', width: 120 }, // 父标签
        { title: 'level', dataIndex: 'level', key: 'level', width: 120 }, // 级别
        { title: 'code', dataIndex: 'code', key: 'code', width: 120 }, // 编号
        { title: 'sort', dataIndex: 'sort', key: 'sort', width: 120 }, // 排序编号
        { title: 'classLabel', dataIndex: 'classLabel', key: 'classLabel', width: 120 },
        { title: 'classTttle', dataIndex: 'classTttle', key: 'classTttle', width: 120 },
        { title: 'classPath', dataIndex: 'classPath', key: 'classPath', width: 150, ellipsis: true },
        { title: 'jumpCode', dataIndex: 'jumpCode', key: 'jumpCode', width: 120 },
        { title: 'jumpPath', dataIndex: 'jumpPath', key: 'jumpPath', width: 200 }, // 跳转路径
        { title: 'layoutType', dataIndex: 'layoutType', key: 'layoutType', width: 120 },
        { title: 'classInfo', dataIndex: 'classInfo', key: 'classInfo', width: 120 },
        { title: 'classLabelEn', dataIndex: 'classLabelEn', key: 'classLabelEn', width: 120 },
        { title: 'classTttleEn', dataIndex: 'classTttleEn', key: 'classTttleEn', width: 120 },
        { title: 'classInfoEn', dataIndex: 'classInfoEn', key: 'classInfoEn', width: 120 },
        { title: 'classIcon', dataIndex: 'classIcon', key: 'classIcon', width: 120 },
        { title: 'introCrid', dataIndex: 'introCrid', key: 'introCrid', width: 120 },
        { title: 'componentCode', dataIndex: 'componentCode', key: 'componentCode', width: 150 }, // 组件编号
        {
          title: 'Operation',
          key: 'Operation',
          fixed: 'right',
          width: 200,
          render: (text,record) => {
            const { editingKey } = this.state;
            const editable = this.isEditing(record);
            return(
              <span style={{width:"100%",display:'block', margin:'0 auto'}}  >
                {editable ? (
                  <span>
                    <EditableContext.Consumer>
                      {form => (
                        <a
                          onClick={() => this.save(form, record.key)}
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
                    <a disabled={editingKey !== ''} onClick={() => this.edit(record.key)}>
                      Edit
                    </a>
                  )
                }
                <Divider type="vertical" />
                {this.props.dataSource.length >= 1 ? (
                  <Popconfirm title="Sure to delete?" onConfirm={() => this.handleDelete(record.key)}>
                    <Button type="danger" size="small">Delete</Button>
                  </Popconfirm>
                  ) : null}
              </span>
            )
          },
        },
      ],
    };
  }

  componentDidMount () {
    const { dispatch } = this.props;
    dispatch({
      type: 'menuPageModel/getMenuPage',
      payload: {},
    });
    this.timer1 = setTimeout(() => {
      this.setState({ loading: false });
    }, 500);
  }

  //编辑行
  isEditing = record => record.key === this.state.editingKey;

  cancel = () => {
    this.setState({ editingKey: '' });
  };

  save(form, key) {
    form.validateFields((error, row) => {
      if (error) {
        return;
      }
      const {dataSource} = this.props;
      const newData = [...dataSource];
      const index = newData.findIndex(item => key === item.key);
      console.log(index);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        this.setState({
          data:newData,
          editingKey: '' 
        });
        // dataSource=[...newData];
      } else {
        newData.push(row);
        this.setState({
          data:newData,
          editingKey: '' 
        });
        // dataSource=[...newData];
      }
    });
  }

  edit(key) {
    this.setState({ editingKey: key });
  }

  // 删除某一行
  // handleDelete = key => {
  //   // console.log(key);
  //   const dataSource = [...this.props.dataSource];
  //   this.setState({ dataSource: dataSource.filter(item => item.key !== key) });
  // };


  // 新建一项,添加到表格中去
  showModal = () => {
    this.setState({ visible: true });
  };

  handleCancel = () => {
    this.setState({ visible: false });
  };

  handleCreate = () => {
    const { form } = this.formRef.props;
    const {dataSource} = this.props;
    const {data} = this.state;
    // const { dispatch } = this.props;
    // const regexp = new RegExp(/^1(3|4|5|6|7|8)\d{9}$/);
    form.validateFields((err, values) => {
      // console.log(values);
      // console.log('Received values of form: ', values);
      if (err) {//如果有一个校验不通过，代码将不再往下执行
        return;
      }
      //校验通过，调接口传参
      // dispatch({
      //   type: 'menuPageModel/postNewMenuPage',
      //   payload: values,
      // });
      this.setState({ data:[...data,values]});
      // dataSource=[...dataSource,values];
      // dataSource=[...dataSource,values];
      // dataSource = dataSource.push(data);
      this.setState({
         loading: true,
         confirmLoading: true,
      });
      this.timer2 = setTimeout(() => {
        this.setState({ 
          confirmLoading: false,
          visible: false 
        });
      }, 500);
      form.resetFields();
      this.timer3 = setTimeout(() => {
        this.setState({ loading: false});
      }, 1000);
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
    // const { dataSource } = this.props;
    // 定义可编辑的row和cell
    const components = {
      body: {
        cell: EditableCell,
      },
    };
    // 为columns的每一列都增加onCell属性。
    const columns = this.state.columns.map((col, index) => {
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
    const {confirmLoading,visible,data,loading} = this.state;
    return (
      <div style={{ margin: '0 50px' }}>  
        <div className={styles.title} >菜单页面维护</div>
        <Button onClick={this.showModal} type="primary" style={{ marginBottom: 16 }}>
          Add New
        </Button>
        <CreateForm
          wrappedComponentRef={this.saveFormRef}
          visible={visible}
          onCancel={this.handleCancel}
          onCreate={this.handleCreate}
          confirmLoading={confirmLoading}
        />
        {/* <EditableContext.Provider value={this.props.form}> */}
          <Table
            components={components}
            columns={columns}
            // dataSource={dataSource}
            dataSource={data}
            bordered
            loading={loading}
            rowKey={record=>record.id}
            scroll={{ x: 1500, y: 500 }}
            pagination={{
              onChange: this.cancel,
            }}
          />
        {/* </EditableContext.Provider> */}
      </div>
    );
  }
}
const EditableFormTable = Form.create()(MenuPage);

export default EditableFormTable;

// MenuPage.propTypes = {
//   form: PropTypes.object,
// };