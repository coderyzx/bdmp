import React from 'react';
import { connect } from 'dva';
import { Table, Button, Popconfirm, Form, Divider } from 'antd';
import CreateForm from './createForm';
import styles from './index.less';

const EditableContext = React.createContext();
const EditableRow = ({ form, index, ...props }) => (
  <EditableContext.Provider value={form}>
    <tr {...props} />
  </EditableContext.Provider>
);

const EditableFormRow = Form.create()(EditableRow);
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
      }, // 主键
      { title: 'parentCode', dataIndex: 'parentCode', key: 'parentCode', width: 120 }, // 父节点
      { title: 'parentLabel', dataIndex: 'parentLabel', key: 'parentLabel', width: 120 }, // 父标签
      { title: 'level', dataIndex: 'level', key: 'level', width: 120 }, // 级别
      { title: 'code', dataIndex: 'code', key: 'code', width: 120 }, // 编号
      { title: 'sort', dataIndex: 'sort', key: 'sort', width: 120 }, // 排序编号
      { title: 'classLabel', dataIndex: 'classLabel', key: 'classLabel', width: 120 },
      { title: 'classTttle', dataIndex: 'classTttle', key: 'classTttle', width: 120 },
      { title: 'classPath', dataIndex: 'classPath', key: 'classPath', width: 200 },
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
        width: 150,
        render: (record) => (
          <span >
            <a>Edit</a>
            <Divider type="vertical" />
            {this.props.dataSource.length >= 1 ? (
              <Popconfirm title="Sure to delete?" onConfirm={() => this.handleDelete(record.key)}>
                <a >Delete</a>
              </Popconfirm>
              ) : null}
          </span>
        ),
      },
    ];
  }

  componentDidMount () {
    const { dispatch } = this.props;
    dispatch({
      type: 'menuPageModel/getMenuPage',
      payload: {},
    });
  }

    // 新建一项
  showModal = () => {
    this.setState({ visible: true });
  };

  handleCancel = () => {
    this.setState({ visible: false });
  };

  handleCreate = () => {
    const { form } = this.formRef.props;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }

      console.log('Received values of form: ', values);
      form.resetFields();
      this.setState({ visible: false });
    });
  };

  saveFormRef = formRef => {
    this.formRef = formRef;
  };

  // handleAdd = () => {
  //   const { count, dataSource } = this.state;
  //   const newData = {
  //     key: count,
  //     name: `Edward King ${count}`,
  //     age: 32,
  //     address: `London, Park Lane no. ${count}`,
  //   };
  //   this.setState({
  //     dataSource: [...dataSource, newData],
  //     count: count + 1,
  //   });
  // };

  // 删除某一行
  // handleDelete = key => {
  //   // console.log(key);
  //   const dataSource = [...this.props.dataSource];
  //   this.setState({ dataSource: dataSource.filter(item => item.key !== key) });
  // };


  // 将修改值重新赋给dataSource。
  // handleSave = row => {
  //   const newData = [...this.props.dataSource];
  //   const index = newData.findIndex(item => row.key === item.key);
  //   const item = newData[index];
  //   newData.splice(index, 1, {
  //     ...item,
  //     ...row,
  //   });
  //   this.setState({ dataSource: newData });
  // };

  render() {
    const { dataSource } = this.props;
    // 定义可编辑的row和cell
    const components = {
      body: {
        row: EditableFormRow,
      },
    };
    // 为columns的每一列都增加onCell属性。
    const { columns } = this;
    return (
      <div style={{ margin: '0 50px' }}>
        <div className={styles.title} >菜单页面维护</div>
        <Button onClick={this.showModal} type="primary" style={{ marginBottom: 16 }}>
          新建一项
        </Button>
        <CreateForm
          wrappedComponentRef={this.saveFormRef}
          visible={this.state.visible}
          onCancel={this.handleCancel}
          onCreate={this.handleCreate}
        />
        <Table
          components={components}
          columns={columns}
          dataSource={dataSource}
          scroll={{ x: 1500, y: 500 }}
          bordered
        />
      </div>
    );
  }
}

export default MenuPage;
