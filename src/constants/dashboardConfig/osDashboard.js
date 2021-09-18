import pieDefualtConfing from '@/constants/pie/config';

const osDashboard = [
  {
    id: 'osVersion',
    text: '操作系统类型分布',
    subtext: '操作系统类型分布的图',
    align: 'center',
    api: 'osVersion',
    hasParams: true,
    curType: 'pie',
    apiKeys: 'osVersion',
    linkTo: 'osUserListDashboard',
    ...pieDefualtConfing,
  },
];

export default osDashboard;
