import React from 'react';
import { Drawer, Button, Modal, Tabs, Row, Col, Icon, Card, message } from 'antd';
import object from 'lodash/object';
import ReactGridLayout from '@/components/ReactGridLayout';
import AttributeBoard from '@/components/AttributeBoard';
import attributeConfig from './config/attributeConfigMenu';
import { getChartList, getChartTypeList } from '@/services/charts';
import ChartView from '@/components/ChartView';
import { formatChartsRes } from '@/utils/formatRespones';
import { getContainerLayout, setItemId } from '@/utils/formatDashBoard';
import styles from './index.less';

const { TabPane } = Tabs;

class ContainerManagement extends React.Component {
  constructor (props) {
    super(props);
    const { containerList } = props;
    this.state = {
      drawerVisible: false,
      modalVisible: false,
      activeKey: 'all',
      chartsData: {},
      renderChartData: containerList,
    };
    this.container = {};
    this.layoutChangeData = [];
  }

  componentDidMount () {
  }

  queryChartTypeList = async () => {
    const res = await getChartTypeList();
    return res.data;
  }

  queryChartList = async id => {
    const res = await getChartList({ chartTypeId: id });
    return res.data;
  }

  showDrawer = item => {
    const { curContainerId } = item;
    this.curContainerId = curContainerId;
    this.container[this.curContainerId] = item;
    this.setState({
      drawerVisible: true,
    });
  };

  onClose = () => {
    this.setState({
      drawerVisible: false,
    });
  };

  onAttributeChange = (field, value) => {
    this.container[this.curContainer][field] = value;
    // console.log(this.container);
  }

  showChoiceCharts = async () => {
    const chartTypeList = await this.queryChartTypeList();
    const chartsData = await this.queryChartList();
    const chartObj = formatChartsRes(chartTypeList, chartsData);
    this.choiceArr = [];
    this.setState({
      modalVisible: true,
      chartsData: chartObj,
    });
  }

  onTabChange = activeKey => {
    this.setState({ activeKey });
  };

  renderPanes = () => {
    const { chartsData } = this.state;
    const result = [];
    const allChartValue = [];
    object.forIn(chartsData, (v, k) => {
      allChartValue.push(...v);
      result.push((
        <TabPane tab={k} key={k}>
          {this.renderTabContent(v)}
        </TabPane>
      ))
    });
    result.unshift((
      <TabPane tab="全部" key="all" >
        {this.renderTabContent(allChartValue)}
      </TabPane>
    ));
    return result;
  }

  choiceOn = ele => {
    const val = ele;
    const { chartsData } = this.state;
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

  renderTabContent = datas => {
    let result = null;
    if (datas && datas.length) {
      const node = [];
      datas.forEach(ele => {
        const { name, id, thumb, choice } = ele;
        node.push(
          <Col
            key={id}
            span={4}
            className={styles.tabChartItem}
            onClick={() => { this.choiceOn(ele) }}>
            { choice && <Icon type="check-circle" theme="twoTone" twoToneColor="#52c41a" /> }
            <div className={styles.img}>
              <img src={`${process.env.defaultImgDomain}/chart/${thumb}`} alt="" />
            </div>
            <div className={styles.name}>
              {name}
            </div>
          </Col>,
        );
      });

      result = (
        <Row gutter={24} className={styles.tabChartWrap}>
          {node}
        </Row>
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
    const { drawerVisible } = this.state;
    const { chartOptions, curContainerId } = this.container[this.curContainerId];
    return (
      <Drawer
        title={curContainerId}
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
              chartOption={JSON.parse(chartOptions)}
            />
          </div>
          <div className={styles.attributeView}>
            <AttributeBoard
              menus={attributeConfig}
              onChange={(field, value) => { this.onAttributeChange(field, value) }}
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
    onContainerCreate(this.choiceArr, () => {
      this.setState({
        renderChartData: result,
        modalVisible: false,
      })
    });
  }

  renderModal = () => {
    const { modalVisible, activeKey } = this.state;
    const contentNode = this.renderPanes();
    return (
      <Modal
          title="选择图表"
          visible={modalVisible}
          destroyOnClose
          width={1000}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
      >
        <Tabs
          onChange={this.onTabChange}
          activeKey={activeKey}
        >
          {contentNode}
        </Tabs>
      </Modal>
    )
  }

  onLayoutChange = l => {
    this.layoutChangeData = l;
  }

  renderCardTitle = item => {
    const title = `点击可以编辑${item.id}容器详细内容`;
    return (
      <div
        className={styles.containerTitle}
        onClick={() => { this.showDrawer(item) }}
      >
        {title}
      </div>
    )
  }

  renderContainers = () => {
    const { renderChartData } = this.state;
    const result = [];
    if (renderChartData && renderChartData.length) {
      renderChartData.forEach(ele => {
        const { chartOptions, id, chartOption } = ele;
        const options = JSON.parse(chartOptions || chartOption)
        result.push(
          <div key={id} id={id} className={styles.containerItem}>
            <Card
              title={this.renderCardTitle(ele)}
              style={{ height: '100%' }}
              bodyStyle={{ height: '100%' }}
            >
              <ChartView
                height="90%"
                chartOption={options}
              />
            </Card>
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
