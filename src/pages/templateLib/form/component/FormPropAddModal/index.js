import React, { Fragment } from 'react';
import { Modal, Form, Input, Button, Select } from 'antd';
import { addFormProp } from '@/services/formManage';

const { TextArea } = Input;
const { Option } = Select;
const selectOptions = ['Input', 'Select', 'DatePicker'];

@Form.create({ type: 'advanced_search' })
class FormPropAddModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      btnLoading: false,
     };
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = async e => {
    e.preventDefault();
    const { getFormProps } = this.props;
    let formProp = {};
    this.props.form.validateFields((err, values) => {
      if (err) {
        return
      }
      this.setState({ btnLoading: true })
      formProp = values;
    });
    const resp = await addFormProp(formProp);
    if (resp.msgCode === 'SUCCESS') {
      getFormProps();
      this.handleReset();
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
    const { btnLoading, visible } = this.state;
    return (
      <Fragment>
        <Button type="primary" onClick={this.showModal}>
          <i className="iconfont icon-add-circle">新建form表单项</i>
        </Button>
        <Modal
          destroyOnClose
          title="新建form表单项"
          visible={visible}
          onCancel={this.handleCancel}
          width = "600px"
          footer={[
            <Button key="back" onClick={this.handleCancel}>
              取消
            </Button>,
            <Button key="reset" type="danger" onClick={this.handleReset}>
              重置
            </Button>,
            <Button key="submit" type="primary" onClick={this.handleOk} loading={btnLoading}>
              提交
            </Button>,
          ]}
        >
          <Form labelCol={{ span: 6 }} wrapperCol={{ span: 15 }} onSubmit={this.handleSubmit}>
            <Form.Item label="表单种类">
              {getFieldDecorator('formType', {
                rules: [{ required: true, message: '请输入表单种类!' },
                        { whitespace: true }],
                validateTrigger: 'onSubmit',
              })(
                <Select placeholder="请选择表单种类" style={{ width: '100%' }} allowClear>
                  {
                    selectOptions.map(option => (
                      <Option key={option} value={option}>{option}</Option>
                    ))
                  }
                </Select>,
              )}
            </Form.Item>
            <Form.Item label="表单属性">
              {getFieldDecorator('formProp', {
                rules: [{ required: true, message: '请输入表单属性!' },
                        { whitespace: true }],
                validateTrigger: 'onSubmit',
              })(
                <Input placeholder="请输入表单属性" autoComplete="off" allowClear/>,
              )}
            </Form.Item>
            <Form.Item label="描述说明">
              {getFieldDecorator('description', {
                rules: [{ required: true, message: '请输入描述内容!' },
                        { whitespace: true }],
                validateTrigger: 'onSubmit',
              })(
                <TextArea
                  placeholder="请输入描述内容"
                  rows={4} autoSize={{ minRows: 3, maxRows: 5 }}
                  allowClear
                />,
              )}
            </Form.Item>
          </Form>
        </Modal>
      </Fragment>
    );
  }
}

export default FormPropAddModal;
