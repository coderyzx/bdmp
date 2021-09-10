import React from 'react';
import ReactECharts from 'echarts-for-react';
import { connect } from 'dva'
import router from 'umi/router'
import { Layout, Button, Icon, notification } from 'antd';
import Mirror from './mirror';
import styles from './index.less';
import EditableForm from './editable'

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
      optionValue: this.props.chartEdit.option,
      isShow: false,
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    // console.log(this.props.location.query.id);
    const { id } = this.props.location.query;
    dispatch({
      type: 'chartModel/getChart',
      payload: id,
      callback: () => {
        const { chartEdit } = this.props;
        this.setState({
          optionValue: chartEdit.option,
          isShow: true,
        })
      },
    })
  }

  componentWillReceiveProps(newProps) {
    const { dispatch } = this.props;
    if (newProps.location.query.id !== this.props.location.query.id) {
      dispatch({
        type: 'chartModel/getChart',
        payload: newProps.location.query.id,
        callback: () => {
          const { chartEdit } = this.props;
          this.setState({
            optionValue: chartEdit.option,
            isShow: true,
          })
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
    this.setState({
      loading: true,
    });
    form.validateFields((err, values) => {
      if (err) { // 如果有一个校验不通过，代码将不再往下执行
        return;
      }
      const { id } = this.props.location.query;
      const parameter = values;
      parameter.id = id;
      // 校验通过，调接口传参
      dispatch({
        type: 'chartModel/postUpdateChart',
        payload: parameter,
        callback: () => {
          dispatch({
            type: 'chartModel/getChart',
            payload: id,
          })
          this.setState({
            visible: false,
            loading: false,
          });
        },
      });
      form.resetFields();
    });
  };

  saveRef = formRefEdit => {
    this.formRefEdit = formRefEdit;
  };

  // 运行代码块
  handleStart=option => {
    console.log(option);
    const { dispatch, chartEdit } = this.props;
    dispatch({
      type: 'chartModel/postUpdateChart',
      payload: chartEdit.option,

    })
  }

  // 保存

  handleSave = option => {
    console.log(option)
    const { dispatch } = this.props;
    dispatch({
      type: 'chartModel/postUpdateChart',
      payload: option,
      callback: () => {
        const { id } = this.props.location.query;
        console.log(id);
        dispatch({
          type: 'chartModel/getChart',
          payload: id,
        })
        const args = {
          message: '提示',
          description: '保存图表成功',
        };
        notification.open(args);
      },
    })
  }

  goBack = () => {
    this.setState({
      // optionValue: '',
      isShow: false,
    })
    router.goBack()
  }


  render() {
    const { chartEdit } = this.props;
    // console.log(JSON.parse(chartEdit.optionjson));
    const { visible, loading, optionValue, isShow } = this.state;
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
          <Button type="primary" size="large"
            onClick={this.goBack}
            className={styles.goBack}
          >
            <Icon type="left" />
            返回
          </Button>
          <div>
            <Button type="primary" size="large" className={styles.title}
              onClick={this.showEdit}
            >
              {chartEdit.title}
              <Icon type="edit" />
            </Button>
            <Button type="primary" size="large"
               onClick={this.handleSave}
              className={styles.save}
            >
              保存
              <Icon type="save" />
            </Button>
          </div>
        </div>
        {isShow && <div className={styles.box} >
          <div className={styles.mirror}>
            <div className={styles.mirrorTitle} >
              图表代码
              <Button type="primary"
              onClick={() => this.handleStart()}
              className={styles.start}
              >
                运行
              </Button>
            </div>
            <Mirror
            // value={chartEdit.optionjson}
            // value={optionValue}
            // value={JSON.stringify(optionValue, null, '\t')}
            value={JSON.stringify(chartEdit.option, null, '\t')}
            handleStart={this.handleStart} />
          </div>
          <div className={styles.chart} >
            <div className={styles.chartTitle} >图表示例预览</div>
            <ReactECharts
              ref={e => {
                this.echarts_react = e;
              }}
              option = {optionValue}
              className={styles.chartContent}
            />
          </div>
        </div>
        }
      </Content>
    )
  }
}

export default Editor;
