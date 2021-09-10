import React from 'react';
import { Layout, Row, Col } from 'antd';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import object from 'lodash/object';
import SkeletonView from '@/components/SkeletonView';
import RetentionDashboard from '@/pages/RetentionDashboard';
import China from '@/pages/China';
// import CustomForm from '@/components/CustomForm';
// import formDatas from '@/constants/formDatas';
import * as UAPAPIS from '@/services/uapAPI';
import chartMapping from '@/constants/chartMapping';
import formMapping from '@/constants/formMapping';
import { renderCharts, renderCards, renderChartsV2, renderCards1, renderChildren } from '@/utils/formatCharts';
import WordCloudComponent from '@/components/charts/components/WordCloudComponent';
import { renderTable } from '@/utils/formatTable';
import { formatRes } from '@/utils/formatRespones';
import * as dateKit from '@/utils/utils';
import styles from './index.less';

const { Content } = Layout;

// const formItemLayout = {
//   layout: 'horizontal',
//   labelCol: { span: 8 },
//   wrapperCol: { span: 16 },
// }

class DynamicContainer extends React.Component {
  constructor (props) {
    super(props);
    const { defaultTime, timeName } = this.props;
    const [timeStart, timeEnd] = dateKit.formatDate(defaultTime);
    let timeUnit = 'DAY';
    if (defaultTime === '0' || defaultTime === '1') timeUnit = 'HOUR';
    if (defaultTime === '365') timeUnit = 'MONTH';
    this.params = {
      startUrl: 'https://portal-admin-dev.uihcloud.cn/home',
    };
    this.state = {
      timeName,
      loading: true,
      initialValues: {
        timeUnit,
        // timeEnd: moment(1620374115679),
        // timeStart: moment(1618473315679),
        timeStart,
        timeEnd,
      },
      chartsArr: [],
    };
  }

  componentDidMount() {
    const { initialValues } = this.state;
    this.searchParams = initialValues;
    this.getChartDatas();
    window.changeChartItemView = this.changeChartItemView;
  }

  changeChartItemView = params => {
    const { id, type } = params;
    const { chartsData } = this.state;
    const curId = id.split('-')[0];
    const curType = type.split('-')[0];
    const currentData = chartsData.find(item => item.id === curId);
    currentData.curType = curType;
    this.setState({
      chartsData: [...chartsData],
      chartsArr: this.renderChartsArr(chartsData),
      loading: false,
      initialValues: this.searchParams,
    })
  }

  getItemStyle = (isDragging, draggableStyle) => ({
    userSelect: 'none',
    // 拖拽的时候背景变化
    // background: isDragging ? 'darkseagreen' : '',
    // opacity: isDragging ? '0.5' : '',
    border: isDragging ? '1px dashed rgb(48, 80, 240)' : '',
    // styles we need to apply on draggables
    ...draggableStyle,
  });

  getTimes = momentData => ({
    timeStart: momentData.timeStart.valueOf(),
    timeEnd: momentData.timeEnd.valueOf(),
  })

  findTargetValue = (sourceValue, targetValues) => {
    const values = targetValues;
    this.getValues = sourceValue;
    if (values.length) {
      const next = values.shift();
      const source = sourceValue[next];
      this.findTargetValue(source, values);
    }
  }

  getCurrentData = async (name, params) => {
    const { chartsData } = this.state;
    const { defaultTime } = this.props;
    const result = [];
    const { api, kit, connectionName, outputFieId } = params;
    const { project } = this.props;
    const requestData = {
      timeUnit: this.searchParams.timeUnit,
      project,
    }
    const options = {
      ...this.getRequestParams(),
      ...requestData,
      ...dateKit[kit](name, defaultTime),
      // ...formatOneDay(charts[i].chartData[relationFieId][0]),
    };
    const rRes = await UAPAPIS[api](options);
    if (rRes && rRes.code === 'U000000') {
      chartsData.forEach(ele => {
        const { currentName } = ele;
        if (connectionName === currentName) {
          const val = ele;
          val.chartData[outputFieId] = rRes.data.data.map((items, index) => {
            const vals = items;
            vals.rankIndex = index + 1;
            return vals;
          });
          result.push(val);
        } else {
          result.push(ele);
        }
      });

      this.setState({
        chartsData: result,
        chartsArr: this.renderChartsArr(result),
      })
    }
  }

  getRequestParams = () => {
    const { curKey } = this.props;
    const parmas = formMapping[curKey];
    const result = {};

    object.forIn(parmas, (v, k) => {
      const targetValues = v.split('.');
      let source = targetValues.shift();
      if (source === 'this') source = this;
      this.findTargetValue(source, targetValues);
      if (this.getValues && window.decodeURIComponent(this.getValues)) {
        result[k] = window.decodeURIComponent(this.getValues);
      }
    });

    return result;
  }

