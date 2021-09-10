import React from 'react';
import { connect } from 'dva'
import { Modal, Form, Input, Select } from 'antd';

const { TextArea } = Input;
const { Option } = Select;

@connect(({ chartModel }) => (
  {
    chartTypeName: chartModel.chartTypeName,
  }),
)
class Create extends React.Component {
  componentDidMount () {
    const { dispatch } = this.props;
    dispatch({
      type: 'chartModel/getChartTypeName',
      payload: {},
    });
  }
  // onChange(value) {
  //   console.log(`selected ${value}`);
  // }
  // onBlur() {
  //   console.log('blur');
  // }
  // onFocus() {
  //   console.log('focus');
  // }
  // onSearch(val) {
  //   console.log('search:', val);
  // }

  render() {
    const { visible, onCancel, onCreate, form } = this.props;
    const { getFieldDecorator } = form;
    const { chartTypeName } = this.props;
    // console.log(chartTypeName);
    return (
      <Modal
        visible={visible}
        title="新增图表"
        okText="确定"
        onCancel={onCancel}
        onOk={onCreate}
        destroyOnClose= "true"
      >
        <Form layout="vertical">
          <Form.Item label="图表类型">
            {getFieldDecorator('typename', {
              rules: [{ required: true, message: '请输入图表类型!' }],
            })(
              <Select
              showSearch
              style={{ width: 200 }}
              placeholder="选择一个类型"
              optionFilterProp="children"
              onChange={this.onChange}
              onFocus={this.onFocus}
              onBlur={this.onBlur}
              onSearch={this.onSearch}
              filterOption={(input, option) =>
                option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
              >
                {
                  chartTypeName.length ?
                  (chartTypeName || []).map(item => (
                    <Option key={item} value={item}>{item}</Option>
                  ))
                  : null
                }
              </Select>,
            )}
          </Form.Item>
          <Form.Item label="图表名称">
            {getFieldDecorator('title', {
              rules: [{ required: true, message: '请输入图表名称!' }],
            })(<Input type="textarea" />)}
          </Form.Item>
          <Form.Item label="图表option">
            {getFieldDecorator('optionjson', {
              rules: [{ required: true, message: '请输入图表option!' }],
            })(<TextArea rows={4} placeholder="输入图表的option" />)}
          </Form.Item>
        </Form>
      </Modal>
    );
  }
}
const CreateChart = Form.create({ name: 'form_in_modal' })(Create);

export default CreateChart;
