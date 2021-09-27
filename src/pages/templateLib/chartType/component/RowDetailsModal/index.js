import React, { Component, Fragment } from 'react';
import { Modal, Descriptions, Tooltip } from 'antd';

class RowDetailsModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    }
  }

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
            <Descriptions.Item label="类型编号">{rowDetailsData.typeId}</Descriptions.Item>
            <Descriptions.Item label="类型名称">{rowDetailsData.typeName}</Descriptions.Item>
            <Descriptions.Item label="类型图标"><img alt="类型图标" style={{ width: '25px' }} src={rowDetailsData.typeIcon} /></Descriptions.Item>
            <Descriptions.Item label="描述">
              <Tooltip title={rowDetailsData.description}>
                {rowDetailsData.description}
              </Tooltip>
            </Descriptions.Item>
            <Descriptions.Item label="创建人">{rowDetailsData.creator}</Descriptions.Item>
            <Descriptions.Item label="创建时间">{rowDetailsData.createDate}</Descriptions.Item>
          </Descriptions>
        </Modal>
      </Fragment>
    );
  }
}

export default RowDetailsModal;
