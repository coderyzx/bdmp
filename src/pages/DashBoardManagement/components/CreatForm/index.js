import React from 'react';
import { Modal, Form, Input, Select, Button } from 'antd';
import { connect } from 'dva';

const { Option } = Select;

@connect(({ dashBoard }) => ({
  subMenuList: dashBoard.subMenuList,
}))
@Form.create({ name: 'form_in_dashBoard' })
class CreateForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // isParentLabel: true,
      // parentLabel: [],
    }
  }

  componentDidMount () {
    const { dispatch } = this.props;
    dispatch({
      type: 'dashBoard/getMenu',
    });
  }

  handleReset = () => {
    this.props.form.resetFields();
  };

  render() {
    const { visible, onCancel, onCreate, form, subMenuList, confirmLoading } = this.props;
    const { getFieldDecorator } = form;
    const list = [
      {
        title: '仪表盘名称',
        key: 'name',
      },
      {
        title: '业务主题场景',
        key: 'businessTheme',
      },
      {
        title: '创建人',
        key: 'createUserId',
      },
      {
        title: '关联菜单页面',
        key: 'classLabel',
      },
    ];
    return (
      <Modal
        visible={visible}
        title="创建仪表盘"
        // centered
        onCancel={onCancel}
        destroyOnClose
        width={700}
        footer={[
          <Button key="back" onClick={onCancel}>
            取消
          </Button>,
          <Button key="reset" type="danger" onClick={this.handleReset}>
            重置
          </Button>,
          <Button key="submit" type="primary" onClick={onCreate} loading={confirmLoading}>
            确定
          </Button>,
        ]}
      >
        <Form labelCol={{ span: 6 }} wrapperCol={{ span: 15 }} >
          {
            list.map(item => (
              item.title === '关联菜单页面' ?
              <Form.Item label={item.title} key={item.key}>
                {getFieldDecorator(`${item.key}`, {
                  rules: [{ required: true, message: `请选择${item.title}!` }],
                })(
                  <Select
                  showSearch
                  style={{ width: '100%' }}
                  placeholder={`请选择${item.title}`}
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                  >
                  {
                    (subMenuList || []).map(menu =>
                      <Option key={menu} value={menu}>
                        {menu}
                      </Option>,
                    )
                  }
                  </Select>,
                )}
              </Form.Item>
              :
              <Form.Item label={item.title} key={item.key}>
              {getFieldDecorator(`${item.key}`, {
                rules: [{ required: true, message: `请输入${item.title}!` },
                { whitespace: true }],
              })(<Input placeholder={`请输入${item.title}`} />)}
              </Form.Item>
            ))
          }
        </Form>
        <span style={{ color: 'green', fontSize: 16, margin: 50 }} >温馨提示：创建仪表盘后，请添加图表</span>
      </Modal>
    );
  }
}

export default CreateForm;
