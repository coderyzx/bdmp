import React from 'react';
import { connect } from 'dva';
import { Layout, Menu, Icon } from 'antd';
import Link from 'umi/link'
import router from 'umi/router';
const { Sider } = Layout;
const { SubMenu } = Menu;

@connect(({ chartModel }) => (
  {
    chartType: chartModel.chartType,
  }),
)
class TemplateLib extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'chartModel/getChartType',
      payload: {},
    });
  }
  render() {
    const { children,chartType } = this.props;
    // console.log(chartType);
    return (
      <>
        <Sider
          style={{
            overflow: 'auto',
            height: '100vh',
            position: 'fixed',
            background: '#fff',
            // background: 'black',
            zIndex:10,
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
              {
                // <div>heleo</div>
                chartType.map(item => (
                  <Menu.Item key={item.typeId} 
                  onClick={() => router.push(`/templateLib/chart?typeName=${item.typeName}`)}
                  >
                    <Icon type={item.typeIcon} />
                    <span>{item.typeName}</span>
                  </Menu.Item>
                ))
              }
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
        <Layout style={{ 
          padding: '0 15px', marginLeft: '200px',
           minHeight: 'calc(100vh - 67px)', background: '#fff',}}>
          {children}
        </Layout>
      </>
    )
  }
}
export default TemplateLib;
