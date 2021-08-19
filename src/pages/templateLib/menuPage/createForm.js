import React from 'react';
import { Modal, Form, Input } from 'antd';

const CreateForm = Form.create({ name: 'form_in_modal' })(
  // eslint-disable-next-line
  class extends React.Component {
    render() {
      const { visible, onCancel, onCreate, form, confirmLoading } = this.props;
      const { getFieldDecorator } = form;
      return (
        <Modal
          visible={visible}
          title="创建菜单页面维护"
          okText="添加"
          onCancel={onCancel}
          onOk={onCreate}
          width={900}
          confirmLoading={confirmLoading}
        >
          <Form layout="inline" >
            <Form.Item label="id">
              {getFieldDecorator('id', {
                rules: [{ required: true, message: 'Please input the id!' }],
              })(<Input placeholder="id is unique!" />)}
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
              {getFieldDecorator('code')(<Input type="textarea" />)}
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
            <Form.Item label="classIcon">
              {getFieldDecorator('classIcon')(<Input type="textarea" />)}
            </Form.Item>
            <Form.Item label="introCrid">
              {getFieldDecorator('introCrid')(<Input type="textarea" />)}
            </Form.Item>
            <Form.Item label="componentCode">
              {getFieldDecorator('componentCode')(<Input type="textarea" />)}
            </Form.Item>
            {/* 新增加9个字段 */}
            {/* <Form.Item label="active">
              {getFieldDecorator('active')(<Input type="textarea" />)}
            </Form.Item>
            <Form.Item label="backgroud">
              {getFieldDecorator('backgroud')(<Input type="textarea" />)}
            </Form.Item>
            <Form.Item label="createDatatime">
              {getFieldDecorator('createDatatime')(<Input type="textarea" />)}
            </Form.Item>
            <Form.Item label="createUserId">
              {getFieldDecorator('createUserId')(<Input type="textarea" />)}
            </Form.Item>
            <Form.Item label="deleted">
              {getFieldDecorator('deleted')(<Input type="textarea" />)}
            </Form.Item>
            <Form.Item label="mark">
              {getFieldDecorator('mark')(<Input type="textarea" />)}
            </Form.Item>
            <Form.Item label="modifyDatatime">
              {getFieldDecorator('modifyDatatime')(<Input type="textarea" />)}
            </Form.Item>
            <Form.Item label="modifyUserId">
              {getFieldDecorator('modifyUserId')(<Input type="textarea" />)}
            </Form.Item>
            <Form.Item label="version">
              {getFieldDecorator('version')(<Input type="textarea" />)}
            </Form.Item> */}
          </Form>
        </Modal>
      );
    }
  },
);

export default CreateForm;
