import React from 'react';
import { Layout, Menu, Icon, Tooltip, Button } from 'antd';
import router from 'umi/router';
import backgroundImg from '@/assets/bigdata.jpeg';
import styles from './index.less';

const { Header } = Layout;

// eslint-disable-next-line react/prefer-stateless-function
class BasicLayout extends React.Component {
  render() {
    const text = [
      {
        text: <span>登陆管理</span>,
        type: 'login',
        path: '/login',
        title: '退出',
        key: 1,
      },
      {
        text: <span>进入主页</span>,
        type: 'home',
        path: '/',
        title: '主页',
        key: 2,
      },
      {
        text: <span>个人中心</span>,
        type: 'user',
        path: '/user"',
        title: '个人',
        key: 3,
      },
    ];
    const titleList = [
      {
        key: 1,
        path: '/dashBoard',
        title: '仪表盘',
      },
      {
        key: 2,
        path: '/templateLib',
        title: '模板库',
      },
      {
        key: 3,
        path: '/metaData',
        title: '元数据管理',
      },
      {
        key: 4,
        path: '/evaluReport',
        title: '测评报告',
      },
      {
        key: 5,
        path: '/dataProcessing',
        title: '数据加工厂',
      },
    ];
    return (
      <Layout>
        <Header
        style={{
          position: 'fixed',
          zIndex: 1000,
          width: '100%',
          padding: 0,
          background: '#fff',
          boxShadow: ' 0 0 20px rgb(0 0 0 / 20%)',
        }}>
          <div className={styles.logoContainer}>
            <a href="#!">
              <img src={backgroundImg} alt="BDMP logo" />
              <div className={styles.title}>
                BDMP
              </div>
            </a>
          </div>
          <Menu
          // theme= "dark"
          mode="horizontal"
          // defaultSelectedKeys={['1']}
          style={{ lineHeight: '64px', fontSize: '18px' }}
          >
            {
              titleList.map(item => (
                <Menu.Item key={item.key} onClick={() => router.push(item.path)}>
                  {item.title}
                </Menu.Item>
              ))
            }
          </Menu>
          <span>
            {
              text.map(item => (
                <Tooltip placement="bottom" title={item.text} key={item.key} >
                  <Button style={{ posititon: 'absolute', float: 'right', top: -50, marginRight: 30 }} onClick={() => router.push(item.path)}>
                    <Icon type={item.type} />
                    {item.title}
                  </Button>
                </Tooltip>
              ))
            }
          </span>
        </Header>
        <Layout style={{ paddingTop: 67 }}>
          { this.props.children }
        </Layout>
      </Layout>

    );
  }
}
export default BasicLayout;
