/* eslint-disable no-unused-expressions */
import React from 'react';
import { Icon, Modal, Upload } from 'antd';
import { getBase64, imageSizeValid } from '@/utils/imageUtil';
// import { getFilePath } from '@/services/charts';
import classNames from 'classnames';
import styles from './index.less';

export default class UploadImg extends React.Component {
  state = {
    fileList: [],
    previewVisible: false,
    previewImage: '',
  };

  handleChange = info => {
    const newFileList = [...info.fileList];
    this.setState({ fileList: newFileList });
    const { onChange } = this.props;
    onChange && onChange(newFileList.length ? info.file && info.file.originFileObj : '');
  };

  handlePreview = file => {
    if (file.url || file.preview) {
      this.setState({
        previewVisible: true,
        previewImage: file.url || file.preview,
      });
    } else {
      getBase64(file.originFileObj, imageUrl => {
        file.preview = imageUrl;
        this.setState({
          previewVisible: true,
          previewImage: imageUrl,
        })
      })
    }
  };

  handleCancel = () => this.setState({ previewVisible: false });

  // 默认只支持Jpg/Png格式，大小不能超过5M
  beforeUpload = loadFile => imageSizeValid(loadFile, 5 * 1024, '图片大小不超过5MB');

  getFileList = () => {
    const { val } = this.props;
    if (!val) {
      return [];
    }

    if (typeof val === 'string') {
      // 云存储图片objectUid
      return [{
        uid: '-1',
        name: 'image.png',
        status: 'done',
        // url: getFilePath(val),
        url: `https://dataview-dev.uihcloud.cn/api/image/chartType/${val}`,
      }];
    }
    const { fileList } = this.state;
    return fileList;
  }

  render() {
    const { val, onChange, ...otherProps } = this.props;
    const { previewVisible, previewImage } = this.state;

    // 默认开启预览、删除，不开启下载功能。
    const showUploadList = {
      showPreviewIcon: true, showRemoveIcon: true, showDownloadIcon: false,
    };

    const currentFileList = this.getFileList();
    const isEmpty = !(currentFileList && currentFileList.length);
    const uploadClassName = classNames({
      [styles.upload]: true,
      [styles.uploadEmpty]: isEmpty,
      [styles.uploadShow]: !isEmpty,
    });

    return (
      <>
        <Upload
          name="image"
          listType="picture-card"
          method="get"
          showUploadList={showUploadList}
          accept=".jpg,.png"
          className={uploadClassName}
          fileList={currentFileList}
          val={val}
          onChange={this.handleChange}
          onPreview={this.handlePreview}
          beforeUpload={this.beforeUpload}
          {...otherProps}
        >
          <div className={styles.plusIcon}>
            <Icon type="plus" />
          </div>
        </Upload>
        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel} closable={false}>
          <img alt="previewImg" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </>
    )
  }
}
