import React, { Component, Fragment } from 'react';
import { Modal, Form, Input, Button } from 'antd';
import { connect } from 'dva';

const { TextArea } = Input;
@connect()
@Form.create({ name: 'coordinated' })
class DictEditModal extends Component {
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
    const { dispatch, editItemkey } = this.props;
    this.props.form.validateFields((err, values) => {
      if (err) {
        return
      }
      dispatch({
        type: 'dict/editDictItemData',
        payload: { ...values, id: editItemkey },
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
    const { selectedDictItem } = this.props;
    return (
      <Fragment>
        <Modal
          destroyOnClose
          title="编辑字典"
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
            <Form.Item label="字典项编号">
              {getFieldDecorator('item_id', {
                rules: [{ required: true, message: 'Please select your item_id!' },
                        { whitespace: true }],
                initialValue: selectedDictItem.item_id,
              })(
                <Input placeholder="请输入字典项编号" autoComplete="off"/>,
              )}
            </Form.Item>
            <Form.Item label="字典项名称">
              {getFieldDecorator('value', {
                rules: [{ required: true, message: 'Please select your value!' },
                        { whitespace: true }],
                initialValue: selectedDictItem.value,
              })(
                <Input placeholder="请输入字典项名称" autoComplete="off"/>,
              )}
            </Form.Item>
            <Form.Item label="描述">
              {getFieldDecorator('description', {
                rules: [{ required: true, message: 'Please select your description!' },
                        { whitespace: true }],
                initialValue: selectedDictItem.description,
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

export default DictEditModal;
