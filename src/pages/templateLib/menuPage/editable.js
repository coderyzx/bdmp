import React from 'react';
// import { connect } from 'dva';
import { Modal, Form, Input, Button, Select } from 'antd';
import { connect } from 'dva';

const { Option } = Select;

@connect(({ menuPageModel }) => ({
  parentLabel: menuPageModel.parentLabel,
}))
@Form.create({ name: 'editMenuPage' })
class EditableForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isParentLabel: this.props.isParent,
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
          const { editData } = this.props;
          if (editData.level === '1') {
            this.setState({
              isParentLabel: true,
            });
          }
          if (editData.level === '2') {
            this.setState({
              isParentLabel: false,
            });
          }
        }
      },
    });
  }

  handleChange = value => {
    if (value === '1') {
      this.setState({ isParentLabel: true })
    } else if (value === '2') {
      this.setState({ isParentLabel: false })
    }
  }

  render() {
    const { visible, onCancel, onCreate, form, confirmLoading, editData, parentLabel } = this.props;
    const { getFieldDecorator } = form;
    // console.log(editData);
    const { isParentLabel } = this.state;
    return (
      <Modal
        visible={visible}
        title="修改菜单页面数据"
        // okText="添加"
        onCancel={onCancel}
        onOk={onCreate}
        width={700}
        confirmLoading={confirmLoading}
        destroyOnClose
        footer={[
          <Button key="back" onClick={onCancel}>
            取消
          </Button>,
          <Button key="reset" type="danger" onClick={this.handleReset}>
            重置
          </Button>,
          <Button key="submit" type="primary" onClick={onCreate}>
            确定
          </Button>,
        ]}
      >
        <Form labelCol={{ span: 6 }} wrapperCol={{ span: 15 }} >
          <Form.Item label="菜单名称" key="classLabel">
            {getFieldDecorator('classLabel', {
              rules: [{ required: true, message: '请输入菜单名称!' },
              { whitespace: true }],
              initialValue: editData.classLabel,
            })(<Input placeholder="菜单名称" />)}
          </Form.Item>
          <Form.Item label="菜单级别" key="level">
            {getFieldDecorator('level', {
              rules: [{ required: true, message: '请选择菜单级别!' },
              ],
              initialValue: editData.level,
            })(
            <Select style={{ width: 120 }} placeholder="菜单级别"
            onChange={this.handleChange}>
              <Option value="1">1</Option>
              <Option value="2">2</Option>
            </Select>,
            )}
          </Form.Item>
          <Form.Item label="父级菜单名称">
            {getFieldDecorator('parentLabel', {
              rules: [{ required: true, message: '请选择父级菜单名称!' },
              { whitespace: true }],
              initialValue: editData.parentLabel,
            })(
              <Select
              showSearch
              style={{ width: 200 }}
              placeholder="选择一个父级菜单"
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
              disabled={isParentLabel}
              >
              {
                (parentLabel || []).map(item => (
                  <Option key={item} value={item}>{item}</Option>
                ))
              }
              </Select>,
            )}
          </Form.Item>
          <Form.Item label="排序序号" key="sort">
            {getFieldDecorator('sort', {
              rules: [{ required: true, message: '请输入排序序号!' },
              ],
              initialValue: editData.sort,
            })(<Input placeholder="菜单名称" />)}
          </Form.Item>
          <Form.Item label="修改人" key="modifyUserId">
            {getFieldDecorator('modifyUserId', {
              rules: [{ required: true, message: '请输入修改人!' },
              { whitespace: true }],
              initialValue: editData.modifyUserId,
            })(<Input placeholder="修改人" />)}
          </Form.Item>
        </Form>
      </Modal>
    );
  }
}

export default EditableForm;
