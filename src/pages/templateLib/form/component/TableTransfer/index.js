import React, { Component } from 'react';
import { Switch, Tag, DatePicker, Input, Select, Spin, Tooltip } from 'antd';
import { connect } from 'dva';
import TableTransferComponent from './TableTransferComponent';
import FormPropAddModal from '../FormPropAddModal';
import FormPropDelModal from '../FormPropDelModal';
import PreviewDebugModal from '../PreviewDebugModal'
import styles from './index.less';
import { getAllFormProps, getFormPreview } from '@/services/formManage';
import { getDictItemInitial } from '@/services/dict';


const leftTableColumns = [
  {
    dataIndex: 'formProp',
    title: '已有的表单属性',
    width: '25%',
    align: 'center',
  },
  {
    dataIndex: 'formType',
    title: '已有的表单种类',
    width: '25%',
    align: 'center',
    render: formType => <Tag color="magenta">{formType}</Tag>,
  },
  {
    dataIndex: 'description',
    title: '描述说明',
    align: 'center',
        onCell: () => ({
            style: {
              maxWidth: 80,
              overflow: 'hidden',
              whiteSpace: 'nowrap',
              textOverflow: 'ellipsis',
              cursor: 'pointer',
            },
          }),
          render: text => <Tooltip placement="topLeft" title={text}>{text}</Tooltip>,
  },
];
const rightTableColumns = [
  {
    dataIndex: 'formProp',
    title: '选中的表单属性',
    align: 'center',
  },
  {
    dataIndex: 'formType',
    title: '选中的表单种类',
    align: 'center',
    render: formType => <Tag color="geekblue">{formType}</Tag>,
  },
];

const { Option } = Select;

@connect(({ formManage }) => ({
  formId: formManage.formId,
  dictId: formManage.dictId,
}))
class TableTransfer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      targetKeys: [],
      disabled: false,
      showSearch: false,
      formPropsData: [],
      transferLoading: false,
      previewLoading: false,
      selectedLeftKeys: [],
      selectedFormType: '',
      previewCode: null,
      formPropsObj: null,
    };
  }

  componentDidMount() {
    // this.setPageHeight();
    // window.addEventListener('resize', this.setPageHeight);
    this.getFormProps();
  }

  getFormProps = async () => {
    this.setState({
      transferLoading: true,
      previewLoading: true,
     });
    const { formId } = this.props;
    const resp1 = await getAllFormProps();
    const resp2 = await getFormPreview(formId);
    if (resp1.msgCode === 'SUCCESS' && resp2.msgCode === 'SUCCESS') {
      this.setState({
        formPropsData: resp1.data,
        targetKeys: resp2.data.list,
        transferLoading: false,
      });
      const formPropsObj = JSON.parse(resp2.data.formValue);
      const dictID = resp2.data.dictId;
      let resp3;
      if (dictID) {
        resp3 = await getDictItemInitial(dictID);
      }
      if (formPropsObj) {
        switch (resp2.data.formType) {
          case 'Input':
            this.setState({
              previewCode: (
                  <Input {...formPropsObj}/>
                ),
              previewLoading: false,
              selectedFormType: resp2.data.formType,
              formPropsObj,
            });
            break;

          case 'Select':

            this.setState({
              previewCode: (
                <Select style={{ width: 200 }} {...formPropsObj}>
                  { dictID ?
                    resp3.data.map(item => (
                      <Option key={item.value} value={item.item_id}>{item.value}</Option>
                    )) :
                    null
                  }
                </Select>
              ),
              previewLoading: false,
              selectedFormType: resp2.data.formType,
              formPropsObj,
            });
            break;

          case 'DatePicker':
            this.setState({
              previewCode: (
                <DatePicker {...formPropsObj}/>
              ),
              previewLoading: false,
              selectedFormType: resp2.data.formType,
              formPropsObj,
            });
            break;
          default:
            console.log('没有配置form');
            break;
        }
      }
    }
  }

  handleSelectChange = sourceSelectedKeys => {
    this.setState({ selectedLeftKeys: [...sourceSelectedKeys] });
    // console.log('sourceSelectedKeys: ', sourceSelectedKeys);
    // console.log('targetSelectedKeys: ', targetSelectedKeys);
  };

  // setPageHeight = () => {
  //   this.setState({
  //     pageHeight: document.body.clientHeight - 50,
  //   });
  // }

  // 选项在两栏之间转移时的回调(targetKeys, direction, moveKeys): void
  onChange = nextTargetKeys => {
    // 此时是setState是同步
    this.setState({ targetKeys: nextTargetKeys },
      () => {
        const { formPropsData, targetKeys } = this.state;
        // console.log('targetKeys:', targetKeys)
        // console.log('formPropsData:', formPropsData)
        const index = targetKeys[0];
        for (let i = 0; i < formPropsData.length; i += 1) {
          if (formPropsData[i].id === index) {
            this.setState({
              selectedFormType: formPropsData[i].formType,
            });
            break;
          }
        }
      });
  };

  triggerDisable = disabled => {
    this.setState({ disabled });
  };

  triggerShowSearch = showSearch => {
    this.setState({ showSearch });
  };

  render() {
    const { targetKeys, disabled, showSearch, formPropsData, previewCode, selectedFormType,
            transferLoading, previewLoading, selectedLeftKeys, formPropsObj } = this.state;
    const controlLeft = (
      <span>
        <FormPropAddModal getFormProps={this.getFormProps}/>
        <FormPropDelModal getFormProps={this.getFormProps} selectedLeftKeys={selectedLeftKeys}/>
      </span>
    );
    const controlRight = (
      <span>
        <PreviewDebugModal getFormProps={this.getFormProps} rightKeys={targetKeys}
                           selectedFormType={selectedFormType} formPropsObj={formPropsObj}/>
      </span>
    );
    return (
      <>
        {/* <div className={styles.formManagement} style={{ height: `${pageHeight}px` }}> */}
        <div className={styles.formManagement}>
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
          <div>
            <Switch
              unCheckedChildren="表单管理开启"
              checkedChildren="表单管理关闭"
              checked={disabled}
              onChange={this.triggerDisable}
              style={{ marginTop: 16, marginRight: 16 }}
            />
            <Switch
              unCheckedChildren="过滤功能关闭"
              checkedChildren="过滤功能开启"
              checked={showSearch}
              onChange={this.triggerShowSearch}
              style={{ marginTop: 16 }}
            />
          </div>
          <div className={styles.formContent}>
            <TableTransferComponent
              transferLoading={transferLoading}
              titles={[controlLeft, controlRight]}
              rowKey={record => record.id}
              operations={['配置', '未配置']}
              dataSource={formPropsData}
              targetKeys={targetKeys} // 右侧框的key集合
              disabled={disabled}
              showSearch={showSearch}
              onSelectChange={this.handleSelectChange}
              onChange={this.onChange}
              // 接收 inputValue option 两个参数，当 option 符合筛选条件时，应返回 true，反之则返回 false。
              filterOption={(inputValue, item) =>
                item.formProp.indexOf(inputValue) !== -1 || item.formType.indexOf(inputValue) !== -1
              }
              leftColumns={leftTableColumns}
              rightColumns={rightTableColumns}
              style={{ marginTop: 16 }}
            />
          </div>
        </div>
      </>
    );
  }
}

export default TableTransfer;
