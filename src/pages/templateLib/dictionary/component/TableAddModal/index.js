import React, { Fragment } from 'react';
import { Modal, Form, Input, Button } from 'antd';
import { connect } from 'dva';

const { TextArea } = Input;
@connect()
@Form.create({ type: 'advanced_search' })
class TableAddModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = ({
      visible: false,
      btnLoading: false,
    })
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = e => {
    e.preventDefault();
    const { dispatch } = this.props;
    this.setState({ btnLoading: true });
    this.props.form.validateFields((err, values) => {
      if (err) {
        return
      }
      dispatch({
        type: 'dict/addDictData',
        payload: { ...values },
        callback: () => {
          this.handleReset();
          this.setState({
            visible: false,
            btnLoading: false,
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
    const { btnLoading } = this.state;
    return (
      <Fragment>
        <Button type="primary" style={{ marginLeft: 10 }} onClick={this.showModal}>
          <i className="iconfont icon-add-circle">创建字典</i>
        </Button>
        <Modal
          destroyOnClose
          title="创建字典"
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
            <Button key="submit" type="primary" onClick={this.handleOk} loading={btnLoading}>
              提交
            </Button>,
          ]}
        >
          <Form labelCol={{ span: 6 }} wrapperCol={{ span: 15 }} onSubmit={this.handleSubmit}>
            <Form.Item label="字典编号">
              {getFieldDecorator('type_id', {
                rules: [{ required: true, message: 'Please select your type_id!' },
                        { whitespace: true }],
              })(
                <Input placeholder="请输入字典编号" autoComplete="off" allowClear/>,
              )}
            </Form.Item>
            <Form.Item label="字典名称">
              {getFieldDecorator('type', {
                rules: [{ required: true, message: 'Please select your type!' },
                        { whitespace: true }],
              })(
                <Input placeholder="请输入字典名称" autoComplete="off" allowClear/>,
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

export default TableAddModal;
