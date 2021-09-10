import React, { Fragment } from 'react';
import { Modal, Form, Input, Button } from 'antd';
import { connect } from 'dva';

const { TextArea } = Input;
@connect()
@Form.create({ name: 'advanced_search' })
class RowAddModal extends React.Component {
  state = { visible: false };

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = e => {
    e.preventDefault();
    const { dispatch } = this.props;
    this.props.form.validateFields((err, values) => {
      if (err) {
        return
      }
      dispatch({
        type: 'chartType/addRowData',
        payload: { ...values },
        callback: () => {
          this.handleReset();
          this.setState({
            visible: false,
          })
        },
      });
    });
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
    return (
      <Fragment>
        <Button type="primary"
                style={{ marginLeft: 10 }}
                onClick={this.showModal}>添加图表类型</Button>
        <Modal
          destroyOnClose
          title="添加图表类型"
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
            <Button key="submit" type="primary" onClick={this.handleOk}>
              提交
            </Button>,
          ]}
        >
          <Form labelCol={{ span: 6 }} wrapperCol={{ span: 15 }} onSubmit={this.handleSubmit}>
            <Form.Item label="类型编号">
              {getFieldDecorator('typeId', {
                rules: [{ required: true, message: 'Please select your typeId!' },
                        { whitespace: true }],
              })(
                <Input placeholder="请输入类型编号" autoComplete="off"/>,
              )}
            </Form.Item>
            <Form.Item label="类型名称">
              {getFieldDecorator('typeName', {
                rules: [{ required: true, message: 'Please select your typename!' },
                        { whitespace: true }],
              })(
                <Input placeholder="请输入类型名称" autoComplete="off"/>,
              )}
            </Form.Item>
            <Form.Item label="类型图标">
              {getFieldDecorator('typeIcon', {
                rules: [{ required: true, message: 'Please select your typeIcon!' },
                        { whitespace: true }],
              })(
                <Input placeholder="请输入类型图标" autoComplete="off"/>,
              )}
            </Form.Item>
            <Form.Item label="描述">
              {getFieldDecorator('description', {
                rules: [{ required: true, message: 'Please select your description!' },
                        { whitespace: true }],
              })(
                <TextArea
                  placeholder="请输入描述内容"
                  rows={4} autoSize={{ minRows: 3, maxRows: 5 }}
                />,
              )}
            </Form.Item>
          </Form>
        </Modal>
      </Fragment>
    );
  }
}

export default RowAddModal;
