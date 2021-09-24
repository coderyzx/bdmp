
import React from 'react';

const page3 = [
  // {
  //   id: 'tNum',
  //   title: '页面访问次数',
  //   api: 'tNum',
  //   hasParams: true,
  //   span: 4,
  //   mock: {
  //     code: 'U000000',
  //     data: {
  //       user_cnt: '6,560',
  //       count: 56,
  //     },
  //   },
  //   chart: {
  //     mock: {
  //       title: '用户登录活跃走势',
  //       columns: ['2021-05-07', '2021-05-08', '2021-05-09', '2021-05-10', '2021-05-11'],
  //       data: [111, 144, 166, 188, 222],
  //       curType: 'bar',
  //       height: 50,
  //       ...lineDefualtConfing,
  //       yAxis: {
  //         show: false,
  //       },
  //     },
  //   },
  //   curType: 'card1',
  //   buttonText: '日均访问次数',
  // },
  // {
  //   id: 'oNum',
  //   title: '页面访问用户数',
  //   api: 'oNum',
  //   hasParams: true,
  //   span: 4,
  //   mock: {
  //     code: 'U000000',
  //     data: {
  //       user_cnt: '6,560',
  //       count: 74,
  //     },
  //   },
  //   chart: {
  //     mock: {
  //       title: '用户登录活跃走势',
  //       columns: ['2021-05-07', '2021-05-08', '2021-05-09', '2021-05-10', '2021-05-11'],
  //       data: [111, 144, 166, 188, 222],
  //       curType: 'bar',
  //       height: 50,
  //       ...lineDefualtConfing,
  //       yAxis: {
  //         show: false,
  //       },
  //     },
  //   },
  //   offsetSpan: 16,
  //   curType: 'card1',
  //   buttonText: '日均访问用户数',
  // },
  {
    id: 'pvSummary',
    title: '访问次数',
    api: 'pvSummary',
    hasParams: true,
    span: 4,
    chart: {
      curType: 'bar',
      height: 60,
      yAxis: {
        show: false,
      },
      unit: '次',
    },
    markPoint: false,
    markLine: 'off',
    curType: 'card1',
    buttonText: '最大访问量',
  },
  {
    id: 'pvSummary',
    align: 'center',
    api: 'pvSummary',
    title: '页面访问概览',
    relationApi: {
      api: 'rankByView',
      relationFieId: 'columns',
      outputFieId: 'tableData',
      connectionName: 'pvSummaryRankByView',
    },
    hasParams: true,
    curType: 'renderChildren',
    span: 24,
    // mock: {
    //   code: 'U000000',
    //   data: {
    //     chartData: {
    //       columns: ['2021-05-07', '2021-05-08', '2021-05-09', '2021-05-10', '2021-05-11'],
    //       data: [6140, 8561, 94, 8232, 8855],
    //       tableData: (() => {
    //         const result = [];
    //         for (let i = 0; i < 203; i += 1) {
    //           result.push({
    //             rank: i + 1,
    //             pageTitle: '工作台',
    //             pageUrl: '/home',
    //             clickNum: '2,234',
    //             userNum: '2,234',
    //           })
    //         }
    //         return result;
    //       })(),
    //     },
    //   },
    // },
    renderChildren: [
      {
        title: '页面访问次数趋势',
        curType: 'bar',
        span: 12,
        height: 388,
        help: '指定时间各应用的页面，被点击访问的次数，最小点击次数、最大点击次数、平均点击次',
        getDatas: {
          connectionName: 'pvSummaryRankByView',
          api: 'rankByView',
          relationFieId: 'columns',
          outputFieId: 'tableData',
          kit: 'formatOneDay',
          targetName: '',
        },
      },
      {
        curType: 'table',
        span: 12,
        title: '页面排名',
        help: '指定时间各应用的页面，被点击访问的次数、用户数排名',
        height: 388,
        columns: [
          {
            title: '排名',
            dataIndex: 'rankIndex',
            width: 80,
            key: 'rankIndex',
          },
          {
            title: '页面名称',
            dataIndex: 'title',
            key: 'title',
            width: 160,
            render: val => <div className="nobreak">{val}</div>,
          },
          {
            title: '页面URL',
            dataIndex: 'url',
            key: 'url',
            render: val => <div className="nobreak" title={val}>{val}</div>,
          },
          {
            title: '访问次数',
            dataIndex: 'pv',
            key: 'pv',
            width: 120,
            render: value => `${value} 次`,
          },
          {
            title: '用户数',
            dataIndex: 'user_cnt',
            key: 'user_cnt',
            width: 120,
            render: value => `${value} 人`,
          },
        ],
      },
    ],
  },
  {
    id: 'pageInfo',
    title: '页面访问情况',
    align: 'center',
    help: '指定时间各应用内的页面，作为入口页与出口页的点击次数、访问用户数、页面退出率。',
    api: 'pageInfo',
    hasParams: true,
    curType: 'table',
    filterNum: 2,
    filterName: 'url',
    columns: [
      {
        title: '应用名称',
        dataIndex: 'app_name',
        width: 120,
        key: 'app_name',
        render: val => val || '-',
      },
      {
        title: '页面名称',
        dataIndex: 'title',
        width: 120,
        key: 'title',
        render: val => val || '-',
      },
      {
        title: '页面地址',
        dataIndex: 'url',
        width: 500,
        key: 'url',
      },
      {
        title: '入口页-次数',
        dataIndex: 'enter_cnt',
        key: 'enter_cnt',
        render: text => `${text || 0}`,
        sorter: (a, b) => a.enter_cnt - b.enter_cnt,
      },
      {
        title: '入口页-用户数',
        dataIndex: 'enter_user_cnt',
        key: 'enter_user_cnt',
        render: text => `${text || 0}`,
        sorter: (a, b) => a.enter_user_cnt - b.enter_user_cnt,
      },
      {
        title: '出口页-次数',
        dataIndex: 'leave_cnt',
        key: 'leave_cnt',
        render: text => `${text || 0}`,
        sorter: (a, b) => a.leave_cnt - b.leave_cnt,
      },
      {
        title: '出口页-用户数',
        dataIndex: 'leave_user_cnt',
        key: 'leave_user_cnt',
        render: text => `${text || 0}`,
        sorter: (a, b) => a.leave_user_cnt - b.leave_user_cnt,
      },
      {
        title: '页面退出率',
        dataIndex: 'leave_ratio',
        key: 'leave_ratio',
        render: text => `${text || 0}%`,
        sorter: (a, b) => a.leave_ratio - b.leave_ratio,
      },
    ],
  },
];

export default page3;
