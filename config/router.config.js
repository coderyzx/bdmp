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
        component: './wellcome',
      },
      {
        path: '/templateLib',
        component: './templateLib',
        routes: [
          {
            path: '/templateLib',
            component: './templateLib/menuPage',
          },
           // 默认打开模板库展示菜单页面维护
          {
            path: '/templateLib/menuPage',
            component: './templateLib/menuPage',
          },
          // 图表类型
          {
            path: '/templateLib/chartType',
            component: './templateLib/chartType',
          },
          // 图表组件
          {
            path: '/templateLib/lineChart',
            component: './templateLib/chart/lineChart.js',
          },
          {
            path: '/templateLib/barChart',
            component: './templateLib/chart/barChart.js',
          },
          {
            path: '/templateLib/pieChart',
            component: './templateLib/chart/pieChart.js',
          },
          {
            path: '/templateLib/radarChart',
            component: './templateLib/chart/radarChart.js',
          },
           // 字典
          {
            path: '/templateLib/dictionary',
            component: './templateLib/dictionary',
          },
          {
            path: '/templateLib/form',
            component: './templateLib/form',
          },
          {
            path: '/templateLib/toolBar',
            component: './templateLib/toolBar',
          },
          {
            path: '/templateLib/largeScreen',
            component: './templateLib/largeScreen',
          },
        ],
      },
      {
        path: '/dashBoard',
        component: './dashBoard',
      },
      {
        path: '/editor/:id',
        component: './editor',
      },
      {
        path: '/metaData',
        component: './metaData',
      },
      {
        path: '/evaluReport',
        component: './evaluReport',
      },
      {
        path: '/dataProcessing',
        component: './dataProcessing',
      },   
    ],

  },
  {
    component: './404',
  },

]

export default routes;

