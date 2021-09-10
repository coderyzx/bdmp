import React, { Component } from 'react';
import { Form, Input, Select, TreeSelect, Row, Col, Radio, DatePicker, Button } from 'antd';
import moment from 'moment';
import { createOptions, formatTreeData, createRadioButtons, createRadio } from '@/utils/customForm';
import IconNode from '@/components/IconNode';
import _ from 'lodash'
import fieldsGroupType from '@/constants/fieldsGroupType'
import styles from './index.less';

const { RangePicker } = DatePicker;
/**
 * props:
 * {
 *  col: 全局FormItem的col配置
 *  formItemLayout: 全局表单元素的布局
 *  initialValues: 表单初始值
 *  gutter: 元素间隔，可设置数字（水平间隔）或者数组（水平垂直间隔）
 *  onChange: 元素值改变回调事件
 *  asyncOptions: Obejct, 异步获取的下拉选项, key为field
 *  disabled: true 禁止所有编辑 | Object 部分禁止，key为禁止编辑的field，
 *  config: 所有输入元素的配置的数组，每项如下
 *  {
 *    type: 输入控件类型 Input/Select/TreeSelect/RadioButton/DatePicker
 *    label: 控件label,
 *    field: 服务端交互字段，
 *    rules: 校验规则
 *    formItemLayout: 局部表单元素的布局
 *    col: 局部FormItem的col配置
 *    comProps: 输入控件属性扩展
 *    options: Select/TreeSelect控件的下拉选项 Array | String, 若为String，表示异步获取，从asyncOptions中获取该值对应的选项
 *    optionKey: 下拉选项用于交互字段, 可选，统一成key/value后可删除
 *    optionValue: 下拉选项用于显示字段, 可选，统一成key/value后可删除
 *  }
 * }
 *
 * @deprecated 废弃使用
 * use ConfigForm in the future
 *
 */
@Form.create()
class CustomForm extends Component {
  state = {
    treeSearchValue: '',
  }

  handleTreeSearch = value => {
    this.setState({ treeSearchValue: value })
  }

  handleTreeBlur = () => {
    setTimeout(() => {
      this.setState({ treeSearchValue: '' })
    }, 200);
  }

  getComponent = configItem => {
    const { refreshCode } = this.props;
    const {
      type,
      comProps: originalProps,
      options,
      optionKey = 'key',
      optionValue = 'value',
    } = configItem;
    const comProps = { ...originalProps, disabled: this.isItemDisabled(configItem) }

    let component = null;
    if (type === 'Input') {
      component = (
        <Input
          {...comProps}
          onChange={e => this.handleOnChange(e.target.value, configItem)}
        />
      )
    } else if (type === 'Captcha') {
      const { currentRandom } = localStorage;
      component = (
        <div style={{ background: '#fff', borderRadius: '4px' }}>
          <Input
            {...comProps}
            onChange={e => this.handleOnChange(e.target.value, configItem)}
          />
          <img src={`/code?randomStr=${refreshCode || currentRandom}`} alt="" />
          <i className={`iconfont icon-magnifying-glass- ${styles.refresh}`} onClick={() => { this.refreshCode() }}></i>
        </div>
      )
    } else if (type === 'Select') {
      const optionDataSource = this.getOptionData(options);
      component = (
        <Select
          {...comProps}
          showSearch
          suffixIcon={IconNode.Arrow}
          onChange={value => this.handleOnChange(value, configItem)}
          // onFocus={value => this.handleOnChange(value, configItem)}
        >
          {createOptions(optionDataSource, optionKey, optionValue)}
        </Select>
      )
    } else if (type === 'TreeSelect') {
      let treeData = this.getOptionData(options);
      treeData = formatTreeData(treeData, optionKey, optionValue);
      component = (
        <TreeSelect
          {...comProps}
          treeData={treeData}
          suffixIcon={IconNode.Arrow}
          onChange={value => this.handleOnChange(value, configItem)}
          searchValue={this.state.treeSearchValue}
          onSearch={this.handleTreeSearch}
          onBlur={this.handleTreeBlur}
        />
      )
    } else if (type === 'RadioButton') {
      const optionDataSource = this.getOptionData(options);
      component = (
        <Radio.Group
          {...comProps}
          className={styles.customRadioGroup}
          onChange={e => this.handleOnChange(e.target.value, configItem)}
        >
          {createRadioButtons(optionDataSource, optionKey, optionValue)}
        </Radio.Group>
      )
    } else if (type === 'Radio') {
      const optionDataSource = this.getOptionData(options);
      component = (
        <Radio.Group {...comProps} onChange={e => this.handleOnChange(e.target.value, configItem)}>
          {createRadio(optionDataSource, optionKey, optionValue)}
        </Radio.Group>
      )
    } else if (type === 'DatePicker') {
      component = (
        <DatePicker {...comProps}
          onChange={value => this.handleOnChange(value, configItem)}
          disabledDate={current => this.handleDisabledDate(current, configItem)}
          style={{ width: '100%' }}
        />
      )
    } else if (type === 'DateRangePicker') {
      component = (
        <RangePicker
          {...comProps}
          onChange={value => this.handleOnChange(value, configItem)}
          disabledDate={current => this.handleDisabledDate(current, configItem)}
          onCalendarChange={dates => this.onCalendarChange(dates)}
          onOpenChange={status => this.onOpenChange(status)}
        />
      )
    }

    return component;
  }

