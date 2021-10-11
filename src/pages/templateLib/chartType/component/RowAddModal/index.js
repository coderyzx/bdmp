import React, { Fragment } from 'react';
import { Modal, Form, Input, Button, Upload, Icon, message } from 'antd';
import { addData, pageChangeData, getTypeIdList, getTypeNameList } from '@/services/chartType';

const { TextArea } = Input;
@Form.create({ name: 'add' })
class RowAddModal extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
        visible: false,
        previewVisible: false,
        previewImage: '',
        fileList: [],
        uploadImage: null,
        btnLoading: false,
        typeId: '',
        typeName: '',
        fileType: true,
      };
}

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  // 上传新增的所有数据
  handleOk = async e => {
    e.preventDefault();
    const { uploadImage, fileType } = this.state;
    const upfile = new FormData();
    let error = null;

    if (!fileType) {
      this.props.form.setFieldsValue({ imagUrl: null });
    }
    this.props.form.validateFields((err, values) => {
      if (err) {
        error = err;
        return
      }
      upfile.append('file', uploadImage);
      upfile.append('creator', 'admin');
      const formList = Object.keys(values);
      for (let i = 0; i < formList.length; i += 1) {
        upfile.append(formList[i], values[formList[i]]);
      }
      this.setState({ btnLoading: true });
    });
    if (!error) {
      const { pageSize } = this.props;
      await addData(upfile);
      const resp = await pageChangeData({ pageSize, current: 1 });
      const typeIdList = await getTypeIdList();
      const typeNameList = await getTypeNameList();
      await this.props.updateData(resp, typeIdList, typeNameList);
      this.handleReset();
      this.setState({
        visible: false,
        btnLoading: false,
      });
    }
  };

  // 关闭模态框
  handleCancel = () => {
    this.setState({
      visible: false,
      fileList: [],
      typeId: '',
      typeName: '',
    });
  };

  // 重置模态框的输入数据
  handleReset = () => {
    this.props.form.resetFields();
    this.setState({
      fileList: [],
      typeId: '',
      typeName: '',
    })
  };

  getSuffix = (value, maxLength) => {
    const valueLength = value ? value.length : 0
    return (<div style={{ color: 'rgba(0, 0, 0, 0.25)', marginRight: '8px' }}>
              {valueLength ? `${valueLength}/${maxLength}` : `0/${maxLength}`}
           </div>);
  }

  // input输入改变时触发
  handleChangeValue = e => {
    if (e.target.id === 'add_typeId') {
      this.setState({
        typeId: e.target.value,
      });
    }
    if (e.target.id === 'add_typeName') {
      this.setState({
        typeName: e.target.value,
      });
    }
  }

  // 上传状态改变时触发
  handleChange = ({ file, fileList }) => {
    console.log(file.status);
    if (file.status === 'done') {
      console.log(file)
      this.setState({
        uploadImage: file.originFileObj,
      });
    }
    this.setState({ fileList: file.status ? [...fileList] : this.state.fileList });
  };

  // 转换文件格式为base64
  getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  };

  // 上传文件前
  beforeUpload = file => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('只能上传JPG/PNG格式图片!');
      this.setState({
        fileType: isJpgOrPng,
      })
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('上传图片大小不能超过2M!');
    }
    return isJpgOrPng && isLt2M;
  };

  // 取消预览
  cancelPreview = () => this.setState({ previewVisible: false });

  // 预览图片
  handlePreview = file => {
    if (file.url || file.preview) {
      this.setState({
        previewVisible: true,
        previewImage: file.url || file.preview,
      });
    } else {
      this.getBase64(file.originFileObj, imageUrl => {
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
    const { previewVisible, previewImage, fileList, typeId, typeName } = this.state;
    // 默认开启预览,删除,不开启下载功能。
    const showUploadList = {
      showPreviewIcon: true, showRemoveIcon: true, showDownloadIcon: false,
    };
    const { btnLoading } = this.state;
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
                <Input placeholder="请输入类型编号" autoComplete="off"
                       allowClear maxLength={ 10 }
                       suffix = {this.getSuffix(typeId, 10)}
                       onChange={this.handleChangeValue}
                />,
              )}
            </Form.Item>
            <Form.Item label="类型名称">
              {getFieldDecorator('typeName', {
                rules: [{ required: true, message: '请输入类型名称!' },
                        { whitespace: true },
                ],
                validateTrigger: 'onSubmit',
              })(
                <Input placeholder="请输入类型名称" autoComplete="off"
                       allowClear maxLength={ 10 }
                       suffix = {this.getSuffix(typeName, 10)}
                       onChange={this.handleChangeValue}
                />,
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
                  allowClear
                />,
              )}
            </Form.Item>
            <Form.Item label="类型图标">
                {getFieldDecorator('imagUrl', {
                  rules: [
                    { required: true, message: '请上传类型图标' },
                  ],
                  validateTrigger: 'onSubmit',
                  valuePropName: 'file',
                })(
                  <div className="clearfix">
                    <Upload
                      name="avatar"
                      accept="image/png, image/jpeg"
                      listType="picture-card"
                      className="avatar-uploader"
                      fileList={fileList}
                      showUploadList={showUploadList}
                      beforeUpload={this.beforeUpload}
                      onPreview={this.handlePreview}
                      onChange={this.handleChange}
                    >
                      {fileList.length > 0 ? null : uploadButton}
                    </Upload>
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
