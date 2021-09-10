import React from 'react';
import { connect } from 'dva'
import { Modal, Form, Input, Select } from 'antd';
// const { TextArea } = Input;
const { Option } = Select;

@connect(({ chartModel }) => (
  {
    chartTypeName: chartModel.chartTypeName,
  }),
)
class Editable extends React.Component {
  componentDidMount () {
    const { dispatch } = this.props;
    dispatch({
      type: 'chartModel/getChartTypeName',
      payload: {},
    });
  }

  render() {
    const { visible, onCancel, onCreate, form, editData } = this.props;
    const { getFieldDecorator } = form;
    const { chartTypeName } = this.props;
    // console.log(editData);
    return (
      <Modal
        visible={visible}
        title="编辑图表类型和名称"
        okText="确定"
        onCancel={onCancel}
        onOk={onCreate}
      >
        <Form layout="vertical">
          <Form.Item label="图表类型">
            {getFieldDecorator('typeName', {
              rules: [{ required: true, message: '请输入图表类型!' }],
              initialValue: editData.typename,
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
              initialValue: editData.title,
            })(<Input type="textarea" />)}
          </Form.Item>
        </Form>
      </Modal>
    );
  }
}
const EditableForm = Form.create({ name: 'form_in_modal' })(Editable);

export default EditableForm;
