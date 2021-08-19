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
            path: '/templateLib/chartType',
            component: './TemplateLib/ChartType',
          },
          // 图表组件
          {
            path: '/templateLib/lineChart',
            component: './TemplateLib/Chart/lineChart.js',
          },
          {
            path: '/templateLib/barChart',
            component: './TemplateLib/Chart/barChart.js',
          },
          {
            path: '/templateLib/pieChart',
            component: './TemplateLib/Chart/pieChart.js',
          },
          {
            path: '/templateLib/radarChart',
            component: './TemplateLib/Chart/radarChart.js',
          },
           // 字典
          {
            path: '/templateLib/dictionary',
            component: './TemplateLib/Dictionary',
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
      {
        path: '/dashBoard',
        component: './DashBoard',
      },
      {
        path: '/editor/:id',
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

