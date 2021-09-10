import React, { Component } from 'react';
import { Form, Button, DatePicker, Select } from 'antd';
import { connect } from 'dva';

const { Option } = Select;
@connect(({ dict }) => ({
  typeIdList: dict.typeIdList,
  typeNameList: dict.typeNameList,
  }))
@Form.create({ name: 'advanced_search' })
class Filter extends Component {
  handleSave = e => {
    e.preventDefault();
    const { dispatch } = this.props;
    const fieldValues = this.props.form.getFieldsValue();
    const values = {
        ...fieldValues,
        create_datetime: fieldValues.create_datetime ? fieldValues.create_datetime.format('YYYY-MM-DD') : '',
    };
    console.log(values);
    dispatch({
        type: 'dict/queryData',
        payload: values,
    });
  };

  handleReset = () => {
    this.props.form.resetFields();
    const { dispatch } = this.props;
    dispatch({
        type: 'dict/initial',
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { typeIdList, typeNameList } = this.props;
    return (
      <Form layout="inline" className="ant-advanced-search-form" >
        <Form.Item label="创建时间">{getFieldDecorator('create_datetime')(<DatePicker showTime format="YYYY-MM-DD" />)}
        </Form.Item>
        <Form.Item label="字典编号">{getFieldDecorator('type_id')(<Select placeholder="请选择字典编号"
                   showSearch
                   style={{ width: 150 }}
                   optionFilterProp="children"
                   filterOption={(input, option) =>
                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }>{
                      typeIdList.map(item => (
                            <Option key={item} value={item}>{item}</Option>
                      ))
                    }</Select>)}
        </Form.Item>
        <Form.Item label="字典名称">{getFieldDecorator('type')(<Select placeholder="请选择字典名称"
                   showSearch
                   style={{ width: 150 }}
                   optionFilterProp="children"
                   filterOption={(input, option) =>
                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }>{
                      typeNameList.map(item => (
                            <Option key={item} value={item}>{item}</Option>
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
