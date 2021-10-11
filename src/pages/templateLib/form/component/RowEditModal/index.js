import React, { Component, Fragment } from 'react';
import { Modal, Form, Input, Select, Button } from 'antd';
import { editFormRecord, getAllFormRecordByPage } from '@/services/formManage';

const { TextArea } = Input;
const { Option } = Select;
@Form.create({ name: 'edit' })
class RowEditModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
        visible: false,
        btnLoading: false,
      };
  }

  componentDidMount() {
    this.props.onRef(this);
  }

  showModal = async () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = async e => {
    e.preventDefault();
    const { editRow } = this.props;
    let formRecord = null;
    let error = null;
    this.props.form.validateFields((err, values) => {
      console.log('values', values)
      if (err) {
        error = err;
        return
      }
      this.setState({ btnLoading: true });
      formRecord = { ...values, id: editRow.id };
    });
    if (!error) {
      const { pageSize } = this.props;
      await editFormRecord(formRecord);
      const resp = await getAllFormRecordByPage({ pageSize, current: 1 });
      await this.props.updateData(resp);
      this.setState({
        visible: false,
        btnLoading: false,
      });
    }
  };

  handleCancel = () => {
    this.setState({
      visible: false,
    });
  };

  //
  handleReset = () => {
    this.props.form.resetFields();
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { editRow, allDashBoard } = this.props;
    const { btnLoading } = this.state;
    // console.log('editRow:', editRow);
    return (
      <Fragment>
        <Modal
          destroyOnClose
          title="编辑Form表单"
          visible={this.state.visible}
          onCancel={this.handleCancel}
          width = "600px"
          footer={[
            <Button key="back" onClick={this.handleCancel}>
              取消
            </Button>,
            <Button key="submit" type="primary" onClick={this.handleOk} loading={ btnLoading } >
              提交
            </Button>,
          ]}
        >
          <Form labelCol={{ span: 6 }} wrapperCol={{ span: 15 }} onSubmit={this.handleSubmit}>
            <Form.Item label="表单名称">
              {getFieldDecorator('formName', {
                rules: [{ required: true, message: '请输入类型编号!' },
                        { whitespace: true },
                ],
                initialValue: editRow.formName,
                validateTrigger: 'onSubmit',
              })(
                <Input placeholder="请输入类型编号" autoComplete="off"
                       allowClear
                />,
              )}
            </Form.Item>
            <Form.Item label="描述说明">
              {getFieldDecorator('describtion', {
                rules: [{ required: true, message: '请输入描述内容!' },
                        { whitespace: true },
                ],
                initialValue: editRow.describtion,
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
                        // initialValue: editRow.dashboard,
                validateTrigger: 'onSubmit',
              })(
                <Select placeholder="请选择关联的仪表盘" style={{ width: '100%' }}
                        allowClear>
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

export default RowEditModal;
