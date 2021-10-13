import React, { Component, Fragment } from 'react';
import { Modal, Button, Result } from 'antd';
import { deleteSelectedData, getTypeIdList, getTypeNameList, pageChangeData } from '@/services/chartType';

class RowSelectDelModal extends Component {
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
    const { current, pageSize, selectedRowKeys } = this.props;
    this.setState({ btnLoading: true });
    await deleteSelectedData(selectedRowKeys);
    let resp = await pageChangeData({ pageSize, current });
    const typeIdList = await getTypeIdList();
    const typeNameList = await getTypeNameList();
    if (resp.data.lists.length === 0 && current > 1) {
      const update = { current: current - 1, pageSize };
      resp = await pageChangeData(update);
      await this.props.updateData(resp, typeIdList, typeNameList);
    } else {
      const update = { current, pageSize };
      resp = await pageChangeData(update);
      await this.props.updateData(resp, typeIdList, typeNameList);
    }
    this.setState({
      visible: false,
      btnLoading: false,
    });
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
                disabled= {this.props.selectedRowKeys.length === 0 ? true : false}
                style={{ marginLeft: 10, marginTop: 4 }}
                onClick={this.showModal}>
          <i className="iconfont icon-piliangshanchu">批量删除图表类型</i>
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
            title="确定删除所选图表类型吗？淡定哈，删错不能恢复"
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

export default RowSelectDelModal;
