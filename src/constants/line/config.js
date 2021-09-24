import echarts from 'echarts';

const lineDefualtConfing = {
  tooltip: {
    trigger: 'axis',
    axisPointer: {
        animation: false,
    },
  },
  legend: {
    top: 'bottom',
    left: 'center',
  },
  xAxis: {
    type: 'category',
    data: [],
  },
  yAxis: {
    type: 'value',
  },
  areaStyle: {
    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
        offset: 0,
        color: 'rgba(38,100,102,1)',
    }, {
        offset: 1,
        color: 'rgba(38,100,102,0.3)',
    }]),
  //   color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
  //     offset: 0,
  //     color: 'rgba(38,100,102,1)',
  // }, {
  //     offset: 1,
  //     color: 'rgba(135,255,243,1)',
  // }]),
  },
  // color: ['#4E6BFF', '#91cc75', '#fac858', '#ee6666', '#73c0de',
  // '#3ba272', '#fc8452', '#9a60b4', '#ea7ccc'],
  color: ['#d9fff9', '#b0fff4', '#87fff3', '#68d9d1', '#4db3af', '#358c8c', '#266466'].reverse(),
  markLine: {
    data: [
        { type: 'average', name: '平均值' },
    ],
  },
  markPoint: true,
};

export default lineDefualtConfing;
