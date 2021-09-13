import React from 'react';
import { Modal, Table, Divider, Form, Input, Button, Select } from 'antd';

import { getGroup, addGroup, deleteGroup, updateGroup, getProject } from '@/services/dashboard';

import styles from './index.less';

const { Item } = Form;
const { Option } = Select;
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
//   layout: 'vertical',
// };

@Form.create()
class FolderManagementModal extends React.Component {
  columns = [
    {
      title: '归属业务主题',
      dataIndex: 'projectName',
      key: 'projectName',
    },
    {
      title: '名称',
      dataIndex: 'name',
      key: 'name',
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
      newGroup: true,
      visible: false,
      groupList: [],
      projectList: [],
      curRow: {},
    }
  }

  componentDidMount() {
    this.getGroupData();
  }

  getGroupData = async () => {
   const res = await getGroup();
   this.setState({ groupList: res.data });
  }

  handleOk = async e => {
    e.preventDefault();
    const { id } = this.state.curRow;
    const { form: { validateFields } } = this.props;
    validateFields(async (err, values) => {
      if (!err) {
        const { userId } = localStorage;
        // debugger
        const res = this.state.newGroup ?
          await addGroup({ ...values, createBy: userId }) :
          await updateGroup({ groupUpdate: { ...values }, id });
        if (res.code === 'U000000') {
          this.setState({
            visible: false,
          }, () => {
            this.getGroupData()
          });
        }
      }
    })
  };

  handleCancel = () => {
    this.setState({ visible: false })
  }

  closeModal = () => {
    const { closeFolder } = this.props;
    closeFolder();
  }

  handleDelete = rec => {
    const { id, projectId } = rec;
    confirm({
      title: '删除',
      cancelText: '取消',
      okText: '提交',
      centered: true,
      style: { width: '320px', height: '250px' },
      onOk: async () => {
        const res = await deleteGroup({ id, projectId });
        if (res.code === 'U000000') {
          this.getGroupData();
          this.setState({
            visible: false,
          });
        }
      },
    });
  }

  addFolder = async () => {
    const res = await getProject();
    this.setState({ visible: true, newGroup: true, projectList: res.data });
  }

  handleEdit = async rec => {
    const res = await getProject();
    this.setState({
      visible: true,
      newGroup: false,
      curRow: rec,
      projectList: res.data,
    });
  }

  renderTitle = () => (
    <div className={styles.title}>
      <span className={styles.titleDesc}>文件夹</span>
      <Button type="primary" onClick={this.addFolder}>添加</Button>
    </div>
  )

  render() {
    const { groupList, newGroup, visible, curRow, projectList } = this.state;
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
            dataSource={groupList}
            columns={this.columns}
          />
        </Modal>
        <Modal
          title={newGroup ? '创建仪表板存放的文件夹' : '编辑仪表板存放的文件夹'}
          visible={visible}
          destroyOnClose
          centered
          maskClosable={false}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <Form layout="vertical">
            <Item label="请选择文件夹所在的业务主题场景">
              {getFieldDecorator('projectId', {
                initialValue: newGroup ? '' : curRow.projectId,
              })(
                <Select>
                  {
                    projectList.map(item =>
                      <Option key={item.id} value={item.id}>
                        {item.name}
                      </Option>,
                      )
                  }
                </Select>,
              )}
            </Item>
            <Item label="文件夹名称">
              {getFieldDecorator('name', {
                rules: [{ required: true, message: 'Please input name!' }],
                initialValue: newGroup ? '' : curRow.name,
              })(
                <Input
                  placeholder="请输入文件夹名称"
                />,
              )}
            </Item>
          </Form>
        </Modal>
      </div>
    )
  }
}
export default FolderManagementModal;
