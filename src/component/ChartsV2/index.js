import React from 'react';
import categoryConfig from '@/constants/categoryConfig';
import ReactECharts from 'echarts-for-react';
import cloneDeep from 'lodash/cloneDeep';

// import styles from './index.less'

class ChartV2 extends React.Component {
  constructor (props) {
    super(props);
    this.state = {};
  }

  createOptions = () => {
    const { datas: { chartData, columns, text, subtext, align, curType, color,
      legend, tooltip, xAxis, yAxis, unit } } = this.props;
    const options = JSON.parse(JSON.stringify(categoryConfig));
    options.series = [];
    if (text) options.title.text = text;
    if (subtext) options.title.subtext = subtext;
    if (align) options.title.left = align;
    if (tooltip) options.tooltip = tooltip;
    if (xAxis) options.xAxis = xAxis;
    if (color) options.color = color;
    if (yAxis) options.yAxis = yAxis;
    if (legend) options.legend = legend;
    if (unit) {
      options.tooltip.formatter = datas => {
        let res = `${datas[0].name}<br/>`;
        datas.forEach(item => {
          res += `${item.seriesName}：${item.value} ${unit}<br/>`
        })
        return res
      }
      options.yAxis.axisLabel = {
        formatter: `{value} ${unit}`,
      }
    }
    chartData.forEach((ele, index) => {
      const { name, data: ed } = ele;
      const obj = {};
      if (name) obj.name = name;
      obj.type = 'line';
      obj.data = ed;
      // obj.smooth = true;
      // obj.areaStyle = {};
      options.series[index] = obj;
    })

    if (curType === 'lineV2') {
      options.xAxis.data = columns;
    }
    return cloneDeep(options);
  }


  render() {
    const chartOption = this.createOptions();
    const { datas: { id, height: propsHeight } } = this.props;
    const height = propsHeight || 350;
    return (
      <ReactECharts
        id={id}
        ref={e => {
          this.echarts_react = e;
        }}
        option={chartOption}
        style={{ height: `${height}px` }}
      />
    )
  }
}

export default ChartV2;
