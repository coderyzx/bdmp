import React from 'react';
import { Layout, Menu, Icon, Tooltip, Button } from 'antd';
import router from 'umi/router';
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
          style={{ lineHeight: '64px', fontSize: '18px' }}
          >
            <Menu.Item key="1" onClick={() =>(router.push('/dashBoard'))}> 仪表盘</Menu.Item>
            <Menu.Item key="2" onClick={() =>(router.push('/templateLib'))}> 模板库</Menu.Item>
            <Menu.Item key="3" onClick={() =>(router.push('/metaData'))}> 元数据管理</Menu.Item>
            <Menu.Item key="4" onClick={() =>(router.push('/evaluReport'))}> 测评报告</Menu.Item>
            <Menu.Item key="5" onClick={() =>(router.push('/dataProcessing'))}> 数据加工厂</Menu.Item>
          </Menu>
          <span>
              <Tooltip placement="bottom" title={text.text3} >
                <Button style={{ posititon:'absolute' ,float: 'right', top:-50,marginRight: 30 }}  onClick={() =>(router.push('/login'))}>
                  <Icon type="login" />
                  exit
                </Button>
              </Tooltip>
              <Tooltip placement="bottom" title={text.text2} >
                <Button style={{ posititon:'absolute' ,float: 'right',  top:-50,marginRight: 10 }} onClick={() =>(router.push('/'))}>
                  <Icon type="home" />
                  home
                </Button>
              </Tooltip>
              <Tooltip placement="bottom" title={text.text1} >
                <Button style={{ posititon:'absolute' ,float: 'right', top:-50, marginRight: 10 }} onClick={() =>(router.push('/user'))} >
                  <Icon type="user" />
                  user
                </Button>
              </Tooltip>
          </span>
        </Header>
        <Layout  style={{marginTop:67}}>
          { this.props.children }
        </Layout>
      </Layout>

    );
  }
}
export default BasicLayout;
