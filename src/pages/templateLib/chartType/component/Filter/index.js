import React, { Component } from 'react';
import { Form, Button, DatePicker, Select } from 'antd';
import { queryData } from '@/services/chartType';

const { Option } = Select;
@Form.create({ name: 'filter' })
class Filter extends Component {
  handleSave = async e => {
    e.preventDefault();
    const fieldValues = this.props.form.getFieldsValue();
    const values = {
        ...fieldValues,
        createDate: fieldValues.createDate ? fieldValues.createDate.format('YYYY-MM-DD') : '',
    };
    const resp = await queryData({ ...values, pageSize: 10, currentPage: 1 });
    const { typeIdList, typeNameList } = this.props;
    await this.props.filterData(resp, typeIdList, typeNameList);
  };

  handleReset = async () => {
    this.props.form.resetFields();
    await this.props.initial();
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { typeIdList, typeNameList, loadingFilter } = this.props;
    return (
      <Form layout="inline" className="ant-advanced-search-form" >
        <Form.Item label="创建时间">{getFieldDecorator('createDate')(<DatePicker showTime allowClear format="YYYY-MM-DD" />)}
        </Form.Item>
        <Form.Item label="类型编号">{getFieldDecorator('typeId')(<Select placeholder="请输入类型编号"
                   showSearch
                   allowClear
                   loading={loadingFilter}
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
        <Form.Item label="类型名称">{getFieldDecorator('typeName')(<Select placeholder="请选择类型名称"
                   showSearch
                   allowClear
                   loading={loadingFilter}
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
            <Button type="primary" onClick={this.handleSave}>
              <i className="iconfont icon-chaxun">查询</i>
            </Button>
        </Form.Item>
        <Form.Item>
            <Button onClick={this.handleReset}>
              <i className="iconfont icon-zhongzhi">重置</i>
            </Button>
        </Form.Item>
      </Form>
    );
  }
}

export default Filter;
