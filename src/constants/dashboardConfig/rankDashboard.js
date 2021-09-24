import pieDefualtConfing from '@/constants/pie/config';

const rankDashboard = [
  {
    id: 'rankByUser',
    text: '页面浏览排名（按访问用户数）',
    subtext: '页面浏览排名（按访问用户数）的走势图',
    align: 'center',
    api: 'rankByUser',
    hasParams: true,
    curType: 'pie',
    ...pieDefualtConfing,
  },
  {
    id: 'rankByView',
    text: '页面浏览排名（按访问量）',
    subtext: '页面浏览排名（按访问量）的走势图',
    align: 'center',
    api: 'rankByView',
    hasParams: true,
    curType: 'pie',
    ...pieDefualtConfing,
  },
];

export default rankDashboard;
