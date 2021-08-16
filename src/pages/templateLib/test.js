import React from 'react';
import { connect } from 'dva';
import { Layout, Menu, Icon } from 'antd';
import Link from 'umi/link'

const { Sider } = Layout;
const { SubMenu } = Menu;
@connect(({ chartModel }) => (
  {
    chartMenu: chartModel.chartMenu,
  }),
)
class SiderMenu extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'chartModel/getChartMenu',
      payload: {},
    });
  }

  render() {
    const { children, chartMenu } = this.props;
    return (
      <>
        <Sider
          style={{
            overflow: 'auto',
            height: '100vh',
            position: 'fixed',
            // background: '#fff',
            left: 0,
          }}>
          <Menu
            theme="dark"
            mode="inline"
            style={{ height: '100%' }}
            defaultSelectedKeys={['1']}
            defaultOpenKeys = {['sub1']}
          >
            {
              chartMenu.map(item => (
                item.child.length ?
                  <SubMenu
                  key={item.id}
                  title={
                    <span>
                      <Icon type={item.icon} />
                      <span>{item.name}</span>
                    </span>
                  }
                  >
                    {
                    item.child.map(child => (
                      <Menu.Item key={child.id} >
                        <Link to={child.path}>
                          <Icon type={child.icon} />
                          <span>{child.name}</span>
                        </Link>
                      </Menu.Item>
                    ))}
                  </SubMenu>
                :
                  <Menu.Item key={item.id} >
                    <Link to={item.path} >
                      <Icon type={item.icon} />
                      <span>{item.name}</span>
                    </Link>
                  </Menu.Item>
              ))
            }
          </Menu>
        </Sider>
        <Layout style={{ padding: 14, marginLeft: '200px', overflow: 'initial' }}>
          {children }
        </Layout>
      </>
    )
  }
}
export default SiderMenu;
