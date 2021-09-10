import React from 'react';
import categoryConfig from '@/constants/categoryConfig';
import ReactECharts from 'echarts-for-react';
import cloneDeep from 'lodash/cloneDeep';
import lineDefualtConfing from '@/constants/line/config';
import pieDefualtConfing from '@/constants/pie/config';

const { location } = window;

// import styles from './index.less'

class Chart extends React.Component {
  constructor (props) {
    super(props);
    this.state = {};
  }

  shouldComponentUpdate(nextProps) {
    if (nextProps.datas.curType === this.curType) {
      return false;
    }

    return true
  }

  onChartClick = ({ ...datas }) => {
    const { datas: { linkTo, apiKeys, getDatas }, toTarget, getCurrentData } = this.props;
    const { name } = datas;
    if (getDatas) {
      getCurrentData(name, getDatas);
    }
    if (linkTo) {
      const keys = apiKeys.split(',');
      const values = [name];
      const result = keys.map((item, index) => `${item}=${values[index]}`).join('&');
      let searchString = `?${result}`;
      if (location.search) searchString = `${location.search}&${result}`
      toTarget(`${linkTo}${searchString}`);
    }
  }

  createOptions = () => {
    const { datas: { curType: ct }, datas } = this.props;
    let params = datas;
    if (ct === 'line' || ct === 'bar') params = Object.assign(cloneDeep(lineDefualtConfing), datas);
    if (ct === 'pie') params = Object.assign(cloneDeep(pieDefualtConfing), datas);
    this.curType = ct;
    const { columns, data, text, subtext, align, curType, color,
      areaStyle, legend, emphasis, tooltip, xAxis, yAxis, split, radius, label,
      animation, draggable, layout, nodes, categories, force, links, levels,
      unit, markLine, markPoint } = params;
    const options = JSON.parse(JSON.stringify(categoryConfig));
    const curSeries = options.series[0];
    curSeries.type = curType;
    if (text) options.title.text = text;
    if (subtext) options.title.subtext = subtext;
    if (align) options.title.left = align;
    if (tooltip && !split) options.tooltip = tooltip;
    if (xAxis) options.xAxis = xAxis;
    if (color) options.color = color;
    if (yAxis) options.yAxis = yAxis;
    if (options.yAxis) delete options.yAxis.axisLabel;
    if (areaStyle) curSeries.areaStyle = areaStyle;
    if (emphasis) curSeries.emphasis = emphasis;
    if (legend && !split) options.legend = legend;
    if (label) curSeries.label = label;
    if (unit) {
      options.tooltip.formatter = curDatas => {
        let res = `${curDatas[0].name}<br/>`;
        curDatas.forEach(item => {
          res += `${item.value} ${unit}<br/>`
        })
        return res
      }
      options.yAxis.axisLabel = {
        formatter: `{value} ${unit}`,
      }
    }
    if (curType === 'line' || curType === 'bar') {
      options.xAxis.data = columns;
      curSeries.data = data;
      curSeries.smooth = true;
      if (markLine !== 'off') curSeries.markLine = markLine;
      if (markPoint && columns) {
        const maxNum = Math.max(...data);
        const xMaxNum = data.indexOf(maxNum);
        const minNum = Math.min(...data);
        const xMinNum = data.indexOf(minNum);
        curSeries.markPoint = {
          data: [
            { name: '最高', value: maxNum, xAxis: columns[xMaxNum], yAxis: Math.round(maxNum + 1) },
            { name: '最低', value: minNum, xAxis: columns[xMinNum], yAxis: Math.round(minNum + 1) },
          ],
        }
        if (columns.length > 12) {
          // options.xAxis.splitLine = {
          //   show: true,
          // }
          options.xAxis.axisLabel = {
            interval: 0,
            rotate: 38,
          }
        }
      }
    }
    if (curType === 'pie') {
      curSeries.radius = radius || '50%';
      curSeries.data = columns.map((item, index) => ({ name: item, value: data[index] }));
      if (split) {
        curSeries.label = {
          show: false,
          position: 'center',
        }
        curSeries.itemStyle = {
          borderRadius: 10,
          borderColor: '#fff',
          borderWidth: 2,
        }
      }
    }
    if (curType === 'sankey') {
      curSeries.data = nodes;
      curSeries.links = links;
      curSeries.emphasis = {
        focus: 'adjacency',
      };
      curSeries.lineStyle = {
          curveness: 0.5,
      };
      let maxDepth = 0;
      let maxNum = 0;
      links.forEach(link => {
        const linkDepth = link.source.charAt(0) - 0;
        if (maxDepth < linkDepth) {
          maxDepth = linkDepth;
          maxNum = 0;
        }
        if (maxDepth === linkDepth) maxNum += 1;
      });
      options.height = maxNum * 28;
      curSeries.levels = levels;
      curSeries.label = {
        formatter: item => {
          const arr = item.name.split('_');
          return arr[arr.length - 1];
        },
      };
    }

    if (curType === 'graph') {
      curSeries.layout = layout;
      curSeries.animation = animation;
      curSeries.draggable = draggable;
      curSeries.data = nodes.map((node, idx) => {
        const v = node;
        v.id = idx;
        return v;
      });
      curSeries.categories = categories;
      curSeries.force = force;
      curSeries.edges = links;
    }
    return cloneDeep(options);
  }

  render() {
    const chartOption = this.createOptions();
    const { datas: { curType, height: propsHeight }, id } = this.props;
    let height = chartOption.height || propsHeight || 350;
    if (curType === 'pie') height = propsHeight || 900;
    const onEvents = {
      click: this.onChartClick.bind(this),
    }
    return (
      <ReactECharts
        id={id}
        ref={e => {
          this.echarts_react = e;
        }}
        onEvents={onEvents}
        option={chartOption}
        style={{ height: `${height}px` }}
      />
    )
  }
}

export default Chart;
