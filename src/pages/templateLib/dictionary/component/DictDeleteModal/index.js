import React, { Component, Fragment } from 'react';
import { Modal, Button, Result } from 'antd';
import { connect } from 'dva';

@connect()
class DictDeleteModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      btnloading: false,
     };
  }

  componentDidMount() {
    this.props.onRef(this);
 }

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = () => {
    const { dispatch, deleteItemkey } = this.props;
    this.setState({ btnloading: true })
    dispatch({
      type: 'dict/deleteDictItemData',
      payload: deleteItemkey,
      callback: () => {
        this.setState({
          visible: false,
          btnloading: false,
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
    const { btnloading } = this.state;
    return (
      <Fragment>
        <Modal
          destroyOnClose
          title="删除本行数据"
          visible={this.state.visible}
          onCancel={this.handleCancel}
          width = "500px"
          footer={null}
        >
          <Result
            status="warning"
            title="确定删除所选字典项吗？淡定哈，删错不能恢复"
            extra={
              <Fragment>
                <Button key="back" type="warning" onClick={this.handleCancel}>
                取消
              </Button>
              <Button key="submit" type="primary" onClick={this.handleOk} loading={btnloading}>
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

export default DictDeleteModal;
