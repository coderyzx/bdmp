import React, { Component, Fragment } from 'react';
import { Modal, Descriptions, Tooltip } from 'antd';
import { connect } from 'dva';

@connect()
class DetailsModal extends Component {
  state = { visible: false };

  componentDidMount() {
    this.props.onRef(this);
 }

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleCancel = () => {
    this.setState({
      visible: false,
    });
  };

  render() {
    const rowDetailsData = this.props.tableRow;
    return (
      <>
        <Modal
          destroyOnClose
          title="菜单页面详情"
          visible={this.state.visible}
          onCancel={this.handleCancel}
          width = {600}
          footer={null}
        >
          <Descriptions layout="horizontal">
            <Descriptions.Item label="菜单名称"span={6}>
              <Tooltip title={rowDetailsData.classLabel}>
                {rowDetailsData.classLabel}
              </Tooltip>
            </Descriptions.Item>
            <Descriptions.Item label="菜单级别" span={6}>{rowDetailsData.level}</Descriptions.Item>
            <Descriptions.Item label="父级菜单名称" span={6}>
              <Tooltip title={rowDetailsData.parentLabel}>
                {rowDetailsData.parentLabel}
              </Tooltip>
            </Descriptions.Item>
            <Descriptions.Item label="排序序号"span={6}>{rowDetailsData.sort}</Descriptions.Item>
            <Descriptions.Item label="创建者" span={6}>{rowDetailsData.createUserId}</Descriptions.Item>
            <Descriptions.Item label="创建时间" span={6}>{rowDetailsData.createDatatime}</Descriptions.Item>
            <Descriptions.Item label="修改者" span={6}>{rowDetailsData.modifyUserId}</Descriptions.Item>
            <Descriptions.Item label="修改时间" span={6}>{rowDetailsData.modifyDatatime}</Descriptions.Item>
          </Descriptions>
        </Modal>
      </>
    );
  }
}

export default DetailsModal;
