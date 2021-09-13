import React, { Component, Fragment } from 'react';
import { Modal, Descriptions, Tooltip } from 'antd';
import { connect } from 'dva';

@connect()
class DictDetailsModal extends Component {
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
    const { selectedDictItem } = this.props;
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
            <Descriptions.Item label="字典项编号">{selectedDictItem.item_id}</Descriptions.Item>
            <Descriptions.Item label="字典项名称">{selectedDictItem.value}</Descriptions.Item>
            <Descriptions.Item label="描述">
              <Tooltip title={selectedDictItem.description}>
                {selectedDictItem.description}
              </Tooltip>
            </Descriptions.Item>
          </Descriptions>
        </Modal>
      </Fragment>
    );
  }
}

export default DictDetailsModal;
