import React from 'react';
import { Drawer, Button, Modal, Icon, message, Layout, Typography } from 'antd';
// import object from 'lodash/object';
import ReactECharts from 'echarts-for-react';
import { connect } from 'dva';
import ReactGridLayout from '@/components/ReactGridLayout';
import AttributeBoard from './component/AttributeBoard';
import attributeConfig from './config/attributeConfigMenu';
import ChartView from '@/components/ChartView';
// import { formatChartsRes } from '@/utils/formatRespones';
import { getContainerLayout, setItemId } from '@/utils/formatDashBoard';
import styles from './index.less';
import { handleOption } from '@/utils/templateLib';


const { Paragraph } = Typography;
// const { TabPane } = Tabs;

@connect(({ chartModel }) => ({
  chartList: chartModel.chartList,
  chartTypeName: chartModel.chartTypeName,
  allChart: chartModel.allChart,
}))
class ContainerManagement extends React.Component {
  constructor (props) {
    super(props);
    const { containerList } = props;
    // const { containerList, dashboardId } = props;
    this.state = {
      drawerVisible: false,
      modalVisible: false,
      // dashboardId,
      renderChartData: containerList.data || [],
    };
    this.container = {};
    this.layoutChangeData = containerList.optionLayouts || [];
    this.params = {
      data: [],
      layout: [],
    };
  }

  componentDidMount () {
    this.queryChartListName();
    this.queryChartTypeList();
  }

  queryChartTypeList = () => {
    const { dispatch } = this.props;
    // const number = 1;
    // chartTypeName.forEach(item => {
    //   this.queryChartList(item);
    // })
    dispatch({
      type: 'chartModel/getAll',
    });
  }

  // queryChartTypeList = () => {
  //   const { dispatch, chartTypeName } = this.props;
  //   // const number = 1;
  //   // chartTypeName.forEach(item => {
  //   //   this.queryChartList(item);
  //   // })
  //   dispatch({
  //     type: 'chartModel/getAll',
  //   });
  // }

  // queryChartList = () => {
  //   const { dispatch } = this.props;
  //   dispatch({
  //     type: 'chartModel/getChartList',
  //     callback : res => {
  //     }
  //   });
  // }

