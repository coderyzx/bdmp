import React from 'react';
import { Layout, Menu, Icon } from 'antd';

import styles from './index.less';

const { Header } = Layout;
const { Item } = Menu;

const GlobalHeader = props => {
  const { menus, curKey, toTarget } = props;
  const renderMenus = () => {
    if (menus && menus.length) {
      return menus.map(item => {
        const { path, children, link } = item;
        if (link) {
          return (
            <Item key={item.id}>
              <a href={link} target="_blank" rel="noopener noreferrer">{item.name}</a>
            </Item>
          );
        }
        return (
          <Item key={item.id} onClick={() => { toTarget(path, children[0].path) }}>
            <span>{item.name}</span>
          </Item>
        );
      });
    }

    return [];
  }

  const menusNodes = renderMenus();

  return (
    <Header className={styles.header}>
      <div className={styles.logo} />
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={[curKey]}
        style={{ backgroundColor: '#5063C2', color: '#fff' }}
      >
        {menusNodes}
      </Menu>
      <div className={styles.actionMenus}>
        <Icon type="home" style={{ width: '50px', height: '50px', color: '#fff', fontSize: '20px' }} />
        <Icon type="question-circle" style={{ width: '50px', height: '50px', color: '#fff', fontSize: '20px' }} />
      </div>
    </Header>
  )
}

export default GlobalHeader;
