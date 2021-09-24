/**
 * component 指向的路由组件文件是从 src/pages 目录开始解析的
 */
const routes = [
  {
    path: '/login',
    component: './login',
  },
  {
    path: '/',
    component: '../layouts',
    routes: [
      {
        path: '/',
        component: './Wellcome',
      },
      {
        path: '/templateLib',
        component: './TemplateLib',
        routes: [
          {
            path: '/templateLib',
            component: './TemplateLib/MenuPage',
          },
           // 默认打开模板库展示菜单页面维护
          {
            path: '/templateLib/menuPage',
            component: './TemplateLib/MenuPage',
          },
          // 图表类型
          {
            path: '/templateLib/typeChart',
            component: './TemplateLib/ChartType',
          },
          // 图表组件
          {
            path: '/templateLib/chart',
            component: './TemplateLib/Chart',
          },
           // 字典
          {
            path: '/templateLib/dictionary',
            component: './TemplateLib/Dictionary',
          },
          //仪表盘管理
          {
            path: '/templateLib/dashBoard',
            component: './DashBoardManagement',
          },
          {
            path: '/templateLib/form',
            component: './TemplateLib/Form',
          },
          {
            path: '/templateLib/toolBar',
            component: './TemplateLib/ToolBar',
          },
          {
            path: '/templateLib/largeScreen',
            component: './TemplateLib/LargeScreen',
          },
        ],
      },
       //仪表盘展示
      {
        path: '/dashBoard',
        component: './DashBoard',
      },
      {
        path: '/editor',
        component: './Editor',
      },
      {
        path: '/metaData',
        component: './MetaData',
      },
      {
        path: '/evaluReport',
        component: './EvaluReport',
      },
      {
        path: '/dataProcessing',
        component: './DataProcessing',
      },
    ],

  },
  {
    component: './404',
  },

]

export default routes;
