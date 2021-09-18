import React, { PureComponent } from 'react';
import ReactEcharts from 'echarts-for-react';
// import echarts from 'echarts';
import { Card, Spin, Col, Row, Button } from 'antd';
import { connect } from 'dva'
import walden from './walden';
import purplePassion from './purple-passion';
import westeros from './westeros';
import styles from './index.less';

// const chart = echarts.init(document.getElementById('main'), 'walden');

// chart.setOption({
// });

@connect(({ chartModel }) => (
  {
    chartList: chartModel.chartList,
  }),
)
class DashBoard extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      theme: '',
    }
  }

  componentWillMount() {
    // echarts.registerTheme('theme', walden);
    const { dispatch } = this.props;
    // const { typeName } = this.props.location.query;
    const typeName = '关系图';
    dispatch({
      type: 'chartModel/getChartList',
      payload: typeName,
      callback: () => {
        this.setState({ isLoading: false });
      },
    });
    // 基于准备好的dom，初始化echarts实例
    // let myChart = echarts.init(document.getElementById('main'));
    // echarts.init(document.getElementById('main'), walden);
    // 绘制图表
    // myChart.setOption({});
  }

  handleChange = theme => {
    // const { dispatch } = this.props;
    // const typeName = '关系图';
    // 可以在这里选择主题，'default','light','dark'
    switch (theme) {
      case 'walden':
        this.setState({ theme: 'default' });
        break;
      case 'purplePassion':
        this.setState({ theme: 'light' });
        break;
      case 'westeros':
        this.setState({ theme: 'dark' });
        break;
      default:
        break;
    }
  }

  render() {
    const { isLoading, theme } = this.state;
    const { chartList } = this.props;
    // console.log(chartList);
    return (
      <>
        <div className={styles.containerBox}>
          <Button onclick={this.handleChange('walden')}>walden</Button>
          <Button onclick={this.handleChange('purplePassion')}>purplePassion</Button>
          <Button onclick={this.handleChange('westeros')}>westeros</Button>
          <Row gutter={24}
          // style={{ marginLeft: 200 }}
          >
            { isLoading && <div className={styles.spin}><Spin size="large" tip="加载中...数据生成中请稍后" /></div>}
            {!isLoading &&
              (chartList || []).map(item => (
                <Col span={8} key={item.id} style={{ padding: 0 }} >
                  <Card title={item.title} bordered >
                    <ReactEcharts option={item.option} theme="light"
                    notMerge lazyUpdate style={{ height: 600 }} />
                  </Card>
                </Col>
              ))
            }
          </Row>
        </div>
      </>
    )
  }
}

export default DashBoard;
