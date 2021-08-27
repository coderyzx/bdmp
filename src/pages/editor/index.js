import React from 'react';
import ReactECharts from 'echarts-for-react';
import { connect } from 'dva'
import router from 'umi/router'
import Mirror from './mirror';
import styles from './index.less';
import { Layout,Button,Icon,notification } from 'antd';
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
      visible:false,
      loading:false,
      codeValue:''
    };
  }
  componentDidMount(){
    const {dispatch} =this.props;
    // console.log(this.props.location.query.id);
    const id = this.props.location.query.id;
    dispatch({
      type:'chartModel/getChart',
      payload:id,
    })
  }

  //编辑图表名称和类型
  showEdit = ()=> {
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
      // console.log('Received values of form: ', values);
      if (err) {//如果有一个校验不通过，代码将不再往下执行
        return;
      }
      //校验通过，调接口传参
      dispatch({
        type: 'chartModel/postUpdateChart',
        payload: values,
        callback:()=>{
          const id = this.props.location.query.id;
          dispatch({
            type:'chartModel/getChart',
            payload:id,
          })
          this.timer1 = setTimeout(() => {
            this.setState({ 
              visible: false,
              loading: false 
            });
          }, 500);
        }
      });
      form.resetFields();
    });
  };

  saveRef = formRefEdit => {
    this.formRefEdit = formRefEdit;
  };

  handleSaveValue =(value)=>{
    this.setState({
      codeValue : value,
    })
  }

  //运行代码块
  handleStart=(option)=>{
    console.log(option);
    const {dispatch,chartEdit} =this.props;
    dispatch({
      type:'chartModel/postUpdateChart',
      payload:chartEdit.option,
      
    })
  }

  //保存

  handleSave = (option)=>{
    console.log(option)
    const {dispatch} =this.props;
    dispatch({
      type:'chartModel/postUpdateChart',
      payload:option,
      callback:()=>{
        const id = this.props.location.query.id;
        dispatch({
          type:'chartModel/getChart',
          payload:id,
        })
        const args = {
          message: '提示',
          description:
            '保存图表成功',
          duration: 2,
        };
        notification.open(args);
      }
    })

  }


  componentWillUnMount = () => {
   //清除定时器
    clearTimeout( this.timer1);
  }

  render() {
    const { chartEdit } = this.props;
    const {visible,loading} = this.state;
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
        <div  className={styles.bar} >
          <Button type="primary" size='large'
            onClick={()=>router.goBack()}
            className={styles.goBack}
          >
            <Icon type="left" />
              返回
          </Button>
          <div>
            <Button type="primary" size='large' className={styles.title}
              onClick={this.showEdit}
            >
              {chartEdit.title}
              <Icon type="edit" />
            </Button>
            <Button type="primary" size='large'
               onClick={this.handleSave}
              className={styles.save}
            >
              保存
              <Icon type="save" />
            </Button>
          </div>
        </div>
        <div className={styles.box} >
          <div className={styles.mirror}>
            <div className={styles.mirrorTitle} >
              图表代码
              <Button type="primary" 
              onClick={()=>this.handleStart()}
              className={styles.start}
              >
                运行
              </Button>
            </div>
            <Mirror option={chartEdit.option} handleSaveValue={this.handleSaveValue} /> 
          </div>
          <div className={styles.chart} >
            <div className={styles.chartTitle} >图表示例预览</div>
            {
              chartEdit.option ?
              <ReactECharts
                ref={e => {
                  this.echarts_react = e;
                }}
                option = {chartEdit.option}
                className={styles.chartContent}
              />
              :
              null
            }
            
          </div>
        </div>
      </Content>
    )
  }
}

export default Editor;
