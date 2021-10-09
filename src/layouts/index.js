import React from 'react';
import { Layout, Menu, Icon, Tooltip, Button } from 'antd';
import router from 'umi/router';
import backgroundImg from '@/assets/bigdata.png';
import styles from './index.less';

const { Header } = Layout;

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
    value: 1,
    path: '/dashBoard',
    title: '仪表盘',
  },
  {
    value: 2,
    path: '/templateLib',
    title: '模板库',
  },
  {
    value: 3,
    path: '/metaData',
    title: '元数据管理',
  },
  {
    value: 4,
    path: '/evaluReport',
    title: '测评报告',
  },
  {
    value: 5,
    path: '/dataProcessing',
    title: '数据加工厂',
  },
];

class BasicLayout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // selectedKeys: [],
    }
    this.option = this.getPropsKey(props);
  }

  componentWillMount () {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
    }
  }

  componentWillReceiveProps(nextProps) {
    // 监听路由参数变化，重新渲染
    if (nextProps.location.pathname !== this.props.location.pathname) {
      this.option = this.getPropsKey(nextProps)
    }
  }

  handleLogout = path => {
    localStorage.removeItem('token');
    router.push(path);
  }

  getPropsKey = props => {
    const { location } = props;
    let key; let index;
    titleList.forEach(item => {
      if (location.pathname === item.path || location.pathname.includes(item.path)) {
        // key = $i
        key = item.value
      }
    });
    let defaultOpenKeys; let defaultSelectedKeys;
    if (key !== undefined) {
        defaultOpenKeys = `sub${key}`;
    }
    if (index !== undefined) {
      defaultSelectedKeys = `subitem${key}${index}`;
    }
    return {
      defaultOpenKeys: defaultOpenKeys || '',
      defaultSelectedKeys: defaultSelectedKeys || '',
    }
  }

  render() {
    // const { selectedKeys } = this.state;
    const { history } = this.props;
    const { defaultSelectedKeys, defaultOpenKeys } = this.option;
    const defaultSelect = {};
    if (defaultSelectedKeys) {
      defaultSelect.defaultOpenKeys = [defaultOpenKeys];
      defaultSelect.defaultSelectedKeys = [defaultSelectedKeys];
      defaultSelect.selectable = [defaultOpenKeys];
      defaultSelect.selectedKeys = [defaultSelectedKeys];
    } else {
      defaultSelect.defaultSelectedKeys = [defaultOpenKeys];
      defaultSelect.selectedKeys = [defaultOpenKeys];
    }
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
          theme= "dark"
          mode="horizontal"
          {...defaultSelect}
          style={{ lineHeight: '64px', fontSize: '18px' }}
          >
            {
              titleList.map(item => (
                <Menu.Item key={`sub${item.value}`} onClick={() => history.push(item.path)}>
                  {item.title}
                </Menu.Item>
              ))
            }
          </Menu>
          <span>
            {
              text.map(item => (
                <Tooltip placement="bottom" title={item.text} key={item.key} >
                  <Button style={{ posititon: 'absolute', float: 'right', top: -50, marginRight: 30 }}
                    onClick={item.key === 1 ?
                    () => this.handleLogout(item.path) : () => router.push(item.path)}>
                    <Icon type={item.type} />
                    {item.title}
                  </Button>
                </Tooltip>
              ))
            }
          </span>
        </Header>
        <Layout style={{ paddingTop: 67, backgroundColor: 'white' }}>
          { this.props.children }
        </Layout>
      </Layout>

    );
  }
}
export default BasicLayout;
