import React from 'react';
import { Modal, Form, Input } from 'antd';

const CreateForm = Form.create({ name: 'form_in_modal' })(
  // eslint-disable-next-line
  class extends React.Component {
    render() {
      const { visible, onCancel, onCreate, form } = this.props;
      const { getFieldDecorator } = form;
      return (
        <Modal
          visible={visible}
          title="创建菜单页面维护"
          okText="保存"
          onCancel={onCancel}
          onOk={onCreate}
        >
          <Form layout="inline">
            <Form.Item label="id">
              {getFieldDecorator('id', {
                rules: [{ required: true, message: 'Please input the id!' }],
              })(<Input placeholder="Please input the id" />)}
            </Form.Item>
            <Form.Item label="parentCode">
              {getFieldDecorator('parentCode')(<Input type="textarea" />)}
            </Form.Item>
            <Form.Item label="parentLabel">
              {getFieldDecorator('parentLabel')(<Input type="textarea" />)}
            </Form.Item>
            <Form.Item label="level">
              {getFieldDecorator('level')(<Input type="textarea" />)}
            </Form.Item>
            <Form.Item label="code">
              {getFieldDecorator('parentCode')(<Input type="textarea" />)}
            </Form.Item>
            <Form.Item label="sort">
              {getFieldDecorator('sort')(<Input type="textarea" />)}
            </Form.Item>
            <Form.Item label="classLabel">
              {getFieldDecorator('classLabel')(<Input type="textarea" />)}
            </Form.Item>
            <Form.Item label="classTttle">
              {getFieldDecorator('classTttle')(<Input type="textarea" />)}
            </Form.Item>
            <Form.Item label="classPath">
              {getFieldDecorator('classPath')(<Input type="textarea" />)}
            </Form.Item>
            <Form.Item label="jumpCode">
              {getFieldDecorator('jumpCode')(<Input type="textarea" />)}
            </Form.Item>
            <Form.Item label="jumpPath">
              {getFieldDecorator('jumpPath')(<Input type="textarea" />)}
            </Form.Item>
            <Form.Item label="layoutType">
              {getFieldDecorator('layoutType')(<Input type="textarea" />)}
            </Form.Item>
            <Form.Item label="classInfo">
              {getFieldDecorator('classInfo')(<Input type="textarea" />)}
            </Form.Item>
            <Form.Item label="classLabelEn">
              {getFieldDecorator('classLabelEn')(<Input type="textarea" />)}
            </Form.Item>
            <Form.Item label="classTttleEn">
              {getFieldDecorator('classTttleEn')(<Input type="textarea" />)}
            </Form.Item>
            <Form.Item label="classInfoEn">
              {getFieldDecorator('classInfoEn')(<Input type="textarea" />)}
            </Form.Item>
            <Form.Item label="introCrid">
              {getFieldDecorator('introCrid')(<Input type="textarea" />)}
            </Form.Item>
            <Form.Item label="componentCode">
              {getFieldDecorator('componentCode')(<Input type="textarea" />)}
            </Form.Item>
          </Form>
        </Modal>
      );
    }
  },
);

export default CreateForm;