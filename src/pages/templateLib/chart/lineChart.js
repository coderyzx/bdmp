import React from 'react';
import { connect } from 'dva'
import Link from 'umi/link';
import ReactECharts from 'echarts-for-react';
import styles from './index.less';

@connect(({ chartModel }) => (
  {
    lineChart: chartModel.lineChart,
  }),
)
class LineChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  componentDidMount () {
    const { dispatch } = this.props;
    dispatch({
      type: 'chartModel/getLineChart',
      payload: {},
    });
  }

  render() {
    // console.log('render', this.props.match.params.id);
    const { lineChart } = this.props;
    console.log(lineChart);
    return (
      // <div>{this.props.match.params.id}</div>
      <div style={{ margin: '0 20px', minHeight: 'calc(100vh)' }}>
        <h3 className={styles.chartTypeHead}>{lineChart.name}</h3>
        {
            // chartType.list.map(item =>{
            //   console.log(item);
            //   return (<div>{item}</div>)
            // })
          (lineChart.list || []).map(item => (
            <div key={item.id} style={{ marginRight: '-15px', marginLeft: '-15px' }}>
              <div className={styles.colItem} >
                <div className={styles.listLtem}>
                  <div>
                    <div className={styles.img}>
                      <ReactECharts
                        ref={e => {
                        this.echarts_react = e;
                        }}
                        option = {item.option}
                      />
                    </div>
                    <div className={styles.mask} >
                      <Link to={`/editor/${item.option}`}>
                        <div>编辑</div>
                      </Link>
                      <div>删除</div>
                    </div>
                  </div>
                  <h4 className={styles.title}>{item.title}</h4>
                  {/* <h5 className={styles.subTitle}>{item.subTitle}</h5> */}
                </div>
              </div>
            </div>
          ))
        }
      </div>
    )
  }
}

export default LineChart;
