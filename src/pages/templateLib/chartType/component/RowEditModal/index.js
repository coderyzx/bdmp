import React, { Component, Fragment } from 'react';
import { Modal, Form, Input, Button, Upload, message } from 'antd';
import { connect } from 'dva';
import object from 'lodash/object';

const { TextArea } = Input;
@connect()
@Form.create({ name: 'coordinated' })
class RowEditModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
        visible: false,
        uploadImage: '',
        imageUrl: '',
        btnLoading: false,
        isUpdate: true,
      };
  }

  componentDidMount() {
    this.props.onRef(this);
  }

  showModal = ({ typeIcon }) => {
    this.setState({
      visible: true,
      imageUrl: typeIcon,
    });
  };

  handleOk = e => {
    e.preventDefault();
    const { editRow, dispatch } = this.props;
    const { uploadImage } = this.state;
    const upfile = new FormData();
    this.props.form.validateFields((err, values) => {
      if (err) {
        return
      }
      upfile.append('file', uploadImage);
      upfile.append('creator', 'admin');
      upfile.append('id', editRow.id);
      const formList = object.keys(values);
      for (let i = 0; i < formList.length; i += 1) {
        upfile.append(formList[i], values[formList[i]]);
      }
      this.setState({ btnLoading: true });
      dispatch({
        type: 'chartType/editRowData',
        payload: upfile,
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

  getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }

  beforeUpload = async file => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('只能上传JPG/PNG格式图片!');
      return false;
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('上传图片大小不能超过2M!');
      return false;
    }
    this.getBase64(file, imageUrl => {
      this.setState({
        uploadImage: file,
        imageUrl,
      });
    });
    return true;
}

  render() {
    const { getFieldDecorator } = this.props.form;
    const { editRow } = this.props;
    const { btnLoading, imageUrl, isUpdate } = this.state;
    return (
      <Fragment>
        <Modal
          destroyOnClose
          title="编辑图表类型"
          visible={this.state.visible}
          onCancel={this.handleCancel}
          width = "600px"
          footer={[
            <Button key="back" onClick={this.handleCancel}>
              取消
            </Button>,
            <Button key="submit" type="primary" onClick={this.handleOk} loading={ btnLoading } >
              提交
            </Button>,
          ]}
        >
          <Form labelCol={{ span: 6 }} wrapperCol={{ span: 15 }} onSubmit={this.handleSubmit}>
            <Form.Item label="类型编号">
              {getFieldDecorator('typeId', {
                rules: [{ required: true, message: '请输入类型编号!' },
                        { whitespace: true },
                ],
                initialValue: editRow.typeId,
                validateTrigger: 'onSubmit',
              })(
                <Input placeholder="请输入类型编号" autoComplete="off" />,
              )}
            </Form.Item>
            <Form.Item label="类型名称">
              {getFieldDecorator('typeName', {
                rules: [{ required: true, message: '请输入类型名称!' },
                        { whitespace: true },
                ],
                initialValue: editRow.typeName,
                validateTrigger: 'onSubmit',
              })(
                <Input placeholder="请输入类型名称" autoComplete="off"/>,
              )}
            </Form.Item>
            <Form.Item label="描述">
              {getFieldDecorator('description', {
                rules: [{ required: true, message: '请输入描述内容!' },
                        { whitespace: true },
                ],
                initialValue: editRow.description,
                validateTrigger: 'onSubmit',
              })(
                <TextArea
                  placeholder="请输入描述内容"
                  rows={4} autoSize={{ minRows: 3, maxRows: 5 }}
                />,
              )}
            </Form.Item>
            <Form.Item label="类型图标">
              {getFieldDecorator('typeIcon', {
                valuePropName: 'file',
              })(
                <Upload
                  name="avatar"
                  className="avatar-uploader"
                  listType="picture-card"
                  showUploadList={false}
                  beforeUpload={this.beforeUpload}
                  onChange={this.handleChange}
                >
                  <img src={imageUrl} style={{ width: '100%' }} />
                </Upload>,
              )}
            </Form.Item>
          </Form>
        </Modal>
      </Fragment>
    );
  }
}

export default RowEditModal;
