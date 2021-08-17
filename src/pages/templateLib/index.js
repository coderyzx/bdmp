import React from 'react';
// import { connect } from 'dva';
import { Layout, Menu, Icon } from 'antd';
import Link from 'umi/link'

const { Sider } = Layout;
const { SubMenu } = Menu;
class TempLib extends React.Component {
  render() {
    const { children } = this.props;
    return (
      <>
        <Sider
          style={{
            overflow: 'auto',
            height: '100vh',
            position: 'fixed',
            background: '#fff',
            // background: 'black',
            left: 0,
          }}>
          <Menu
            // theme='dark'
            mode="inline"
            style={{ height: '100%' }}
            defaultSelectedKeys={['1']}
            // defaultOpenKeys = {['1']}
          >
            <Menu.Item key="1">
              <Link to="/templateLib/menuPage"><Icon type="form"/><span>菜单页面维护</span></Link>
            </Menu.Item>
            <Menu.Item key="2">
              <Link to="/templateLib/chartType"><Icon type="form"/><span>图表类型管理</span></Link>
            </Menu.Item>
            <SubMenu
            key="3"
            title={
              <span>
                <Icon type="area-chart"/>
                <span>图表组件管理</span>
              </span>
            }
            >
              <Menu.Item key="sub1" >
                <Link to ="/templateLib/lineChart"><Icon type="line-chart" /><span>折线图</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="sub2" >
                <Link to ="/templateLib/barChart"><Icon type="bar-chart" /><span>柱状图</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="sub3" >
                <Link to ="/templateLib/pieChart"><Icon type="pie-chart" /><span>饼图</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="sub4" >
                <Link to ="/templateLib/radarChart"><Icon type="radar-chart" /><span>雷达图</span>
                </Link>
              </Menu.Item>
            </SubMenu>
            <Menu.Item key="4">
              <Link to="/templateLib/dictionary"><Icon type="tool"/><span>字典</span></Link>
            </Menu.Item>
            <Menu.Item key="5">
              <Link to="/templateLib/form"><Icon type="tool"/><span>form表单管理</span></Link>
            </Menu.Item>
            <Menu.Item key="6">
              <Link to="/templateLib/toolBar"><Icon type="tool"/><span>工具栏列表</span></Link>
            </Menu.Item>
            <Menu.Item key="7">
              <Link to="/templateLib/largeScreen"><Icon type="desktop"/><span>大屏配置</span></Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout style={{ padding: 14, marginLeft: '200px', background: '#fff' }}>
          {children}
        </Layout>
      </>
    )
  }
}
export default TempLib;
