import pieDefualtConfing from '@/constants/pie/config';

const testing = [
  {
    id: 'rankByUser',
    text: '页面浏览排名（按访问用户数）',
    subtext: '页面浏览排名（按访问用户数）的走势图',
    align: 'center',
    api: 'rankByUser',
    hasParams: true,
    curType: 'pie',
    split: 3,
    height: 300,
    ...pieDefualtConfing,
  },
];

export default testing;
