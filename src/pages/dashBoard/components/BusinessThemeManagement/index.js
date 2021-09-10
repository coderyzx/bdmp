import React from 'react';
import { Modal, Table, Divider, Form, Input, Switch, Button } from 'antd';

import { addProject, getProject, deleteProject, updateProject } from '@/services/dashboard';

import styles from './index.less';

const { Item } = Form;
const { TextArea } = Input;
const { confirm } = Modal;

// const formItemLayout = {
//   labelCol: {
//     xs: { span: 24 },
//     sm: { span: 6 },
//   },
//   wrapperCol: {
//     xs: { span: 24 },
//     sm: { span: 18 },
//   },
// };

@Form.create()
class BusinessThemeManagementModal extends React.Component {
  columns = [
    {
      title: '名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '描述',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: '操作',
      dataIndex: 'action',
      key: 'action',
      // render三个参数：行的值，行数据，行索引
      render: (text, rec) => (
        <span>
          <span className={styles.action} onClick = {() => this.handleEdit(rec)}>编辑</span>
          <Divider type="vertical" />
          <span className={styles.action} onClick = {() => this.handleDelete(rec)}>删除</span>
        </span>
      ),
    },
  ];

  constructor(props) {
    super(props);
    this.state = {
      newTheme: true,
      visible: false,
      projectList: [],
      curRow: {},
    }
  }

  componentDidMount() {
    this.getProjectData();
  }

  getProjectData = async () => {
   const res = await getProject();
   this.setState({ projectList: res.data });
  }

  closeModal = () => {
    const { closeTheme } = this.props;
    closeTheme();
  }

  addtheme = () => {
    this.setState({ visible: true, newTheme: true });
  }

  handleCancel = () => {
    this.setState({ visible: false });
  }

  handleEdit = async rec => {
    // console.log(rec)
    this.setState({ curRow: rec, visible: true, newTheme: false });
  }

  handleDelete = rec => {
    const { id } = rec;
    confirm({
      title: '删除',
      cancelText: '取消',
      okText: '提交',
      centered: true,
      style: { width: '320px', height: '250px' },
      onOk: async () => {
        const res = await deleteProject(id);
        if (res.code === 'U000000') {
          this.getProjectData();
          this.setState({
            visible: false,
          });
        }
      },
    });
  }

  handleOk = async e => {
    e.preventDefault();
    const { id } = this.state.curRow;
    const { form: { validateFields } } = this.props;
    validateFields(async (err, values) => {
      if (!err) {
        const { userId } = localStorage;
        // debugger
        const res = this.state.newTheme ?
          await addProject({ ...values, createBy: userId }) :
          await updateProject({ projectUpdate: { ...values }, id });
        if (res.code === 'U000000') {
          this.setState({
            visible: false,
          }, () => {
            this.getProjectData()
          });
        }
      }
    })
  };

  renderTitle = () => (
    <div className={styles.title}>
      <span className={styles.titleDesc}>主题业务场景</span>
      <Button type="primary" onClick={this.addtheme}>添加</Button>
    </div>
  )

  render() {
    const { newTheme, visible, projectList, curRow } = this.state;
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        <Modal
          title={this.renderTitle()}
          destroyOnClose
          footer={null}
          visible
          centered
          closable={false}
          onCancel={this.closeModal}
          width="1200px"
        >
          <Table
            rowKey="id"
            dataSource={projectList}
            columns={this.columns}
          />
        </Modal>
        <Modal
          title={newTheme ? '创建业务主题场景' : '编辑业务主题场景'}
          visible={visible}
          destroyOnClose
          centered
          maskClosable={false}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <Form layout="vertical">
            <Item label="名称">
              {getFieldDecorator('name', {
                rules: [{ required: true, message: 'Please input name!' }],
                initialValue: newTheme ? '' : curRow.name,
              })(
                <Input
                  placeholder="请输入业务主题名称"
                />,
              )}
            </Item>
            <Item label="描述">
              {getFieldDecorator('description', {
                rules: [],
                initialValue: newTheme ? '' : curRow.description,
              })(
                <TextArea
                  placeholder="请输入描述"
                  autoSize={{ minRows: 3, maxRows: 6 }}
                />,
              )}
            </Item>
            <Item label="是否启用">
              {getFieldDecorator('enabled', {
                  rules: [],
                  valuePropName: 'checked',
                  initialValue: newTheme ? true : curRow.enabled,
                })(
                  <Switch/>,
                )}
            </Item>
          </Form>
        </Modal>
      </div>
    )
  }
}
export default BusinessThemeManagementModal;
