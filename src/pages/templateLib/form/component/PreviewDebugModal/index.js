import React, { Fragment } from 'react';
import { Modal, Form, Input, Button, Select } from 'antd';
import { connect } from 'dva';
import { configFormProps } from '@/services/formManage';

const { TextArea } = Input;
const { Option } = Select;
const defaultTemplate = '{ "value": "输入属性值",\n "allowClear": false/true,\n...}';

@connect(({ formManage }) => ({
  formId: formManage.formId,
  dictTypeList: formManage.dictTypeList,
}))
@Form.create({ name: 'debug' })
class PreviewDebugModal extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
        visible: false,
        btnLoading: false,
        isDisabled: true,
      };
  }

  showModal = () => {
    const { selectedFormType } = this.props;
    if (selectedFormType === 'Select') {
      this.setState({ isDisabled: false });
    }
    this.setState({
      visible: true,
    });
  };

  // 预览测试
  handleOk = async e => {
    e.preventDefault();
    let formPropsObj;
    let dictId;
    let error = null;
    this.props.form.validateFields((err, values) => {
      console.log('value:', values)
      if (err) {
        error = err;
        return
      }
      this.setState({ btnLoading: true });
      formPropsObj = JSON.stringify(JSON.parse(values.formValue));
      dictId = Number(values.dictId);
    });
    console.log('formPropsObj:', formPropsObj);
    if (!error) {
      const { rightKeys, formId, selectedFormType } = this.props;
      const resp = await configFormProps({
        formId,
        list: [...rightKeys],
        formValue: formPropsObj,
        formType: selectedFormType,
        dictId,
      });
      if (resp.msgCode === 'SUCCESS') {
        const { dispatch } = this.props;
        dispatch({
          type: 'formManage/changeDictId',
          payload: dictId,
        });
        await this.props.getFormProps();
        this.handleReset();
        this.setState({
          visible: false,
          btnLoading: false,
        });
      }
    }
  };

  // 关闭模态框
  handleCancel = () => {
    this.setState({
      visible: false,
    });
  };

  // 重置模态框的输入数据
  handleReset = () => {
    this.props.form.resetFields();
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { dictTypeList, formPropsObj } = this.props;
    const { btnLoading, isDisabled } = this.state;
    return (
      <Fragment>
        <Button type="primary"
                style={{ marginLeft: 10 }}
                onClick={this.showModal}>
          <i className="iconfont icon-add-circle">创建表单配置预览</i>
        </Button>
        <Modal
          destroyOnClose
          title="创建表单配置预览"
          visible={this.state.visible}
          onCancel={this.handleCancel}
          width = "800px"
          footer={[
            <Button key="back" onClick={this.handleCancel}>
              取消
            </Button>,
            <Button key="reset" type="danger" onClick={this.handleReset}>
              重置
            </Button>,
            <Button key="submit" type="primary" onClick={this.handleOk} loading = { btnLoading }>
              提交
            </Button>,
          ]}
        >
          <Form labelCol={{ span: 6 }} wrapperCol={{ span: 15 }} onSubmit={this.handleSubmit}>
            <Form.Item label="预览表单属性数据结构模板">
                <TextArea
                  autoSize
                  defaultValue={defaultTemplate}
                  disabled
                />
            </Form.Item>
            <Form.Item label="表单属性数据结构输入框">
              {getFieldDecorator('formValue', {
                rules: [{ required: true, message: '根据已选属性，请输入属性数据结构' },
                        { whitespace: true },
                ],
                initialValue: JSON.stringify(formPropsObj),
                validateTrigger: 'onSubmit',
              })(
                <TextArea
                  placeholder="根据已选属性，请输入属性数据结构"
                  rows={4} autoSize={{ minRows: 7, maxRows: 12 }}
                  allowClear
                />,
              )}
            </Form.Item>
            <Form.Item label="select选择框关联字典">
              {getFieldDecorator('dictId', {
                  rules: [{ required: true, message: '请选择关联的字典主项!' },
                          { whitespace: true },
                  ],
                  initialValue: '请选择关联的字典主项',
                  validateTrigger: 'onSubmit',
              })(
                  <Select placeholder="请选择关联的字典主项" style={{ width: '100%' }}
                          allowClear disabled={isDisabled}>
                    {
                      dictTypeList.map(item => (
                        <Option key={item.type} value={String(item.id)}>{item.type}</Option>
                      ))
                    }
                  </Select>,
              )}
            </Form.Item>
          </Form>
        </Modal>
      </Fragment>
    );
  }
}

export default PreviewDebugModal;
