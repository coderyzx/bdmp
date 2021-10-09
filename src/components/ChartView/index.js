import React from 'react';
import ReactECharts from 'echarts-for-react';

// import styles from './index.less'

class ChartView extends React.Component {
  constructor (props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
  }

  shouldComponentUpdate(nextProps) {
    if (JSON.stringify(nextProps.chartOption) !== JSON.stringify(this.currentChartOption)) {
      return true;
    }

    return false;
  }

  render() {
    const { chartOption = {}, height } = this.props;
    this.currentChartOption = chartOption;
    return (
      <ReactECharts
        key={new Date().getTime()}
        ref={e => {
          this.echarts_react = e;
        }}
        option={chartOption}
        style={{ height: height || '100%' }}
      />
    )
  }
}

export default ChartView;
