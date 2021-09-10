import React from 'react';
import { connect } from 'dva';
import { Layout, Menu, Icon, notification } from 'antd';
import router from 'umi/router';
import { openNotificationLocal } from '@/utils/notification';

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
      callback: res => {
        if (res === 401 || res === 403 || res === 404) {
          openNotificationLocal(res);
        } else if (res.status === 500 || res.status === 404) {
          notification.open({
            message: '读取图表失败',
            description:
              `报错${res.status}, 暂时没有图表类型，服务未找到，请稍后再来`,
            icon: <Icon type="smile" rotate={180} theme="twoTone" twoToneColor="#108ee9" />,
            duration: 5,
          })
        }
      },
    });
  }

  render() {
    const { children, chartType } = this.props;
    const menu = [
      {
        key: '1',
        type: 'form',
        title: '菜单页面维护',
        path: '/templateLib/menuPage',
      },
      {
        key: '2',
        type: 'form',
        title: '图表类型管理',
        path: '/templateLib/chartType',
      },
      {
        key: '3',
        type: 'form',
        title: '字典',
        path: '/templateLib/dictionary',
      },
      {
        key: '4',
        type: 'form',
        title: 'form表单管理',
        path: '/templateLib/form',
      },
      {
        key: '5',
        type: 'tool',
        title: '工具栏列表',
        path: '/templateLib/toolBar',
      },
      {
        key: '6',
        type: 'desktop',
        title: '大屏配置',
        path: '/templateLib/largeScreen',
      },
      // {
      //   key: '7',
      //   type: 'area-chart',
      //   title: '大屏配置',
      //   path: '/templateLib/largeScreen',
      // },
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
                <Menu.Item key={item.key} onClick={() => router.push(item.path)}>
                  <Icon type= { item.type } /><span>{item.title} </span>
                </Menu.Item>
              ))
            }
            <SubMenu
              key="7"
              title={
                <span>
                  <Icon type="area-chart"/>
                  <span>图表组件管理</span>
                </span>
              }
            >
              {
                chartType.status === 404 ?
                  <Menu.Item key="sub1"
                  onClick={() => router.push('/templateLib/chart')}
                  >
                    <span>暂无图表类型</span>
                  </Menu.Item>
                :
                chartType.map(item => (
                  <Menu.Item key={item.id + item.typeId + item.typeIcon}
                  onClick={() => router.push(`/templateLib/chart?typeName=${item.typeName}`)}
                  >
                    <Icon type={item.typeIcon} />
                    <span>{item.typeName}</span>
                  </Menu.Item>
                ))
              }
            </SubMenu>
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
