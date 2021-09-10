import React, { Component, Fragment } from 'react';
import { Modal, Form, Input, Button } from 'antd';
import { connect } from 'dva';

const { TextArea } = Input;
@connect()
@Form.create({ name: 'coordinated' })
class RowEditModal extends Component {
  state = { visible: false };

  componentDidMount() {
    this.props.onRef(this);
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = e => {
    e.preventDefault();
    const { editRow, dispatch } = this.props;
    this.props.form.validateFields((err, values) => {
      if (err) {
        return
      }
      dispatch({
        type: 'chartType/editRowData',
        payload: { ...values, id: editRow.id },
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
    const { editRow } = this.props;
    return (
      <Fragment>
        <Modal
          destroyOnClose
          title="编辑图表类型"
          visible={this.state.visible}
          onCancel={this.handleCancel}
          width = "600px"
          footer={[
            <Button key="back" onClick={this.handleCancel}>
              取消
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
                initialValue: editRow.typeId,
              })(
                <Input placeholder="请输入类型编号" autoComplete="off" />,
              )}
            </Form.Item>
            <Form.Item label="类型名称">
              {getFieldDecorator('typeName', {
                rules: [{ required: true, message: 'Please select your typename!' },
                        { whitespace: true }],
                initialValue: editRow.typeName,
              })(
                <Input placeholder="请输入类型名称" autoComplete="off"/>,
              )}
            </Form.Item>
            <Form.Item label="类型图标">
              {getFieldDecorator('typeIcon', {
                rules: [{ required: true, message: 'Please select your typeIcon!' },
                        { whitespace: true }],
                initialValue: editRow.typeIcon,
              })(
                <Input placeholder="请输入类型图标" autoComplete="off"/>,
              )}
            </Form.Item>
            <Form.Item label="描述">
              {getFieldDecorator('description', {
                rules: [{ required: true, message: 'Please select your description!' },
                        { whitespace: true }],
                initialValue: editRow.description,
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

export default RowEditModal;
