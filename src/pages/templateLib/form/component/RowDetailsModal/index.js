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
            <Descriptions.Item label="表单名称">{rowDetailsData.formName}</Descriptions.Item>
            <Descriptions.Item label="描述">
              <Tooltip title={rowDetailsData.describtion}>
                {rowDetailsData.describtion}
              </Tooltip>
            </Descriptions.Item>
            <Descriptions.Item label="创建时间">{rowDetailsData.createTime}</Descriptions.Item>
          </Descriptions>
        </Modal>
      </Fragment>
    );
  }
}

export default RowDetailsModal;
