import React from 'react';
import ReactECharts from 'echarts-for-react';
import { connect } from 'dva'
import router from 'umi/router'
import { Layout, Button, Icon, notification, Spin } from 'antd';
// import domtoimage from 'dom-to-image';
import Mirror from './mirror';
import styles from './index.less';
import EditableForm from './editable';
import { addToolOption } from '@/utils/chart';

const { Content } = Layout;

@connect(({ chartModel }) => (
  {
    chartEdit: chartModel.chartEdit,
  }),
)
class Editor extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      visible: false,
      loading: false,
      optionValue: {},
      isShow: false,
      isLoading: true,
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    // console.log(this.props.location.query.id);
    const { id } = this.props.location.query;
    dispatch({
      type: 'chartModel/getChart',
      payload: id,
      callback: response => {
        if (response.code === 'U000000') {
          const { chartEdit } = this.props;
          this.setState({
            optionValue: chartEdit.option,
            isShow: true,
            isLoading: false,
          })
        } else {
          const args = {
            message: '提示',
            description: '获取图表代码数据失败',
          };
          this.setState({
            isLoading: false,
          })
          notification.info(args);
        }
      },
    })
  }

  componentWillReceiveProps(newProps) {
    const { dispatch } = this.props;
    if (newProps.location.query.id !== this.props.location.query.id) {
      dispatch({
        type: 'chartModel/getChart',
        payload: newProps.location.query.id,
        callback: response => {
          if (response.code === 'U000000') {
            const { chartEdit } = this.props;
            this.setState({
              optionValue: chartEdit.option,
              isShow: true,
              isLoading: false,
            })
          } else {
            const args = {
              message: '提示',
              description: '获取图表代码数据失败',
            };
            this.setState({
              isLoading: false,
            })
            notification.info(args);
          }
        },
      })
    }
  }

  // 编辑图表名称和类型
  showEdit = () => {
    this.setState({
      visible: true,
    });
  };

  cancelEdit = () => {
    this.setState({ visible: false });
  };

  saveEdit = () => {
    const { form } = this.formRefEdit.props;
    const { dispatch } = this.props;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      const { id } = this.props.location.query;
      const parameter = values;
      parameter.id = id;
      // console.log(parameter);
      dispatch({
        type: 'chartModel/postUpdateChart',
        payload: parameter,
        callback: res => {
          if (res.code === 'U000000') {
            dispatch({
              type: 'chartModel/getChart',
              payload: id,
            })
            this.setState({ visible: false });
            const args = {
              message: '提示',
              description: '保存图表类型和名称成功',
            };
            notification.success(args);
          } else {
            this.setState({ visible: false });
            const args = {
              message: '提示',
              description: '保存图表类型和名称失败',
            };
            notification.info(args);
          }
        },
      });
      form.resetFields();
    });
  };

  saveRef = formRefEdit => {
    this.formRefEdit = formRefEdit;
  };

  dataURLtoFile = dataurl => {
    const arr = dataurl.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    const array = [];
    for (let i = 0; i < bstr.length; i += 1) {
     array.push(bstr.charCodeAt(i));
   }
   return new Blob([new Uint8Array(array)], { type: mime });
  }

  blobToFile = (theBlob, fileName) => {
    const val = theBlob;
    val.lastModifiedDate = new Date();
    val.name = fileName;
    return theBlob;
  }

  // 保存
  handleSave = () => {
    const { dispatch, chartEdit } = this.props;
    const { optionValue } = this.state;
    const { id } = this.props.location.query;
    const newData = {};
    newData.optionjson = JSON.stringify(optionValue, null, '\t');
    newData.id = id;
    // const formData = new FormData();
    // domtoimage.toPng(document.getElementById('chartViewWrap'), { quality: 1 })
    // .then(dataUrl => {
      // const blob = this.dataURLtoFile(dataUrl);
      // const file = this.blobToFile(blob, `${chartEdit.typename}-${chartEdit.title}-${id}.png`);
      // const img = new Image();
      // img.src = dataUrl;
      // newData.mark = newDataUrl;
      // const newDataUrl = dataUrl.split('base64,')[1];
      // formData.append('id', id);
      // formData.append('optionjson', JSON.stringify(optionValue, null, '\t'));
      // formData.append('mark', newDataUrl);
      // console.log(formData);
    // })
    dispatch({
      type: 'chartModel/postUpdateChart',
      payload: newData,
      callback: res => {
        if (res.code === 'U000000') {
          dispatch({
            type: 'chartModel/getChart',
            payload: id,
          })
          const args = {
            message: '提示',
            description: '保存图表option成功',
          };
          notification.success(args);
          router.push(`/templateLib/chart?typeName=${chartEdit.typename}`)
        } else {
          const args = {
            message: '提示',
            description: '保存图表option失败',
          };
          notification.info(args);
          router.push(`/templateLib/chart?typeName=${chartEdit.typename}`)
        }
      },
    })
  }

  goBack = () => {
    this.setState({
      isShow: false,
    })
    const { dispatch, chartEdit } = this.props;
    dispatch({
      type: 'chartModel/getChartList',
      payload: chartEdit.typename,
    });
    router.goBack()
  }

  onChange = valueonChange => {
    this.setState({
      optionValue: valueonChange,
    })
  }

  render() {
    const { chartEdit } = this.props;
    // console.log(chartEdit);
    const { visible, loading, optionValue, isShow, isLoading } = this.state;
    // const examDataLoading = loading.
    return (
      <Content
        className={styles.content}
       >
        <EditableForm
          wrappedComponentRef={this.saveRef}
          visible={visible}
          onCancel={this.cancelEdit}
          onCreate={this.saveEdit}
          confirmLoading={loading}
          editData={chartEdit}
        />
        <div className={styles.bar} >
          <Button type="primary"
            onClick={this.goBack}
            className={styles.goBack}
          >
            <Icon type="left" />
            返回
          </Button>
          <div>
            <Button type="primary" className={styles.title}
              onClick={this.showEdit}
            >
              {chartEdit.title}
              <Icon type="edit" />
            </Button>
            <Button type="primary"
              onClick={this.handleSave}
              className={styles.save}
            >
              保存
              <Icon type="save" />
            </Button>
          </div>
        </div>
        { isLoading && <div className={styles.spin}><Spin size="large" tip="加载中...数据较为复杂请稍后" /></div>}
        {isShow && <div className={styles.box} >
          <div className={styles.mirror}>
            <div className={styles.mirrorTitle} >
              图表代码
              {/* <Button type="primary"
              onClick={() => this.handleStart()}
              className={styles.start}
              >
                运行
              </Button> */}
            </div>
            <Mirror
            value={JSON.stringify(chartEdit.option, null, '\t')}
            handleStart={this.handleStart}
            onChange={valueonChange => { this.onChange(valueonChange) }}
            />
          </div>
          <div className={styles.chart} >
            <div className={styles.chartTitle} >图表示例预览</div>
            <div id="chartViewWrap"
              style={{ width: '100%',
              height: '95%' }}
            >
              <ReactECharts
                ref={e => {
                  this.echarts_react = e;
                }}
                option = {addToolOption(optionValue)}
                className={styles.chartContent}
              />
            </div>
          </div>
        </div>
        }
      </Content>
    )
  }
}

export default Editor;
