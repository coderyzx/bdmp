import React from 'react';
import { Layout, Menu } from 'antd';

import styles from './index.less';

const { Sider } = Layout;
const { Item } = Menu;

const SiderMenus = props => {
  const { menus, curKey, toTarget } = props;
  const renderMenus = () => {
    if (menus && menus.length) {
      return menus.map(item => (
        <Item key={item.id} onClick={() => { toTarget(item.path) }}>
          <span>{item.name}</span>
        </Item>
      ));
    }

    return [];
  }

  const menusNodes = renderMenus();
  return (
    <Sider className={styles.siderWrap}>
      <div className="logo" />
      <Menu
        mode="inline"
        defaultSelectedKeys={[curKey]}
      >
        {menusNodes}
      </Menu>
    </Sider>
  )
}

export default SiderMenus;
