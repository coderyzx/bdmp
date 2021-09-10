import React from 'react';
// import { connect } from 'dva';
import { Modal, Form, Input, InputNumber } from 'antd';


const EditableForm = Form.create({ name: 'form_in_edit' })(
  // eslint-disable-next-line
  class extends React.Component {
    render() {
      const { visible, onCancel, onCreate, form, confirmLoading, editData } = this.props;
      const { getFieldDecorator } = form;
      // console.log(editData);
      return (
        <Modal
          visible={visible}
          title="编辑菜单页面维护"
          okText="确定"
          onCancel={onCancel}
          onOk={onCreate}
          width={900}
          confirmLoading={confirmLoading}
          destroyOnClose= "true"
        >
          <Form layout="inline" >
            <Form.Item label="parentCode">
              {getFieldDecorator('parentCode', {
                rules: [{ required: true, message: 'Please input the parentCode!' }],
                initialValue: editData.parentCode,
              })(<InputNumber min={0} max={1000} placeholder="number" allowClear />)}
            </Form.Item>
            <Form.Item label="parentLabel">
              {getFieldDecorator('parentLabel', {
                 initialValue: editData.parentLabel,
              })(<Input type="textarea" allowClear />)}
            </Form.Item>
            <Form.Item label="level">
              {getFieldDecorator('level', {
                initialValue: editData.level,
              })(<Input type="textarea" allowClear />)}
            </Form.Item>
            <Form.Item label="code">
              {getFieldDecorator('code', {
                initialValue: editData.code,
              })(<Input type="textarea" allowClear />)}
            </Form.Item>
            <Form.Item label="sort">
              {getFieldDecorator('sort', {
                initialValue: editData.sort,
              })(<Input type="textarea" allowClear />)}
            </Form.Item>
            <Form.Item label="classLabel">
              {getFieldDecorator('classLabel', {
                initialValue: editData.classLabel,
              })(<Input type="textarea" allowClear/>)}
            </Form.Item>
            <Form.Item label="classTttle">
              {getFieldDecorator('classTttle', {
                initialValue: editData.classTttle,
              })(<Input type="textarea" allowClear/>)}
            </Form.Item>
            <Form.Item label="classPath">
              {getFieldDecorator('classPath', {
                initialValue: editData.classPath,
              })(<Input type="textarea" allowClear/>)}
            </Form.Item>
            <Form.Item label="jumpCode">
              {getFieldDecorator('jumpCode', {
                 initialValue: editData.jumpCode,
              })(<Input type="textarea" allowClear />)}
            </Form.Item>
            <Form.Item label="jumpPath">
              {getFieldDecorator('jumpPath', {
                 initialValue: editData.jumpPath,
              })(<Input type="textarea" allowClear/>)}
            </Form.Item>
            <Form.Item label="layoutType">
              {getFieldDecorator('layoutType', {
                 initialValue: editData.layoutType,
              })(<Input type="textarea" allowClear/>)}
            </Form.Item>
            <Form.Item label="classInfo">
              {getFieldDecorator('classInfo', {
                 initialValue: editData.classInfo,
              })(<Input type="textarea" allowClear />)}
            </Form.Item>
            <Form.Item label="classLabelEn">
              {getFieldDecorator('classLabelEn', {
                 initialValue: editData.classLabelEn,
              })(<Input type="textarea" allowClear/>)}
            </Form.Item>
            <Form.Item label="classTttleEn">
              {getFieldDecorator('classTttleEn', {
                 initialValue: editData.classTttleEn,
              })(<Input type="textarea" allowClear />)}
            </Form.Item>
            <Form.Item label="classInfoEn">
              {getFieldDecorator('classInfoEn', {
                 initialValue: editData.classInfoEn,
              })(<Input type="textarea" allowClear/>)}
            </Form.Item>
            <Form.Item label="classIcon">
              {getFieldDecorator('classIcon', {
                 initialValue: editData.classIcon,
              })(<Input type="textarea" allowClear />)}
            </Form.Item>
            <Form.Item label="introCrid">
              {getFieldDecorator('introCrid', {
                 initialValue: editData.introCrid,
              })(<Input type="textarea" allowClear/>)}
            </Form.Item>
            <Form.Item label="componentCode">
              {getFieldDecorator('componentCode', {
                 initialValue: editData.componentCode,
              })(<Input type="textarea" allowClear />)}
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

export default EditableForm;
