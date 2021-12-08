import React from 'react';
import { Modal, Form, Input, Select, Button } from 'antd';
import { connect } from 'dva';

const { Option } = Select;

const list = [
  {
    title: '排序序号',
    key: 'sort',
  },
  {
    title: '创建人',
    key: 'createUserId',
  },
];
@connect(({ menuPageModel }) => ({
  parentLabel: menuPageModel.parentLabel,
}))
@Form.create({ name: 'form_in_creat' })
class CreateForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isParentLabel: true,
      // parentLabel: [],
    }
  }

  componentDidMount () {
    const { dispatch } = this.props;
    dispatch({
      type: 'menuPageModel/getLabel',
      payload: {},
      callback: res => {
        if (res.code === 'U000000') {
          this.setState({
            isParentLabel: true,
          });
        }
      },
    });
  }

  handleChange = value => {
    if (value === '1') {
      this.setState({ isParentLabel: false })
    } else if (value === '2') {
      this.setState({ isParentLabel: true })
    }
  }

  handleReset = () => {
    this.props.form.resetFields();
  };


  render() {
    const { visible, onCancel, onCreate, confirmLoading, form, parentLabel } = this.props;
    // console.log(parentLabel);
    const { getFieldDecorator } = form;
    const { isParentLabel } = this.state;
    return (
      <Modal
        visible={visible}
        title="创建菜单页面维护"
        // okText="添加"
        onCancel={onCancel}
        onOk={onCreate}
        width={700}
        destroyOnClose
        footer={[
          <Button key="back" onClick={onCancel}>
            取消
          </Button>,
          <Button key="reset" type="danger" onClick={this.handleReset}>
            重置
          </Button>,
          <Button key="submit" type="primary" onClick={onCreate} loading={confirmLoading} >
            确定
          </Button>,
        ]}
      >
        <Form labelCol={{ span: 6 }} wrapperCol={{ span: 15 }} >
          <Form.Item label="菜单名称" key="classLabel">
            {getFieldDecorator('classLabel', {
              rules: [{ required: true, message: '请输入菜单名称!' },
              { whitespace: true }],
            })(<Input placeholder="菜单名称" />)}
          </Form.Item>
          <Form.Item label="菜单级别" key="level">
            {getFieldDecorator('level', {
              rules: [{ required: true, message: '请选择菜单级别!' },
              { whitespace: true }],
            })(
            <Select style={{ width: 120 }} placeholder="菜单级别"
            onChange={this.handleChange}>
              <Option value="1">1</Option>
              <Option value="2">2</Option>
            </Select>,
            )}
          </Form.Item>
          { isParentLabel &&
            <Form.Item label="父级菜单名称" >
              {getFieldDecorator('parentLabel', {
                rules: [{ required: true, message: '请选择父级菜单名称!' },
                { whitespace: true }],
              })(
                <Select
                showSearch
                style={{ width: 200 }}
                placeholder="选择一个父级菜单"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
                // disabled={isParentLabel}
                >
                {
                  (parentLabel || []).map(item => (
                    <Option key={item} value={item}>{item}</Option>
                  ))
                }
                </Select>,
              )}
            </Form.Item>
          }
          {
            list.map(item => (
              <Form.Item label={item.title} key={item.key}>
              {getFieldDecorator(`${item.key}`, {
                rules: [{ required: true, message: `请输入${item.title}!` },
                { whitespace: true }],
              })(<Input placeholder={item.title} />)}
              </Form.Item>
            ))
          }
        </Form>
      </Modal>
    );
  }
}

export default CreateForm;
