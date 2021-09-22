import React, { Fragment } from 'react';
import { Modal, Form, Input, Button, Upload, Icon, message } from 'antd';
import { connect } from 'dva';
import object from 'lodash/object';
// import { addData } from '@/services/chartType'
// import styles from './index.less';

const { TextArea } = Input;
@connect()
@Form.create({ name: 'advanced_search' })
class RowAddModal extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
        visible: false,
        previewVisible: false,
        previewImage: '',
        fileList: [],
        uploadImage: '',
        btnLoading: false,
        isUpdate: false,
      };
}

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  // 上传新增的所有数据
  handleOk = e => {
    e.preventDefault();
    const { dispatch } = this.props;
    const { uploadImage } = this.state;
    const upfile = new FormData();
    this.props.form.validateFields((err, values) => {
      if (err) {
        return
      }
      upfile.append('file', uploadImage);
      upfile.append('creator', 'admin');
      const formList = object.keys(values);
      for (let i = 0; i < formList.length; i += 1) {
        upfile.append(formList[i], values[formList[i]]);
      }
      this.setState({ btnLoading: true });
      dispatch({
        type: 'chartType/addRowData',
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

  // 关闭模态框
  handleCancel = () => {
    this.setState({
      visible: false,
      fileList: [],
    });
  };

  // 重置输入数据
  handleReset = () => {
    this.props.form.resetFields();
    this.setState({
      fileList: [],
    })
  };

  handleChange = info => {
    const newFileList = [...info.fileList];
    this.setState({ fileList: newFileList });
  };

  getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  };

  beforeUpload = async file => {
    console.log('updateFile:', file);
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
    this.setState({
      uploadImage: file,
    })
    return true
  };

  cancelPreview = () => this.setState({ previewVisible: false });

  handlePreview = file => {
    if (file.url || file.preview) {
      this.setState({
        previewVisible: true,
        previewImage: file.url || file.preview,
      });
    } else {
      this.getBase64(file.originFileObj, imageUrl => {
        console.log('imageUrl:', imageUrl)
        file.preview = imageUrl;
        this.setState({
          previewVisible: true,
          previewImage: imageUrl,
        })
      })
    }
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">上传图标</div>
      </div>
    );
    const { previewVisible, previewImage, fileList } = this.state;
    // 默认开启预览,删除,不开启下载功能。
    const showUploadList = {
      showPreviewIcon: true, showRemoveIcon: true, showDownloadIcon: false,
    };
    const { btnLoading, isUpdate } = this.state;
    return (
      <Fragment>
        <Button type="primary"
                style={{ marginLeft: 10 }}
                onClick={this.showModal}>
          添加图表类型
        </Button>
        <Modal
          destroyOnClose
          title="添加图表类型"
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
            <Button key="submit" type="primary" onClick={this.handleOk} loading = { btnLoading }>
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
                validateTrigger: 'onSubmit',
              })(
                <Input placeholder="请输入类型编号" autoComplete="off"/>,
              )}
            </Form.Item>
            <Form.Item label="类型名称">
              {getFieldDecorator('typeName', {
                rules: [{ required: true, message: '请输入类型名称!' },
                        { whitespace: true },
                ],
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
                validateTrigger: 'onSubmit',
              })(
                <TextArea
                  placeholder="请输入描述内容"
                  rows={4} autoSize={{ minRows: 3, maxRows: 5 }}
                />,
              )}
            </Form.Item>
            <Form.Item label="类型图标">
                {getFieldDecorator('imagUrl', {
                  rules: [
                    { required: !isUpdate, message: '请上传类型图标' },
                  ],
                  validateTrigger: 'onSubmit',
                  valuePropName: 'file',
                })(
                  <div className="clearfix">
                    <Upload
                      name="avatar"
                      listType="picture-card"
                      className="avatar-uploader"
                      fileList={fileList}
                      showUploadList={showUploadList}
                      beforeUpload={this.beforeUpload}
                      onPreview={this.handlePreview}
                      onChange={this.handleChange}
                    >
                      {fileList.length > 0 ? null : uploadButton}
                    </Upload>,
                    <Modal visible={previewVisible} footer={null} onCancel={this.cancelPreview}>
                      <img alt="previewImg" style={{ width: '100%' }} src={previewImage} />
                    </Modal>
                  </div>,
                )}
            </Form.Item>
          </Form>
        </Modal>
      </Fragment>
    );
  }
}

export default RowAddModal;
