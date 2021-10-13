import React, { Component, Fragment } from 'react';
import { Modal, Form, Input, Button } from 'antd';
import { connect } from 'dva';

const { TextArea } = Input;
@connect()
@Form.create({ name: 'advanced_search' })
class DictAddModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      btnloading: false,
    }
  }

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
    const { dispatch } = this.props;
    this.setState({ btnloading: true });
    this.props.form.validateFields((err, values) => {
      if (err) {
        return
      }
      dispatch({
        type: 'dict/addDictItemData',
        payload: { ...values },
        callback: () => {
          this.handleReset();
          this.setState({
            visible: false,
            btnloading: false,
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
    const { btnloading } = this.state;
    return (
      <Fragment>
        <Modal
          destroyOnClose
          title="新建字典项"
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
            <Button key="submit" type="primary" onClick={this.handleOk} loading={btnloading}>
              提交
            </Button>,
          ]}
        >
          <Form labelCol={{ span: 6 }} wrapperCol={{ span: 15 }} onSubmit={this.handleSubmit}>
            <Form.Item label="字典项编号">
              {getFieldDecorator('item_id', {
                rules: [{ required: true, message: 'Please select your item_id!' },
                        { whitespace: true }],
              })(
                <Input placeholder="请输入字典项编号" autoComplete="off" allowClear/>,
              )}
            </Form.Item>
            <Form.Item label="字典项名称">
              {getFieldDecorator('value', {
                rules: [{ required: true, message: 'Please select your dictitem!' },
                        { whitespace: true }],
              })(
                <Input placeholder="请输入字典项名称" autoComplete="off" allowClear/>,
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

export default DictAddModal;
