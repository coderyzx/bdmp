import React from 'react';
import { Modal, Form, Input, Select, Button, notification } from 'antd';
import { connect } from 'dva';

const { Option } = Select;

@connect(({ dashBoard }) => ({
  subMenuList: dashBoard.subMenuList,
}))
@Form.create({ name: 'EditForm' })
class EditForm extends React.Component {
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
      callback: res => {
        if (res.code !== 'U000000') {
          const args = {
            message: '提示',
            description: '获取菜单失败',
          };
          notification.info(args);
        }
      },
    });
  }

  handleReset = () => {
    this.props.form.resetFields();
  };

  render() {
    const { visible, onCancel, onCreate, form, subMenuList, data } = this.props;
    const { getFieldDecorator } = form;
    const list = [
      {
        title: '仪表盘名称',
        key: 'name',
        value: data.name,
      },
      {
        title: '业务主题场景',
        key: 'businessTheme',
        value: data.businessTheme,
      },
      {
        title: '创建人',
        key: 'createUserId',
        value: data.createUserId,
      },
      {
        title: '关联菜单页面',
        key: 'classLabel',
        value: data.classLabel,
      },
      {
        title: '修改人',
        key: 'modifyUserId',
        value: data.modifyUserId,
      },
    ];
    return (
      <Modal
        visible={visible}
        title="修改仪表盘信息"
        width={700}
        onCancel={onCancel}
        destroyOnClose
        footer={[
          <Button key="back" onClick={onCancel}>
            取消
          </Button>,
          <Button key="reset" type="danger" onClick={this.handleReset}>
            重置
          </Button>,
          <Button key="submit" type="primary" onClick={onCreate}>
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
                  initialValue: item.value,
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
                initialValue: item.value,
              })(<Input placeholder={`请输入${item.title}`} />)}
              </Form.Item>
            ))
          }
        </Form>
      </Modal>
    );
  }
}

export default EditForm;
