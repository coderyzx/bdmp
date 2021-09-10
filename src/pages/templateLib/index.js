import React from 'react';
import { Layout, Menu, Icon } from 'antd';
import router from 'umi/router';

const { Sider } = Layout;
const { SubMenu } = Menu;
// eslint-disable-next-line react/prefer-stateless-function
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
            left: 0,
          }}>
          <Menu
            // theme='dark'
            mode="inline"
            style={{ height: '100%' }}
            defaultSelectedKeys={['1']}
            // defaultOpenKeys = {['1']}
          >
            <Menu.Item key="1" onClick={() => { router.push('/templateLib/menuPage') }}>
              <Icon type="form"/><span>菜单页面维护</span>
            </Menu.Item>
            <Menu.Item key="2" onClick={() => { router.push('/templateLib/chartType') }}>
              <Icon type="form"/><span>图表类型管理</span>
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
              <Menu.Item key="sub1" onClick={() => { router.push('/templateLib/lineChart') }}>
                <Icon type="line-chart" /><span>折线图</span>
              </Menu.Item>
              <Menu.Item key="sub2" onClick={() => { router.push('/templateLib/barChart') }}>
                <Icon type="bar-chart" /><span>柱状图</span>
              </Menu.Item>
              <Menu.Item key="sub3" onClick={() => { router.push('/templateLib/pieChart') }}>
                <Icon type="pie-chart" /><span>饼图</span>
              </Menu.Item>
              <Menu.Item key="sub4" onClick={() => { router.push('/templateLib/radarChart') }}>
                <Icon type="radar-chart" /><span>雷达图</span>
              </Menu.Item>
            </SubMenu>
            <Menu.Item key="4" onClick={() => { router.push('/templateLib/dictionary') }}>
              <Icon type="tool"/><span>字典</span>
            </Menu.Item>
            <Menu.Item key="5" onClick={() => { router.push('/templateLib/form') }}>
              <Icon type="tool"/><span>form表单管理</span>
            </Menu.Item>
            <Menu.Item key="6" onClick={() => { router.push('/templateLib/toolBar') }}>
              <Icon type="tool"/><span>工具栏列表</span>
            </Menu.Item>
            <Menu.Item key="7" onClick={() => { router.push('/templateLib/largeScreen') }}>
              <Icon type="desktop"/><span>大屏配置</span>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout style={{ padding: '0 15px', marginLeft: '200px', minHeight: 'calc(100vh - 67px)', backgroundColor: '#fff' }}>
          {children}
        </Layout>
      </>
    )
  }
}
export default TempLib;
