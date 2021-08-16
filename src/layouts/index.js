import React from 'react';
import { Layout, Menu, Icon, Tooltip, Button } from 'antd';
import Link from 'umi/link';
import backgroundImg from '../assets/logo.png';
import styles from './index.less';

const { Header } = Layout;

// eslint-disable-next-line react/prefer-stateless-function
class BasicLayout extends React.Component {
  render() {
    const text = {
      text1: <span>个人中心</span>,
      text2: <span>主页</span>,
      text3: <span>退出</span>,
    };
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
          <div className={styles.logo}>
            <a href="https://echarts.apache.org/zh/index.html">
              <img src={backgroundImg} alt="BDMP logo" />
              <div className={styles.title}>
                BDMP
              </div>
            </a>
          </div>
          <Menu
          // theme='dark'
          mode="horizontal"
          // defaultSelectedKeys={['1']}
          style={{ lineHeight: '64px' }}
          >
            <Menu.Item key="1"><Link to="/dashBoard">仪表盘</Link></Menu.Item>
            <Menu.Item key="2"><Link to="/templateLib">模板库</Link></Menu.Item>
            <Menu.Item key="3"><Link to="/metaData">元数据管理</Link></Menu.Item>
            <Menu.Item key="4"><Link to="/evaluReport">测评报告</Link></Menu.Item>
            <Menu.Item key="5"><Link to="/dataProcessing">数据加工厂</Link></Menu.Item>
            <Link to="/login" >
              <Tooltip placement="bottom" title={text.text3} >
                <Button style={{ float: 'right', margin: '17px 30px 17px 0' }}>
                  <Icon type="login" />
                  exit
                </Button>
              </Tooltip>
            </Link>
            <Link to="/" >
              <Tooltip placement="bottom" title={text.text2} >
                <Button style={{ float: 'right', margin: '17px 10px 17px 0' }}>
                  <Icon type="home" />
                  home
                </Button>
              </Tooltip>
            </Link>
            <Link to="/user" >
              <Tooltip placement="bottom" title={text.text1} >
                <Button style={{ float: 'right', margin: '17px 10px 17px 0' }}>
                  <Icon type="user" />
                  user
                </Button>
              </Tooltip>
            </Link>
          </Menu>
        </Header>
        <Layout style={{ marginTop: 67 }}>
          { this.props.children }
        </Layout>
      </Layout>

    );
  }
}
export default BasicLayout;
