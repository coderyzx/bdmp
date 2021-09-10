import React from 'react';
import { Input, Row, Col, Select } from 'antd';
import styles from './index.less';

const { TextArea } = Input;

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

  renderInput = data => {
    const { id, label, inputType, field } = data;
    let curInput = null;
    let node = null;
    switch (inputType) {
      case 'input':
        curInput = <Input
          onChange={e => { this.inputChange(field, e.target.value) }} />
        break;
      case 'select':
        curInput = <Select style={{ width: '100%' }} />
        break;
      case 'textarea':
        curInput = <TextArea
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

      contentWrap = <div className={styles.contentWrap}>{items}</div>
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
