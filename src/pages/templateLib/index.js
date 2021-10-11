import React from 'react';
import { connect } from 'dva';
import { Layout, Menu, Icon, notification } from 'antd';
import router from 'umi/router';
// import dele from '@/assets/logo.png';
import styles from './index.less';

const { Sider } = Layout;
const { SubMenu } = Menu;

const menu = [
  {
    value: '1',
    type: 'menu',
    title: '菜单页面管理',
    path: '/templateLib/menuPage',
  },
  {
    value: '2',
    type: 'table',
    title: '图表类型管理',
    path: '/templateLib/typeChart',
  },
  {
    value: '3',
    type: 'area-chart',
    title: '图表组件管理',
    path: '/templateLib/chart',
  },
  {
    value: '4',
    type: 'folder',
    title: '字典',
    path: '/templateLib/dictionary',
  },
  {
    value: '5',
    type: 'dashboard',
    title: '仪表盘管理',
    path: '/templateLib/dashBoard',
  },
  {
    value: '6',
    type: 'form',
    title: 'form表单管理',
    path: '/templateLib/form',
  },
  {
    value: '7',
    type: 'tool',
    title: '工具栏列表',
    path: '/templateLib/toolBar',
  },
  {
    value: '8',
    type: 'desktop',
    title: '大屏配置',
    path: '/templateLib/largeScreen',
  },
];

@connect(({ chartModel }) => (
  {
    chartType: chartModel.chartType,
  }),
)
class TemplateLib extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // selectedKeys: ['1'],
      // openKeys: [],
    }
    this.option = this.getPropsKey(props);
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'chartModel/getChartType',
      payload: {},
      callback: () => {
        notification.open({
          message: '读取图表类型信息失败',
          description: '报错, 暂时没有图表类型，请求失败，服务未找到',
          icon: <Icon type="smile" rotate={180} theme="twoTone" twoToneColor="#108ee9" />,
        })
      },
    });
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.location.query.typeName) {
      this.option = this.getPropsKey(nextProps)
    } else if (nextProps.location.pathname !== this.props.location.pathname) {
      this.option = this.getPropsKey(nextProps)
    }
  }

  getPropsKey = props => {
    const { location } = props;
    const { chartType } = this.props;
    let key; let index;
    menu.forEach(item => {
      if (location.query.typeName) {
        chartType.forEach(sub => {
          if (location.query.typeName === sub.typeName ||
          location.query.typeName.includes(sub.typeName)) {
            key = '3';
            index = sub.id
          }
        });
      } else if (location.pathname === item.path || location.pathname.includes(item.path)) {
        key = item.value
      } else if (location.pathname === '/templateLib') {
        key = '1'
      }
    });
    let defaultOpenKeys; let defaultSelectedKeys;
    if (key !== undefined) {
      defaultOpenKeys = `subChart${key}`;
    }
    if (index !== undefined) {
      // defaultOpenKeys = 'subChart3';
      defaultSelectedKeys = `subitemChart${index}`;
    }
    return {
      defaultOpenKeys: defaultOpenKeys || '',
      defaultSelectedKeys: defaultSelectedKeys || '',
    }
  }
  // const { dispatch } = this.props;
  // dispatch({
  //   type: 'chartModel/getChartType',
  //   payload: {},
  //   callback: () => {
  //     notification.open({
  //       message: '读取图表类型信息失败',
  //       description: '报错, 暂时没有图表类型，请求失败，服务未找到',
  //       icon: <Icon type="smile" rotate={180} theme="twoTone" twoToneColor="#108ee9" />,
  //     })
  //   },
  // });

  render() {
    const { children, chartType } = this.props;
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
      <>
        <Sider
          style={{
            overflow: 'auto',
            height: '100vh',
            position: 'fixed',
            background: '#fff',
            // background: 'black',
            zIndex: 10,
            left: 0,
          }}>
          <Menu
            // theme='dark'
            // mode="vertical"
            mode="inline"
            style={{ height: '100%' }}
            // defaultSelectedKeys={['1']}
            // selectedKeys ={selectedKeys}
            {...defaultSelect}
          >
            {
              menu.map(item => (
                item.title === '图表组件管理' ?
                  <SubMenu
                  key={`subChart${item.value}`}
                  title={
                    <span>
                      <Icon type={ item.type }/>
                      <span style={{ fontSize: 16 }}>{item.title}</span>
                    </span>
                  }
                  >
                    {
                      chartType ?
                        chartType.map(itemChart => (
                          itemChart.typeName &&
                          <Menu.Item key={`subitemChart${itemChart.id}`}
                          onClick={() => router.push(`/templateLib/chart?typeName=${itemChart.typeName}`)}
                          style={{ display: 'flex', alignItems: 'center', fontSize: 16 }}
                          >
                            {/* <Icon type={itemChart.typeIcon} /> */}
                            <img src={itemChart.typeIcon} alt="404" style={{ height: 20, width: 20, marginRight: 8 }} />
                            <span className={styles.typeName}>{itemChart.typeName}</span>
                          </Menu.Item>
                        ))
                      :
                        <Menu.Item key="sub1"
                        onClick={() => router.push(item.path)}
                        >
                          <span>暂无图表类型</span>
                        </Menu.Item>
                    }
                  </SubMenu>
                :
                  <Menu.Item key={`subChart${item.value}`} onClick={() => router.push(item.path)}
                  style={{ fontSize: 16 }}
                  >
                    <Icon type= { item.type } /><span>{item.title} </span>
                  </Menu.Item>
              ))
            }
          </Menu>
        </Sider>
        <Layout style={{
          padding: '0 15px',
          marginLeft: '200px',
          minHeight: 'calc(100vh - 67px)',
          background: '#fff' }}
        >
          {children}
        </Layout>
      </>
    )
  }
}
export default TemplateLib;
