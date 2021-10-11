import React, { Component } from 'react';
import { Drawer } from 'antd';
import TableTransfer from '../TableTransfer';

class FormPropsAddDrawer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
  }

  componentDidMount() {
    this.props.onRef(this);
  }

  showDrawer = () => {
    this.setState({
      visible: true,
    });
  };

  onClose = () => {
    this.setState({
      visible: false,
    });
  };

  render() {
    const { visible } = this.state;
    return (
      <Drawer
        destroyOnClose
        // closable={false}
        title="表单属性管理"
        placement="right"
        width="89%"
        onClose={this.onClose}
        visible={visible}
      >
        <TableTransfer/>
      </Drawer>
    );
  }
}

export default FormPropsAddDrawer;