  getOtherComponent = (configItem, globalCol, defaultVaule) => {
    const { type, label, field, col } = configItem;
    let component = <Col key={field} {...(col || globalCol)} />;
    if (type === 'Text') {
      component = (
        <Col key={field} {...(col || globalCol)}>
          <div className="ant-row ant-form-item">
            <div className="ant-col ant-col-8 ant-form-item-label">
              <label className="ant-form-item-no-colon">
                <span className={styles.labelText}>{label}</span>
              </label>
            </div>
            <div className="ant-col ant-col-16 ant-form-item-control-wrapper"
                style={{ background: '#4a4a4a' }}
              >
              <span className={styles.valueText}>{defaultVaule || '- -' }</span>
            </div>
          </div>
        </Col>
      )
    }
    return component;
  }

  // 判断是静态数据源还是动态数据源
  getOptionData = options => {
    let optionDataSource = []
    if (Array.isArray(options)) {
      optionDataSource = options;
    } else if (typeof options === 'string') {
      const { asyncOptions } = this.props;
      optionDataSource = asyncOptions ? asyncOptions[options] : [];
    }
    return optionDataSource;
  }

  renderFormItemsByGroup=() => {
    const {
      config,
    } = this.props;
    const GroupedConfig = _.groupBy(config, v => v.groupType)
    const items = []
    _.each(GroupedConfig, (value, key) => {
      let title = ''
      if (key * 1 > 0) {
        title = <Col key={key} span={24} className={styles.itemsGroupTitle}>
          {fieldsGroupType[key]}
        </Col>
      }
      items.push(title, ...this.renderFormItems(value))
    })
    return items
  }

  renderFormItems = config => {
    const {
      initialValues = {},
      col: globalCol = { span: 12 },
      form,
    } = this.props;
    const { getFieldDecorator } = form;
    return config.map(configItem => {
      const { type, label, field, col, formItemLayout, rules = [], groupType } = configItem;
      let component = this.getComponent(configItem);

      // 没有对应组件，以空作为占位
      if (component === null) {
        component = this.getOtherComponent(configItem, globalCol, initialValues[field]);
        return component;
      }

      let initialValue = initialValues && initialValues[field];
      if (type === 'DatePicker') {
        initialValue = initialValue ? moment(initialValue) : null;
      }
      if (type === 'Select') {
        if (initialValue === true) {
          initialValue = '1'
        }
        if (initialValue === false) {
          initialValue = '0'
        }
      }
      const itemField = groupType * 1 > 0 ? `${groupType}.${field}` : field;
      return (
        <Col key={itemField} {...(col || globalCol)}>
          <Form.Item
            label={label}
            {...formItemLayout}
          >
            {getFieldDecorator(itemField, { rules, initialValue })(component)}
          </Form.Item>
        </Col>
      )
    })
  }

  isItemDisabled = configItem => {
    const { disabled } = this.props;
    if (disabled) {
      if (typeof disabled === 'boolean') {
        return disabled;
      }

      if (typeof disabled === 'object') {
        return !!(disabled[configItem.field])
      }
    }
    return false;
  }

  refreshCode = () => {
    const { refresh } = this.props;
    refresh();
  }

  handleOnChange = (value, configItem) => {
    const { onChange } = this.props;
    if (onChange) {
      onChange(configItem.field, value, configItem);
    }
  }

  handleDisabledDate = (current, configItem) => {
    const { disabledDate } = this.props;
    if (disabledDate) {
      return disabledDate(current, configItem.field);
    }
    return false;
  }

  onCalendarChange = dates => {
    const { onCalendarChange } = this.props;
    if (onCalendarChange) {
      onCalendarChange(dates)
    }
  }

  onOpenChange = status => {
    const { onOpenChange } = this.props;
    if (onOpenChange) {
      onOpenChange(status)
    }
  }

  render() {
    const {
      config,
      formItemLayout,
      gutter = 24,
      hideRequiredMark = false,
      labelAlign = 'right',
      submit,
    } = this.props;

    if (!config || !Array.isArray(config)) {
      return null;
    }

    let submitNode = null;
    if (submit) {
      const { col, defaultValue, config: buttonConfig } = submit;
      submitNode = (
        <Col span={col}>
          <Button
            type="primary"
            {...buttonConfig}
          >
            {defaultValue}
          </Button>
        </Col>
      );
    }

    return (
      <Form
        {...formItemLayout}
        onSubmit={this.handleSubmit}
        colon={false}
        hideRequiredMark={hideRequiredMark}
        labelAlign={labelAlign}
      >
        <Row gutter={gutter} align="bottom" type="flex">
          {this.renderFormItemsByGroup()}
          {submitNode}
        </Row>
      </Form>
    )
  }
}

export default CustomForm;
