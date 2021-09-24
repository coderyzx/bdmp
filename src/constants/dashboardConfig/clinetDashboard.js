import pieDefualtConfing from '@/constants/pie/config';

const clinetDashboard = [
  {
    id: 'browserType',
    text: '浏览器类型分布',
    subtext: '浏览器类型分布的图',
    align: 'center',
    api: 'browserType',
    hasParams: false,
    curType: 'pie',
    linkTo: 'browserDashboard',
    apiKeys: 'browserName',
    ...pieDefualtConfing,
  },
  {
    id: 'osType',
    text: '系统类型分布',
    subtext: '系统类型分布的图',
    align: 'center',
    api: 'osType',
    hasParams: false,
    curType: 'pie',
    linkTo: 'osDashboard',
    apiKeys: 'osName',
    ...pieDefualtConfing,
  },
];

export default clinetDashboard;
