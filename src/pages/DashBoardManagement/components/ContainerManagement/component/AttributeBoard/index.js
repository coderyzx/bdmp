import React from 'react';
import { Input, Row, Col, Select, Button } from 'antd';
import styles from './index.less';

const { TextArea } = Input;
const { Option } = Select;

class AttributeBoard extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { currentMenu, currentContent } = prevState;
    return {
      currentMenu: currentMenu || nextProps.menus[0].title,
      currentContent: currentContent || nextProps.menus[0].children,
      ...nextProps,
    }
  }

  componentDidMount () {
  }

  onMenuChange = (title, children) => {
    this.setState({
      currentMenu: title,
      currentContent: children,
    })
  }

  renderMenu = () => {
    const { menus, currentMenu } = this.state;
    let content = null;
    if (menus && menus.length) {
      const menuItems = [];
      menus.forEach(item => {
        const { title, children } = item;
        const classNames = [styles.item];
        if (currentMenu === title) {
          classNames.push(styles.active);
        }
        menuItems.push(
          <span
            key={title}
            className={classNames.join(' ')}
            onClick={() => { this.onMenuChange(title, children) }}
          >
            {title}
          </span>,
        )
      });
      const menuWrap = <div className={styles.menuWrap}>{menuItems}</div>;
      content = menuWrap;
    }

    return content;
  }

  renderLabel = (id, label, curInput) => (
    <Row key={id} className={styles.item} gutter={24}>
      <Col span={8} className={styles.label}>{label}：</Col>
      <Col span={16} className={styles.curInput}>
        {curInput}
      </Col>
    </Row>
  )

  inputChange = (field, value) => {
    const { onChange } = this.props;
    onChange(field, value);
  }

  input = (field, value) => {
    const { onChange } = this.props;
    const { dataLink } = this.props;
    (dataLink || []).forEach(item => {
      if (item.title === value) {
        const { id } = item;
        onChange(field, id);
      }
    })
  }

  handleClick = () => {
    const { handleComfirm } = this.props;
    handleComfirm();
  }

  renderTitle = () => {
    const { dataSelf, dataLink } = this.props;
    let res;
    (dataLink || []).forEach(item => {
      if (item.id === dataSelf.type) {
        res = item.title;
      }
    })
    return res;
  }

  renderInput = data => {
    const { id, label, inputType, field } = data;
    const { dataLink, dataSelf } = this.props;
    const { style } = dataSelf;
    const text = this.renderTitle();
    let curInput = null;
    let node = null;
    switch (inputType) {
      case 'input':
        curInput = <Input
          onChange={e => { this.inputChange(field, e.target.value) }} />
        break;
      case 'select':
        curInput = <Select
          style={{ width: '100%' }}
          defaultValue={id === '数据关联' && text}
          showSearch
          placeholder="请选择数据关联图表"
          optionFilterProp="children"
          filterOption={(input, option) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
          onChange={e => { this.input(field, e) }}
        >
          {
            (dataLink || []).map(item => (
              item.id !== dataSelf.id &&
              <Option key={item.id} value={item.title}>
                {item.title}
              </Option>
            ))
          }
          </Select>
        break;
      case 'textarea':
        curInput = <TextArea
          defaultValue ={id === '数据源' && style}
          onChange={e => { this.inputChange(field, e.target.value) }}
          style={{ height: '120px' }}
        />
        break;
      default:
        break;
    }
    if (label) {
      node = this.renderLabel(id, label, curInput);
    }

    return node;
  }

  renderContent = () => {
    const { currentContent } = this.state;
    let contentWrap = null;
    if (currentContent && currentContent.length) {
      const items = [];
      currentContent.forEach(item => {
        items.push(this.renderInput(item));
      });

      contentWrap = <div className={styles.contentWrap}>
        {items}
        <div style= {{ display: 'flex', justifyContent: 'center', marginTop: 50 }}>
          <Button
            onClick={this.handleClick}
            style={{ width: '35%' }}
            type="primary"
          >
            确定
          </Button>
        </div>
        </div>
    }

    return contentWrap;
  }

  render () {
    const menuNode = this.renderMenu();
    const contentNode = this.renderContent();
    return (
      <div className={styles.attributeBoardWrap}>
        {menuNode}
        {contentNode}
      </div>
    )
  }
}

export default AttributeBoard;
