import React from 'react';
import { Spin, Button, notification, Icon } from 'antd';
import { connect } from 'dva'
import router from 'umi/router';
import styles from './index.less';
import ReactGridLayout from '@/components/ReactGridLayout';
import ChartView from '@/components/ChartView';
import { getContainerLayout } from '@/utils/formatDashBoard';
import noData from '@/assets/noData.svg';

@connect(({ chartModel }) => (
  {
    chartList: chartModel.chartList,
  }),
)
class DashBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      dashboardName: '',
      containerList: [],
      isShow: false,
    }
  }

  componentDidMount () {
    const { id } = this.props.location.query;
    this.setState({
      isShow: false,
    });
    if (id) {
      this.getChart(id);
    } else {
      this.setState({
        isShow: true,
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    // 监听路由参数变化，重新渲染
    if (nextProps.location.query.id !== this.props.location.query.id) {
      const { id } = nextProps.location.query;
      this.setState({
        isShow: false,
      });
      if (id) {
        this.getChart(id);
      } else {
        this.setState({
          isShow: true,
        });
      }
    }
  }


  // 添加图表
  getChart = id => {
    const { dispatch } = this.props;
    this.setState({
      isLoading: true,
    });
    dispatch({
      type: 'dashBoard/getChart',
      payload: id,
      callback: res => {
        if (res.code === 'U000000') {
          this.setState({
            isLoading: false,
            containerList: res.data,
          });
        } else {
          this.setState({
            isLoading: false,
            containerList: [],
          });
          const args = {
            message: '提示',
            description: '无法获取仪表盘',
          };
          notification.info(args);
        }
      },
    });
    dispatch({
      type: 'dashBoard/getById',
      payload: id,
      callback: res => {
        this.setState({
          dashboardName: res.data.name,
        });
      },
    });
  }

  renderCardTitle = item => {
    const title = `点击编辑${item.title}`;
    return (
      <div
        className={styles.containerTitle}
      >
        {title}
      </div>
    )
  }

  renderContainers = () => {
    const { containerList } = this.state;
    const renderChartData = containerList.data || [];
    const layoutChangeData = containerList.optionLayouts || [];
    const result = [];
    if (renderChartData && renderChartData.length) {
      renderChartData.forEach(ele => {
        const { id, option } = ele;
        result.push(
          <div key={id} id={id} className={styles.containerItem}>
            <div className={styles.containerHeader}>
              {this.renderCardTitle(ele)}
            </div>
              <ChartView
                height="90%"
                chartOption={option}
              />
          </div>,
        )
      });
    }
    return {
      layouts: getContainerLayout(
        renderChartData,
        layoutChangeData,
        renderChartData.length,
      ),
      containers: result,
    };
  }

  render() {
    const { isLoading, dashboardName, isShow } = this.state;
    const { containers, layouts } = this.renderContainers();
    const { id } = this.props.location.query;
    const PandaSvg = () => (
      <svg viewBox="0 0 1024 1024" width="1em" height="1em" fill="currentColor">
        <path
          d="M99.096 315.634s-82.58-64.032-82.58-132.13c0-66.064 33.032-165.162 148.646-148.646 83.37 11.91 99.096 165.162 99.096 165.162l-165.162 115.614zM924.906 315.634s82.58-64.032 82.58-132.13c0-66.064-33.032-165.162-148.646-148.646-83.37 11.91-99.096 165.162-99.096 165.162l165.162 115.614z"
          fill="#6B676E"
          p-id="1143"
        />
        <path
          d="M1024 561.548c0 264.526-229.23 429.42-512.002 429.42S0 826.076 0 561.548 283.96 66.064 512.002 66.064 1024 297.022 1024 561.548z"
          fill="#FFEBD2"
          p-id="1144"
        />
        <path
          d="M330.324 842.126c0 82.096 81.34 148.646 181.678 148.646s181.678-66.55 181.678-148.646H330.324z"
          fill="#E9D7C3"
          p-id="1145"
        />
        <path
          d="M644.13 611.098C594.582 528.516 561.55 512 512.002 512c-49.548 0-82.58 16.516-132.13 99.096-42.488 70.814-78.73 211.264-49.548 247.742 66.064 82.58 165.162 33.032 181.678 33.032 16.516 0 115.614 49.548 181.678-33.032 29.18-36.476-7.064-176.93-49.55-247.74z"
          fill="#FFFFFF"
          p-id="1146"
        />
        <path
          d="M611.098 495.484c0-45.608 36.974-82.58 82.58-82.58 49.548 0 198.194 99.098 198.194 165.162s-79.934 144.904-148.646 99.096c-49.548-33.032-132.128-148.646-132.128-181.678zM412.904 495.484c0-45.608-36.974-82.58-82.58-82.58-49.548 0-198.194 99.098-198.194 165.162s79.934 144.904 148.646 99.096c49.548-33.032 132.128-148.646 132.128-181.678z"
          fill="#6B676E"
          p-id="1147"
        />
        <path
          d="M512.002 726.622c-30.06 0-115.614 5.668-115.614 33.032 0 49.638 105.484 85.24 115.614 82.58 10.128 2.66 115.614-32.944 115.614-82.58-0.002-27.366-85.556-33.032-115.614-33.032z"
          fill="#464655"
          p-id="1148"
        />
        <path
          d="M330.324 495.484m-33.032 0a33.032 33.032 0 1 0 66.064 0 33.032 33.032 0 1 0-66.064 0Z"
          fill="#464655"
          p-id="1149"
        />
        <path
          d="M693.678 495.484m-33.032 0a33.032 33.032 0 1 0 66.064 0 33.032 33.032 0 1 0-66.064 0Z"
          fill="#464655"
          p-id="1150"
        />
      </svg>
    );
    const PandaIcon = props => <Icon component={PandaSvg} {...props} />;
    return (
      <>
        { isLoading &&
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '600px',
          }}>
            <Spin size="large" tip="加载中...数据生成中请稍后" />
          </div>}
        {!isLoading && id &&
          <div className={styles.dashboardMamagementWrap}>
            <div className={styles.headerContent} >
              <Button type="primary"
                onClick={router.goBack}
                style={{ marginLeft: 20 }}
              >
              <Icon type="left" />
                返回
              </Button>
              <div className={styles.wrapContent} style={{ width: '100%' }}>
                <div className={styles.title}>{dashboardName}</div>
              </div>
            </div>
            <ReactGridLayout
              layout={layouts}
              doms={containers}
            />
        </div>
        }
        { !isLoading && containers.length === 0 && id &&
          <div className={styles.noData}>
            <img src={noData} alt="404" />
            <span style={{ fontSize: 20, marginTop: 10 }}>暂无仪表盘内容，快去添加吧~</span>
          </div>
        }
        { isShow &&
          <div className={styles.content}>
            <div><PandaIcon style={{ fontSize: '150px' }} /></div>
            <span style={{ fontSize: 'xx-large', marginTop: 40 }}>无内容，请从仪表盘管理的预览中打开~</span>
          </div>
        }
      </>
    )
  }
}

export default DashBoard;
