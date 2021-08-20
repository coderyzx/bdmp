import React from 'react';
import { Input, InputNumber, Form } from 'antd';

const EditableContext = React.createContext(); // 创建一个Context 默认值为空

class EditableCell extends React.Component {
  getInput = () => {
    if (this.props.inputType === 'number') {
      return <InputNumber />;
    }
    return <Input />;
  };

  renderCell = ({ getFieldDecorator }) => {
    const {
        editing,
        dataIndex,
        title,
        inputType,
        record,
        index,
        children,
        ...restProps
    } = this.props;
    console.log('editing: ', editing);

    return (
      <td {...restProps}>
        {editing ? (
          <Form.Item style={{ margin: 0 }}>
            {getFieldDecorator(dataIndex, {
              rules: [
                {
                  required: true,
                  message: `请选择内容 ${title}!`,
                },
              ],
              initialValue: record[dataIndex],
            })(this.getInput())}
          </Form.Item>
        ) : (
              children
            )}
      </td>
    );
  };

  render() {
      return (
        <EditableContext.Consumer>{this.renderCell}</EditableContext.Consumer>
      );
  }
}

export default EditableCell;
