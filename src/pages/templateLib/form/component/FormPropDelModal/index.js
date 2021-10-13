import React, { Component, Fragment } from 'react';
import { Modal, Button, Result } from 'antd';
import { deleteSelectedData } from '@/services/formManage';

class FormPropDelModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      btnLoading: false,
    }
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = async () => {
    const { getFormProps, selectedLeftKeys } = this.props;
    this.setState({ btnLoading: true });
    const resp = await deleteSelectedData(selectedLeftKeys);
    if (resp.msgCode === 'SUCCESS') {
        getFormProps();
        this.setState({
            visible: false,
            btnLoading: false,
        });
    }
  };

  handleCancel = () => {
    this.setState({
      visible: false,
    });
  };

  render() {
    const { btnLoading } = this.state;
    return (
      <Fragment>
        <Button type="danger"
                disabled= {this.props.selectedLeftKeys.length === 0 ? true : false}
                style={{ marginLeft: 10, marginTop: 4 }}
                onClick={this.showModal}>
          <i className="iconfont icon-shanchu">批量删除form表单项</i>
        </Button>
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
            title="确定删除所选form表单项吗？淡定哈，删错不能恢复"
            extra={
              <Fragment>
                <Button key="back" type="warning" onClick={this.handleCancel}>
                  取消
                </Button>
                <Button key="submit" type="primary" onClick={this.handleOk} loading={ btnLoading }>
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

export default FormPropDelModal;
