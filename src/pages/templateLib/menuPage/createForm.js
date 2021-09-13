import React from 'react';
import { Modal, Form, Input, Col, Row } from 'antd';

const CreateForm = Form.create({
  name: 'form_in_modal',
})(
  // eslint-disable-next-line
  class extends React.Component {
    render() {
      const { visible, onCancel, onCreate, form, confirmLoading } = this.props;
      const { getFieldDecorator } = form;
      // console.log(this.props);
      return (
        <Modal
          visible={visible}
          title="创建菜单页面维护"
          okText="添加"
          onCancel={onCancel}
          onOk={onCreate}
          width={1000}
          confirmLoading={confirmLoading}
          destroyOnClose= "true"
        >
          <Form layout="inline" >
            <Row gutter={8}>
              <Col span={8}>
                <Form.Item label="父节点编号">
                  {getFieldDecorator('parentCode', {
                    rules: [{ required: true, message: '请输入父节点编号!' }],
                  })(<Input min={0} max={1000} placeholder="number" />)}
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="父标签">
                  {getFieldDecorator('parentLabel', {
                    rules: [{ required: true, message: '请输入父标签' }],
                  })(<Input type="textarea" />)}
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="级别">
                {getFieldDecorator('level', {
                    rules: [{ required: true, message: '请输入级别' }],
                  })(<Input type="textarea" />)}
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={8}>
                <Form.Item label="编号">
                  {getFieldDecorator('code')(<Input type="textarea" />)}
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="排序编号">
                {getFieldDecorator('sort')(<Input type="textarea" />)}
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="跳转编号">
                {getFieldDecorator('jumpCode')(<Input type="textarea" />)}
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={8}>
                <Form.Item label="跳转路径">
                  {getFieldDecorator('jumpPath')(<Input type="textarea" />)}
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="布局编号">
                  {getFieldDecorator('layoutType')(<Input type="textarea" />)}
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="组件编号">
                  {getFieldDecorator('componentCode')(<Input type="textarea" />)}
                </Form.Item>
              </Col>
            </Row>
            <div style={{ fontSize: '14px', margin: '20px 0' }} >以下为选填</div>
            <Form.Item label="类标签">
              {getFieldDecorator('classLabel')(<Input type="textarea" />)}
            </Form.Item>
            <Form.Item label="classTttle">
              {getFieldDecorator('classTttle')(<Input type="textarea" />)}
            </Form.Item>
            <Form.Item label="classPath">
              {getFieldDecorator('classPath')(<Input type="textarea" />)}
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
