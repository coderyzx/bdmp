import React, { Fragment } from 'react';
import { Modal, Form, Input, Button, Select } from 'antd';
import { addFormRecord, getAllFormRecordByPage } from '@/services/formManage';

const { TextArea } = Input;
const { Option } = Select;
@Form.create({ name: 'add' })
class RowAddModal extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
        visible: false,
        btnLoading: false,
      };
  }

  showModal = async () => {
    this.setState({
      visible: true,
    });
  };

  // 上传新增的所有数据
  handleOk = async e => {
    e.preventDefault();
    let formRecord = null;
    let error = null;
    this.props.form.validateFields((err, values) => {
      console.log('values', values)
      if (err) {
        error = err;
        return
      }
      this.setState({ btnLoading: true });
      formRecord = values;
    });
    if (!error) {
      const { pageSize } = this.props;
      await addFormRecord(formRecord);
      const resp = await getAllFormRecordByPage({ pageSize, current: 1 });
      await this.props.updateData(resp);
      this.handleReset();
      this.setState({
        visible: false,
        btnLoading: false,
      });
    }
  };

  // 关闭模态框
  handleCancel = () => {
    this.setState({
      visible: false,
    });
  };

  // 重置模态框的输入数据
  handleReset = () => {
    this.props.form.resetFields();
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { btnLoading } = this.state;
    const { allDashBoard } = this.props;
    return (
      <Fragment>
        <Button type="primary"
                style={{ marginLeft: 10 }}
                onClick={this.showModal}>
          <i className="iconfont icon-add-circle">新建Form表单</i>
        </Button>
        <Modal
          destroyOnClose
          title="创建Form表单"
          visible={this.state.visible}
          onCancel={this.handleCancel}
          width = "600px"
          footer={[
            <Button key="back" onClick={this.handleCancel}>
              取消
            </Button>,
            <Button key="reset" type="danger" onClick={this.handleReset}>
              重置
            </Button>,
            <Button key="submit" type="primary" onClick={this.handleOk} loading = { btnLoading }>
              提交
            </Button>,
          ]}
        >
          <Form labelCol={{ span: 6 }} wrapperCol={{ span: 15 }} onSubmit={this.handleSubmit}>
            <Form.Item label="表单名称">
              {getFieldDecorator('formName', {
                rules: [{ required: true, message: '请输入表单名称!' },
                        { whitespace: true },
                ],
                validateTrigger: 'onSubmit',
              })(
                <Input placeholder="请输入表单名称" autoComplete="off"
                       allowClear
                />,
              )}
            </Form.Item>
            <Form.Item label="描述说明">
              {getFieldDecorator('describtion', {
                rules: [{ required: true, message: '请输入描述内容!' },
                        { whitespace: true },
                ],
                validateTrigger: 'onSubmit',
              })(
                <TextArea
                  placeholder="请输入描述内容"
                  rows={4} autoSize={{ minRows: 3, maxRows: 5 }}
                  allowClear
                />,
              )}
            </Form.Item>
            <Form.Item label="仪表盘关联">
              {getFieldDecorator('dashboard', {
                rules: [{ required: true, message: '请选择关联的仪表盘!' },
                        { whitespace: true }],
                validateTrigger: 'onSubmit',
              })(
                <Select placeholder="请选择关联的仪表盘" style={{ width: '100%' }} allowClear>
                  {
                    allDashBoard.map(item => (
                      <Option key={item.name} value={String(item.id)}>{item.name}</Option>
                    ))
                  }
                </Select>,
              )}
            </Form.Item>
          </Form>
        </Modal>
      </Fragment>
    );
  }
}

export default RowAddModal;