  queryChartListName = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'chartModel/getChartTypeName',
    });
  }

  showDrawer = (e, item) => {
    e.preventDefault();
    // e.stopPropagation();
    const { id } = item;
    this.curContainerId = id;
    this.container[this.curContainerId] = item;
    this.setState({
      drawerVisible: true,
    });
    return false;
  };

  onClose = () => {
    this.setState({
      drawerVisible: false,
    });
  };

  onAttributeChange = (field, value) => {
    // this.container[this.curContainer][field] = value;
    this.container[field] = value;
  }

  saveContainerInfo = () => {
    // const { renderChartData, dashboardId } = this.state;
    // const result = renderChartData.map(ele => {
    //   let item = ele;
    //   if (item.id === curContainer.id) {
    //     item = curContainer;
    //   }
    //   return item;
    // })
    // 保存时，把当前id的container放到container里
    // this.container[this.curContainerId] = curContainer;
    const { data } = this.params;
    data.forEach((item, index) => {
      if (item.id === this.container[this.curContainerId].id) {
        if (this.container.style) {
          data[index].style = this.container.style
        }
        if (this.container.type) {
          data[index].type = this.container.type
        }
      }
    })
    this.setState({
      drawerVisible: false,
    })
  }

  showChoiceCharts = () => {
    this.choiceArr = [];
    this.setState({
      modalVisible: true,
    });
  }

  // onTabChange = activeKey => {
  //   this.queryChartListName(activeKey);
  //   // this.setState({ activeKey });
  // };


  // renderPanes = () => {
  //   const { chartTypeList } = this.state;
  //   const allChartValue = [];
  //   object.forIn(chartsData, (v, k) => {
  //     allChartValue.push(...v);
  //     result.push((
  //       <TabPane tab={k} key={k}>
  //         {this.renderTabContent(v)}
  //       </TabPane>
  //     ))
  //   });
  //   result.unshift((
  //     <TabPane tab="全部" key="all" >
  //       {this.renderTabContent(allChartValue)}
  //     </TabPane>
  //   ));
  //   return result;
  //   // const result = [];
  //   // chartTypeList.forEach(item => {
  //   //   result.push((
  //   //     <TabPane tab={item} key={item}>
  //   //       {/* 123 */}
  //   //       {this.renderTabContent(item)}
  //   //     </TabPane>
  //   //   ))
  //   // });
  //   // return result;
  // }

  choiceOn = ele => {
    const val = ele;
    const { chartsData } = this.state;
    // const { chartList } = this.props;
    const flag = !val.choice;
    if (flag && this.choiceArr.length === 5) {
      message.error('一次最多选择5个， 谢谢');
      return;
    }
    if (flag) {
      this.choiceArr.push(val);
    } else {
      const index = this.choiceArr.indexOf();
      this.choiceArr.splice(index, 1);
    }
    val.choice = flag;
    this.setState({
      chartsData: {
        ...chartsData,
      },
    });
  }

  renderTabContent = () => {
    const { allChart } = this.props;
    console.log(allChart);
    let result = null;
    if (allChart && allChart.length) {
      result = (
        <div className={styles.tabChartWrap}>
          {
            allChart.map(ele => (
              // ele.typename !== '关系图' && ele.typename !== '平行坐标系' &&
              <div
                key={ele.id}
                className={styles.tabChartItem}
                onClick={() => { this.choiceOn(ele) }}>
                { ele.choice && <Icon type="check-circle" theme="twoTone" twoToneColor="#52c41a" /> }
                <div className={styles.img}
                 style={{ border: `${ele.choice ? '1px solid #5063C2' : ''}`, borderRadius: `${ele.choice ? '2px' : ''}` }}
                >
                  <ReactECharts
                    ref={e => {
                    this.echarts_react = e;
                    }}
                    option = {handleOption(ele.option)}
                    style={{ height: '100%' }}
                  />
                </div>
                <Paragraph
                  className={styles.name}
                  ellipsis={{ rows: 1 }}
                  title={ele.title}
                >
                  {ele.title}
                </Paragraph>
              </div>
            ))
          }
       </div>
      );
    }
    return result;
  }

  handleCancel = () => {
    this.setState({
      modalVisible: false,
    });
  }

  renderDrawer = () => {
    const { drawerVisible, renderChartData } = this.state;
    // const { id, option } = ele;
    const { option, title } = this.container[this.curContainerId];
    const headerContent = (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        cursor: 'pointer',
        color: 'rgba(24, 144, 255, 0.8)',
        }}>
        <div onClick={this.onClose}
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          cursor: 'pointer',
          }}
        >
          <Icon type="left-circle" theme="filled" className={styles.icon} style={{ fontSize: 20, display: 'block' }} />
          <span
          style={{
            color: '#575454',
            fontSize: 20,
            display: 'block',
            margin: '0 5px',
            }}>
            返回
          </span>
        </div>
        <span style={{
          borderBottom: '1px solid #d5d7e0',
          fontSize: 20,
          color: '#40a9ff',
          display: 'block',
          marginLeft: 40 }}>{title}</span>
      </div>
    )
    return (
      <Drawer
        title={headerContent}
        placement="top"
        visible={drawerVisible}
        getContainer={document.body}
        onClose={this.onClose}
        destroyOnClose
        closable
        width="100%"
        height="100%"
      >
        <div className={styles.drawerBody}>
          <div className={styles.chartView}>
            <ChartView
              chartOption={option}
            />
          </div>
          <div className={styles.attributeView}>
            <AttributeBoard
              menus={attributeConfig}
              onChange={(field, value) => { this.onAttributeChange(field, value) }}
              handleComfirm={this.saveContainerInfo}
              dataSelf={this.container[this.curContainerId]}
              dataLink={renderChartData}
            />
          </div>
        </div>
      </Drawer>
    )
  }

  handleOk = () => {
    const { renderChartData } = this.state;
    const { onContainerCreate } = this.props;
    setItemId(this.choiceArr);
    const result = [...renderChartData, ...this.choiceArr];
    const layout = getContainerLayout(
      result,
      this.layoutChangeData,
      result.length,
    );
    this.setState({
      renderChartData: result,
      modalVisible: false,
    })
    this.params.data = result; // 新增的
    this.params.layout = layout;
    onContainerCreate(this.params);
    this.choiceArr = [];
  }

  renderModal = () => {
    const { modalVisible } = this.state;
    return (
      <Modal
        title="选择图表"
        visible={modalVisible}
        destroyOnClose
        width={1000}
        onOk={this.handleOk}
        onCancel={this.handleCancel}
      >
        <Layout style={{
          background: '#fff',
          overflowY: 'auto',
          height: '550px',
        }}
          >
          {this.renderTabContent()}
        </Layout>
      </Modal>
    )
  }

  // onLayoutChange = l => {
  //   this.layoutChangeData = l;
  // }

  onLayoutChange = l => {
    const { onContainerCreate } = this.props;
    const { renderChartData } = this.state;
    this.layoutChangeData = l;
    this.params.layout = l;
    this.params.data = renderChartData
    onContainerCreate(this.params);
  }

  renderCardTitle = item => {
    const title = `点击编辑${item.title}`;
    return (
      <div
        className={styles.containerTitle}
        onClick={e => { this.showDrawer(e, item) }}
      >
        {title}
      </div>
    )
  }

  renderDelete = item => (
    <Button
      type="primary"
      className={styles.containerDelete}
      onClick={e => { this.deleteItem(e, item) }}>
        删除
    </Button>
  )

  deleteItem = (e, item) => {
    e.preventDefault();
    const { onContainerCreate } = this.props;
    const { renderChartData } = this.state;
    const result = [];
    renderChartData.forEach(ele => {
      const { id } = ele;
      if (id !== item.id) {
        result.push(ele);
      }
    });
    let layoutIndex = -1;
    this.params.data.forEach((ele, i) => {
      if (ele.id === item.id) layoutIndex = i
    })
    this.layoutChangeData.splice(layoutIndex, 1);
    this.setState({
      renderChartData: result,
    });
    // 对比历史删除状态
    // 检查是否是已经存在的容器，是的话进入 deleteWidgetList
    // const findIndex = this.curContainerIds.indexOf(item.id);
    // if (findIndex !== -1) {
    //   this.params.deleteWidgetList.push({ id: item.id });
    // } else {
    //   // 是前端添加的容器，从添加列表删除
    //   let index = -1;
    //   this.params.data.forEach((ele, i) => {
    //     if (ele.id === item.id) index = i
    //   })
    //   this.params.data.splice(index, 1);
    // }
    let index = -1;
    this.params.data.forEach((ele, i) => {
      if (ele.id === item.id) index = i
    })
    this.params.data.splice(index, 1);
    this.params.layout = this.layoutChangeData;
    onContainerCreate(this.params);
  }

  renderContainers = () => {
    const { renderChartData } = this.state;
    const result = [];
    if (renderChartData && renderChartData.length) {
      renderChartData.forEach(ele => {
        const { id, option } = ele;
        result.push(
          <div key={id} id={id} className={styles.containerItem}>
            <div className={styles.containerHeader}>
              {this.renderCardTitle(ele)}
              {this.renderDelete(ele)}
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
        this.layoutChangeData,
        renderChartData.length,
      ),
      containers: result,
    };
  }

  render () {
    const { drawerVisible, modalVisible } = this.state;
    const { containers, layouts } = this.renderContainers();
    return (
      <div className={styles.dashboardMamagementWrap}>
        <div className={styles.choiceChartsWrap}>
          <Button type="primary" onClick={this.showChoiceCharts}>+ 图表组件</Button>
        </div>
        <ReactGridLayout
          layout={layouts}
          doms={containers}
          onChange={l => { this.onLayoutChange(l) }}
        />
        {modalVisible && this.renderModal()}
        {drawerVisible && this.renderDrawer()}
      </div>
    )
  }
}

export default ContainerManagement;
