import React, { Component } from 'react';
import { Form, Button, DatePicker, Select } from 'antd';
import { connect } from 'dva';

const { Option } = Select;
@connect(({ chartType }) => ({
  typeIdList: chartType.typeIdList,
  typeNameList: chartType.typeNameList,
  }))
@Form.create({ name: 'filter' })
class Filter extends Component {
  handleSave = e => {
    e.preventDefault();
    const { dispatch } = this.props;
    const fieldValues = this.props.form.getFieldsValue();
    const values = {
        ...fieldValues,
        createDate: fieldValues.createDate ? fieldValues.createDate.format('YYYY-MM-DD') : '',
    };
    console.log(values);
    dispatch({
        type: 'chartType/queryData',
        payload: values,
    });
  };

  handleReset = () => {
    this.props.form.resetFields();
    const { dispatch } = this.props;
    dispatch({
        type: 'chartType/initial',
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { typeIdList, typeNameList } = this.props;
    return (
      <Form layout="inline" className="ant-advanced-search-form" >
        <Form.Item label="创建时间">{getFieldDecorator('createDate')(<DatePicker showTime allowClear format="YYYY-MM-DD" />)}
        </Form.Item>
        <Form.Item label="类型编号">{getFieldDecorator('typeId')(<Select placeholder="请输入类型编号"
                   showSearch
                   allowClear
                   style={{ width: 150 }}
                   optionFilterProp="children"
                   filterOption={(input, option) =>
                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }>{
                    typeIdList.map(item => (
                            <Option key={item}
                                    value={item}
                            >{item}</Option>
                        ))
                    }</Select>)}
        </Form.Item>
        <Form.Item label="类型名称">{getFieldDecorator('typeName')(<Select placeholder="请选择类型名称"
                   showSearch
                   allowClear
                   style={{ width: 150 }}
                   optionFilterProp="children"
                   filterOption={(input, option) =>
                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }>{
                    typeNameList.map(item => (
                            <Option key={item}
                                    value={item}
                            >{item}</Option>
                        ))
                    }</Select>)}
        </Form.Item>
        <Form.Item>
            <Button type="primary" onClick={this.handleSave}>查询</Button>
        </Form.Item>
        <Form.Item>
            <Button onClick={this.handleReset}>重置</Button>
        </Form.Item>
      </Form>
    );
  }
}

export default Filter;
