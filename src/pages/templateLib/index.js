import React from 'react';
import { connect } from 'dva';
import { Layout, Menu, Icon, notification } from 'antd';
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
      callback: () => {
        notification.open({
          message: '读取图表类型信息失败',
          description: '报错, 暂时没有图表类型，请求失败，服务未找到',
          icon: <Icon type="smile" rotate={180} theme="twoTone" twoToneColor="#108ee9" />,
        })
      },
    });
  }

  render() {
    const { children, chartType } = this.props;
    const menu = [
      {
        key: '1',
        type: 'menu',
        title: '菜单页面管理',
        path: '/templateLib/menuPage',
      },
      {
        key: '2',
        type: 'table',
        title: '图表类型管理',
        path: '/templateLib/chartType',
      },
      {
        key: '3',
        type: 'area-chart',
        title: '图表组件管理',
        path: '/templateLib/chart',
      },
      {
        key: '4',
        type: 'folder',
        title: '字典',
        path: '/templateLib/dictionary',
      },
      {
        key: '5',
        type: 'form',
        title: 'form表单管理',
        path: '/templateLib/form',
      },
      {
        key: '6',
        type: 'dashboard',
        title: '仪表盘管理',
        path: '/templateLib/dashBoard',
      },
      {
        key: '7',
        type: 'tool',
        title: '工具栏列表',
        path: '/templateLib/toolBar',
      },
      {
        key: '8',
        type: 'desktop',
        title: '大屏配置',
        path: '/templateLib/largeScreen',
      },
    ];
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
            mode="inline"
            style={{ height: '100%' }}
            defaultSelectedKeys={['1']}
            // defaultOpenKeys = {['1']}
          >
            {
              menu.map(item => (
                item.title === '图表组件管理' ?
                  <SubMenu
                  key={item.key}
                  title={
                    <span>
                      <Icon type={ item.type }/>
                      <span>{item.title}</span>
                    </span>
                  }
                >
                  {
                    chartType.status === 404 ?
                      <Menu.Item key="sub1"
                      onClick={() => router.push(item.path)}
                      >
                        <span>暂无图表类型</span>
                      </Menu.Item>
                    :
                    chartType.map(itemChart => (
                      <Menu.Item key={itemChart.id + itemChart.typeId }
                      onClick={() => router.push(`/templateLib/chart?typeName=${itemChart.typeName}`)}
                      >
                        <Icon type={itemChart.typeIcon} />
                        <span>{itemChart.typeName}</span>
                      </Menu.Item>
                    ))
                  }
                </SubMenu>
              :
                <Menu.Item key={item.key} onClick={() => router.push(item.path)}>
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
