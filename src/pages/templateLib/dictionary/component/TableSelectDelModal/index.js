import React, { Component, Fragment } from 'react';
import { Modal, Button, Result } from 'antd';
import { connect } from 'dva';

@connect(({ dict }) => ({ selectedRowKeys: dict.selectedRowKeys }))
class TableSelectDelModal extends Component {
  state = { visible: false };

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'dict/deleteSelectedDict',
      callback: () => {
        this.setState({
          visible: false,
        })
      },
    });
  };

  handleCancel = () => {
    this.setState({
      visible: false,
    });
  };

  render() {
    return (
      <Fragment>
        <Button type="danger" style={{ marginLeft: 10 }} onClick={this.showModal}
                disabled= {this.props.selectedRowKeys.length === 0 ? true : false}
        >删除字典</Button>
        <Modal
          destroyOnClose
          title="删除"
          visible={this.state.visible}
          onCancel={this.handleCancel}
          width = "500px"
          footer={null}
        >
          <Result
            status="warning"
            title="确定删除所选字典吗？淡定哈，删错不能恢复"
            extra={
              <Fragment>
                <Button key="back" type="warning" onClick={this.handleCancel}>
                  取消
                </Button>
                <Button key="submit" type="primary" onClick={this.handleOk}>
                  确定
                </Button>
              </Fragment>
            }
          />
        </Modal>
      </Fragment>
    );
  }
}

export default TableSelectDelModal;
