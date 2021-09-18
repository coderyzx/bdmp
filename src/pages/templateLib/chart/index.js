import React from 'react';
import { connect } from 'dva'
import router from 'umi/router';
import ReactECharts from 'echarts-for-react';
import { Icon, Button, Tooltip, Modal, notification, Spin } from 'antd';
import styles from './index.less';
import CreateChart from './creatChart'
import dele from '@/assets/delete.svg';
import { handleOption } from '@/utils/templateLib'
import noData from '@/assets/noData.svg';

@connect(({ chartModel }) => (
  {
    chartList: chartModel.chartList,
  }),
)
class Chart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visibleCreateChart: false,
      confirmLoading: false,
      deleteId: '',
      deleteLoading: false,
      visibleDeleteChart: false,
      // isSpinLoading: true,
      // typeName: '',
      isShow: '',
      isLoading: true,
    }
  }

  componentDidMount () {
    const { dispatch } = this.props;
    const { typeName } = this.props.location.query;
    dispatch({
      type: 'chartModel/getChartList',
      payload: typeName,
      callback: response => {
        this.setState({ isShow: response.msgCode, isLoading: false });
      },
    });
  }

  componentWillReceiveProps(nextProps) {
    // 监听路由参数变化，重新渲染
    if (nextProps.location.query.typeName !== this.props.location.query.typeName) {
      const { dispatch } = this.props;
      const type = nextProps.location.query.typeName;
      this.setState({ isLoading: true });
      dispatch({
        type: 'chartModel/getChartList',
        payload: type,
        callback: response => {
          this.setState({ isShow: response.msgCode, isLoading: false });
        },
      });
    }
   }

  // 添加
  showModal = () => {
    this.setState({ visibleCreateChart: true });
  };

  handleCancel = () => {
    this.setState({ visibleCreateChart: false });
  };

  handleCreate = () => {
    const { form } = this.formRef.props;
    const { dispatch } = this.props;
    form.validateFields((err, values) => {
      if (err) { // 如果有一个校验不通过，代码将不再往下执行
        return;
      }
      this.setState({
        confirmLoading: true,
      });
      // 校验通过，调接口传参
      console.log(values);
      const { typeName } = this.props.location.query;
      dispatch({
        type: 'chartModel/postNewChart',
        payload: values,
        callback: res => {
          if (res.code === 'U000000') {
            dispatch({
              type: 'chartModel/getChartList',
              payload: typeName,
            });
            this.setState({
              confirmLoading: false,
              visibleCreateChart: false,
            });
            const args = {
              message: '提示',
              description: '新建图表成功',
            };
            notification.success(args);
          } else {
            this.setState({
              confirmLoading: false,
              visibleCreateChart: false,
            });
            const args = {
              message: '提示',
              description: '新建图表失败',
            };
            notification.info(args);
          }
        },
      });
      form.resetFields();
    });
  };

  saveFormRef = formRef => {
    this.formRef = formRef;
  };

  // 删除
  showDelete = id => {
    this.setState({
      visibleDeleteChart: true,
      deleteId: id,
    });
  };

  deleteSelection =() => {
    const { dispatch } = this.props;
    const { deleteId } = this.state;
    this.setState({
      deleteLoading: true,
    });
    dispatch({
      type: 'chartModel/getDeleteChart',
      payload: deleteId,
      callback: res => {
        if (res.code === 'U000000') {
          const type = this.props.location.query.typeName;
          dispatch({
            type: 'chartModel/getChartList',
            payload: type,
          });
          this.setState({
            deleteLoading: false,
            visibleDeleteChart: false,
          });
          const args = {
            message: '提示',
            description: '删除成功',
          };
          notification.success(args);
        } else {
          this.setState({
            deleteLoading: false,
            visibleDeleteChart: false,
          });
          const args = {
            message: '提示',
            description: '删除失败',
          };
          notification.info(args);
        }
      },
    });
  };

  deleteSelectionCancel = () => {
    this.setState({ visibleDeleteChart: false });
  };


  render() {
    const { chartList } = this.props;
    const { typeName } = this.props.location.query;
    const { confirmLoading, visibleCreateChart, deleteLoading,
    visibleDeleteChart, isShow, isLoading } = this.state;
    const titleDelete = <p style={{ fontSize: 30, marginBottom: 5, textAlign: 'center' }}>删除</p>
    // console.log(chartList);
    return (
      <div style={{ margin: '0 10px', minHeight: 'calc(100vh - 67x)' }}>
        <div className={styles.chartTypeHead} >
          <h3 className={styles.chartTypeName}>{typeName}</h3>
          <Button type="primary" size="large" className={styles.chartNew}
           onClick={this.showModal}
          >
            新增图表
          </Button>
          <CreateChart
            wrappedComponentRef={this.saveFormRef}
            visible={visibleCreateChart}
            onCancel={this.handleCancel}
            onCreate={this.handleCreate}
            confirmLoading={confirmLoading}
          />
          <Modal
            okType= "danger"
            title={titleDelete}
            visible={visibleDeleteChart}
            onOk={this.deleteSelection}
            onCancel={this.deleteSelectionCancel}
            confirmLoading={deleteLoading}
          >
            <p style={{ textAlign: 'center', marginBottom: 15 }}>
              <img src={dele} />
            </p>
            <p className={styles.selectItem}>
              确认删除吗？
            </p>
          </Modal>
        </div>
        { isLoading && <div className={styles.spin}><Spin size="large" tip="加载中...图表较为复杂请稍后" /></div>}
        {!isLoading &&
          (chartList || []).map(item => (
            <div key={item.id} style={{ marginRight: '-15px', marginLeft: '-15px' }}>
              <div className={styles.colItem} >
                <div className={styles.listItem}>
                  <div className={styles.listImg}>
                    <div className={styles.img}>
                      <ReactECharts
                          ref={e => {
                          this.echarts_react = e;
                          }}
                          // option = {handleOption(eval("(" + item.optionjson +")"))}
                          // option = {handleOption(eval(`(${item.optionjson})`))}
                          option = {handleOption(item.option)}
                          // option = {item.option}
                          style={{ width: '100%', height: '100%' }}
                        />
                    </div>
                    <div className={styles.mask} >
                      <div className={styles.icon} >
                        <Tooltip placement="top" title="编辑">
                          <Button type="primary" size="large" style={{ fontSize: 40, height: 60 }}
                            onClick={() => router.push(`/editor?id=${item.id}`)}
                          >
                            <Icon type="edit" />
                          </Button>
                        </Tooltip>
                        <div style={{ width: 30 }} />
                        <Tooltip placement="top" title="删除">
                          <Button type="danger" size="large"
                          style={{ fontSize: 40, height: 60 }}
                          onClick={() => this.showDelete(item.id)}
                          >
                            <Icon type="delete" />
                          </Button>
                        </Tooltip>
                      </div>
                    </div>
                  </div>
                  <div className={styles.title}>{item.title}</div>
                </div>
              </div>
            </div>
          ))
        }
        { isShow === 'FAIL' &&
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            marginTop: 200,
            }}>
            <img src={noData} />
            <span style={{ fontSize: 20, marginTop: 10 }}>暂无图表，点击新增创建一个吧~</span>
          </div>
        }
      </div>
    )
  }
}

export default Chart;