  getChartDatas = async params => {
    const { curKey, project, currentApp } = this.props;
    const chartsOtions = chartMapping[curKey];
    this.searchParams = {
      ...this.searchParams,
      ...params,
    };
    const requestData = {
      timeUnit: this.searchParams.timeUnit,
      project,
      ...this.getTimes(this.searchParams),
    }
    if (currentApp !== 'all') {
      requestData.appID = currentApp;
    }
    if (chartsOtions && chartsOtions.length) {
      const requestAPIS = [];
      let relationOption = null;
      chartsOtions.forEach((item, index) => {
        const { api, hasParams, relationApi, mock } = item;
        if (relationApi) {
          relationOption = {
            index,
            ...relationApi,
          }
        }
        requestAPIS.push(
          new Promise(async resolve => {
            let res = null;
            if (!mock) {
              if (hasParams) {
                const options = {
                  ...this.getRequestParams(),
                  ...requestData,
                };
                res = await UAPAPIS[api](options);
              } else {
                res = await UAPAPIS[api]();
              }
            }
            resolve(mock || res);
          }),
        );
      });

      Promise.all(requestAPIS).then(async values => {
        const charts = formatRes(values, chartsOtions);
        if (relationOption) {
          const { api: rApi, outputFieId, connectionName, index: i } = relationOption;
          const options = {
            ...this.getRequestParams(),
            ...requestData,
            // ...formatOneDay(charts[i].chartData[relationFieId][0]),
          };
          const rRes = await UAPAPIS[rApi](options);
          if (rRes && rRes.code === 'U000000') {
            charts[i].currentName = connectionName;
            charts[i].chartData[outputFieId] = rRes.data.data.map((items, index) => {
              const val = items;
              val.rankIndex = index + 1;
              return val;
            });
          }
        }
        this.setState({
          chartsData: charts,
          chartsArr: this.renderChartsArr(charts),
          loading: false,
          initialValues: this.searchParams,
        })
      });
    }
  }

  renderNodeArr = datas => {
    const nodes = [];
    if (datas && datas.length) {
      datas.forEach((ele, index) => {
        const { id, node, span, offsetSpan } = ele;
        nodes.push((
          <Col key={id} span={span}>
            <Draggable key={id} draggableId={id} index={index}>
              {(provided, snapshot) => (
                <div
                  key={id}
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  className={styles.dragItem}
                  style={{
                    ...this.getItemStyle(
                      snapshot.isDragging,
                      provided.draggableProps.style,
                    ),
                    // width: `${Math.floor(span * 100 / 24)}%`,
                  }}
                  // style={{ width: '300px', float: 'left' }}
                  // style={{ width: `${Math.floor(span * 100 / 24)}%` }}
                  // className={`ant-col ant-col-${span}`}
                >
                  {node}
                </div>
              )}
            </Draggable>
          </Col>
        ))
        if (offsetSpan) {
          nodes.push((
            <Col key={`${id}-offset`} span={offsetSpan}>
              <div className={styles.dragItem} style={{ height: '210px' }}></div>
            </Col>
          ))
        }
      });
    }

    return nodes;
  }

  renderChartsArr = charts => {
    const { initialValues, timeName } = this.state;
    const { toTarget, defaultTime } = this.props;
    let chartsArr = [];
    if (charts && charts.length) {
      charts.forEach(ele => {
        const { renderType, id, data, span, title, chartData } = ele;
        switch (renderType) {
          case 'wordCloud':
            chartsArr = chartsArr.concat({
              id,
              span: span || 24,
              node: <WordCloudComponent title={title} datas={{ data, ...ele }} key={id} />,
            })
            break;
          case 'map':
            chartsArr = chartsArr.concat({
              id,
              span: span || 24,
              node: <China title={title} data={data} key={id} />,
            });
            break;
          case 'retention':
            chartsArr = chartsArr.concat({
              id,
              span: span || 24,
              node: <RetentionDashboard defaultTime={defaultTime} toTarget={toTarget} item={ele} />,
            })
            break;
          case 'chartV2':
            chartsArr = chartsArr.concat(renderChartsV2(ele));
            break;
          case 'chart':
            chartsArr = chartsArr.concat(renderCharts(ele, toTarget));
            break;
          case 'card':
            chartsArr = chartsArr.concat(renderCards(ele, initialValues));
            break;
          case 'card1':
            chartsArr = chartsArr.concat(renderCards1(ele, timeName));
            break;
          case 'table':
            chartsArr = chartsArr.concat(renderTable(ele));
            break;
          case 'renderChildren':
            chartsArr = chartsArr.concat(renderChildren(ele, chartData, this.getCurrentData));
            break;
          default:
            break;
        }
      });
    }
    // this.setState({ chartsArr })
    return chartsArr;
  }

  renderNodes = () => {
    const { chartsArr } = this.state;
    const nodeArr = this.renderNodeArr(chartsArr);
    return (
      <DragDropContext
        onDragEnd={this.onDragEnd}
        sensors={[
          api => { this.sensorAPIRef = api },
        ]}
      >
        <Droppable droppableId="droppable">
          {provided => (
            <div
              className={styles.content}
              {...provided.providedProps}
              ref={provided.innerRef}
              // ref={ref => { provided.innerRef = ref }}
            >
              <Row gutter={24}>
                {nodeArr}
              </Row>
            </div>
          )}
        </Droppable>
      </DragDropContext>
    )
  }

  onChange = (a, b) => {
    const result = {
      [a]: b,
    };
    this.setState({
      loading: true,
    }, () => {
      this.getChartDatas(result);
    });
  }

  reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };

  onDragEnd = result => {
    const { chartsArr } = this.state;
    if (!result.destination) return;
    const newChartsArr = this.reorder(
      chartsArr,
      result.source.index,
      result.destination.index,
    );
    this.setState({ chartsArr: newChartsArr });
  }

  render() {
    const { loading } = this.state;
    const { curKey } = this.props;
    const chartsOtions = chartMapping[curKey];
    const nodes = this.renderNodes();
    return (
      <Content className={styles.dynamicContainerWrap}>
        {loading && <SkeletonView datas={chartsOtions} />}
        {/* <div className={styles.searchForm}>
          <CustomForm
            onChange={(a, b, c) => { this.onChange(a, b, c) }}
            wrappedComponentRef={form => { this.form = form }}
            formItemLayout={formItemLayout}
            col={{ span: 4 }}
            config={formDatas.defaultForm}
            initialValues={initialValues}
          />
        </div> */}
        {/* <China /> */}
        {nodes}
      </Content>
    )
  }
}

export default DynamicContainer;
