import React, { Component, Fragment } from 'react';
import { Modal, Descriptions, Tooltip } from 'antd';
import { connect } from 'dva';

@connect()
class TableDetailsModal extends Component {
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
      <Fragment>
        <Modal
          destroyOnClose
          title="详情"
          visible={this.state.visible}
          onCancel={this.handleCancel}
          width = "500px"
          footer={null}
        >
          <Descriptions layout="vertical">
            <Descriptions.Item label="字典编号">{rowDetailsData.type_id}</Descriptions.Item>
            <Descriptions.Item label="字典名称">{rowDetailsData.type}</Descriptions.Item>
            <Descriptions.Item label="描述">
              <Tooltip title={rowDetailsData.description}>
                {rowDetailsData.description}
              </Tooltip>
            </Descriptions.Item>
            <Descriptions.Item label="创建时间">{rowDetailsData.create_datetime}</Descriptions.Item>
          </Descriptions>
        </Modal>
      </Fragment>
    );
  }
}

export default TableDetailsModal;
