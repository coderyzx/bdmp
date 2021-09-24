import moment from 'moment';

const errorDashboard = [
  {
    id: 'pageError',
    text: '页面错误统计',
    align: 'center',
    api: 'pageError',
    hasParams: true,
    curType: 'table',
    help: '指定时间内各应用的用户，人机交互使用中产生的报错日志',
    columns: [
      {
        title: '时间',
        dataIndex: 'time',
        width: 150,
        key: 'time',
        render: value => moment(value).format('YYYY-MM-DD HH:mm'),
      },
      {
        title: '页面地址',
        dataIndex: 'url',
        width: 150,
        key: 'url',
      },
      // {
      //   title: '上一页面地址',
      //   dataIndex: 'events',
      //   width: 150,
      //   key: 'pre_url',
      //   render: value => {
      //     const { referrer } = value;
      //     return referrer;
      //   },
      // },
      {
        title: '应用名',
        dataIndex: 'ex_app_name',
        width: 150,
        key: 'ex_app_name',
      },
      {
        title: 'IP',
        dataIndex: 'ex_ip',
        width: 150,
        key: 'ex_ip',
      },
      {
        title: 'UA',
        dataIndex: 'ex_ua',
        width: 150,
        key: 'ex_ua',
      },
      {
        title: '屏幕宽',
        dataIndex: 'ex_screen_width',
        width: 150,
        key: 'user_info_wh',
      },
      {
        title: '屏幕高',
        dataIndex: 'ex_screen_height',
        width: 150,
        key: 'user_info_wh',
      },
      {
        title: '错误信息',
        dataIndex: 'msg',
        width: 150,
        key: 'msg',
      },
      {
        title: '错误堆栈',
        dataIndex: 'stack',
        key: 'stack',
      },
    ],
  },
];

export default errorDashboard;
