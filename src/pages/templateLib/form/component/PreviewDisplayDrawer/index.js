import React, { Component } from 'react';
import { Drawer, Spin, DatePicker, Input, Select } from 'antd';
import styles from './index.less';
import { getFormPreview } from '@/services/formManage';

class PreviewDisplayDrawer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      previewLoading: false,
      previewCode: null,
    };
  }

  componentDidMount() {
    this.props.onRef(this);
  }

  getPreview = async () => {
    this.setState({ previewLoading: true });
    const { tableRow } = this.props;
    const resp = await getFormPreview(tableRow.id);
    if (resp.msgCode === 'SUCCESS') {
      const formPropsObj = JSON.parse(resp.data.formValue);
      if (formPropsObj) {
        switch (resp.data.formType) {
          case 'Input':
            this.setState({
              previewCode: (
                  <Input {...formPropsObj}/>
                ),
              previewLoading: false,
            });
            break;

          case 'Select':
            this.setState({
              previewCode: (
                <Select style={{ width: 200 }} {...formPropsObj}/>
              ),
              previewLoading: false,
            });
            break;

          case 'DatePicker':
            this.setState({
              previewCode: (
                <DatePicker {...formPropsObj}/>
              ),
              previewLoading: false,
            });
            break;
          default:
            console.log('没有配置form');
            break;
        }
      }
    }
  }

  showDrawer = async () => {
    this.setState({ visible: true },
      () => {
        this.getPreview();
      },
      );
  };

  onClose = () => {
    this.setState({
      visible: false,
    });
  };

  render() {
    const { visible, previewLoading, previewCode } = this.state;
    return (
      <Drawer
        destroyOnClose
        // closable={false}
        title="表单配置预览展示"
        placement="top"
        height="320"
        onClose={this.onClose}
        visible={visible}
      >
        <div className={styles.preview}>
            <div className={styles.preTitle}>form表单配置预览</div>
            {
              previewLoading ?
              <Spin spinning={previewLoading} size="large">
                <div className={styles.preItems}></div>
              </Spin> :
              <div className={styles.preItems}>
                <div className={styles.item}>{previewCode}</div>
              </div>
            }
          </div>
      </Drawer>
    );
  }
}

export default PreviewDisplayDrawer;
