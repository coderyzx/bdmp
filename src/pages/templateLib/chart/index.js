import React from 'react';
import { connect } from 'dva'
import router from 'umi/router';
import ReactECharts from 'echarts-for-react';
import { Icon, Button,Tooltip,Modal } from 'antd';
import styles from './index.less';
import CreateChart from './creatChart'
import dele from '@/assets/delete.svg';
import {handleOption} from '@/utils/templateLib'

@connect(({ chartModel }) => (
  {
    chartList: chartModel.chartList,
  }),
)
class Chart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible:false,
      confirmLoading:false,
      deleteId:'',
      deleteLoading:false,
      visible2:false,
      typeName:'',
    }
    // this.option = 
    // {
    //   "yAxis":{"type":"value"},
    //   "xAxis":{
    //     "data":["Mon","Tue","Wed","Thu","Fri","Sat","Sun"],
    //     "type":"category"
    //   },
    //   "series":[
    //     {
    //       "data":[150,230,224,218,135,147,260],
    //       "type":"line"
    //     }
    //   ]
    // }
  }

  componentDidMount () {
    const { dispatch } = this.props;
    const typeName = this.props.location.query.typeName;
    // console.log(typeName);
    dispatch({
      type: 'chartModel/getChartList',
      payload:typeName,
    });
  }
  componentWillReceiveProps(nextProps) {
    // 监听路由参数变化，重新渲染
    if (nextProps.location.query.typeName !==this.props.location.query.typeName) {
      const { dispatch } = this.props;
      const type = nextProps.location.query.typeName;
      dispatch({
        type: 'chartModel/getChartList',
        payload:type,
      });
    }
   }
  

  //添加
  showModal = () => {
    this.setState({ visible: true });
  };

  handleCancel = () => {
    this.setState({ visible: false });
  };

  handleCreate = () => {
    const { form } = this.formRef.props;
    const { dispatch } = this.props;
    form.validateFields((err, values) => {
      console.log('Received values of form: ', values);
      if (err) {//如果有一个校验不通过，代码将不再往下执行
        return;
      }
      this.setState({
        confirmLoading: true,
      });
      //校验通过，调接口传参
      dispatch({
        type: 'chartModel/postNewChart',
        payload: values,
        callback:()=>{
          const type = this.props.location.query.typeName;
          dispatch({
            type: 'chartModel/getChartList',
            payload:type,
          });
          this.timer1 = setTimeout(() => {
            this.setState({ 
              confirmLoading: false,
              visible: false,
            });
          }, 400);   
        }
      });
      form.resetFields();
    });
  };

  saveFormRef = formRef => {
    this.formRef = formRef;
  };

  //删除
  showDelete = (id) => {
    this.setState({ 
      visible2: true,
      deleteId:id,
    });
  };

  deleteSelection =() =>{
    const {dispatch} = this.props;
    const {deleteId} = this.state;
    this.setState({ 
      deleteLoading:true, 
    });
    dispatch({
      type: 'chartModel/getDeleteChart',
      payload: deleteId,
      callback:()=>{
        const type = this.props.location.query.typeName;
        dispatch({
          type: 'chartModel/getChartList',
          payload:type,
        });
        this.timer2 = setTimeout(() => {
          this.setState({
            deleteLoading:false, 
            visible2: false,
          });
        }, 400);
      }
    });
  };

  deleteSelectionCancel = () => {
    this.setState({ visible2: false });
  };

  //清除定时器
  componentWillUnMount = () => {
    clearTimeout( this.timer1);
    clearTimeout( this.timer2);
  }


  render() {
    const { chartList } = this.props;
    console.log(chartList);
    const typeName = this.props.location.query.typeName;
    const {confirmLoading,visible,deleteLoading,visible2} = this.state;
    const titleDelete = <p style={{ fontSize: 30,marginBottom:5,textAlign:'center'}}>删除</p>
    return (
      <div style={{ margin: '0 10px', minHeight: 'calc(100vh - 67x)' }}>
        <div  className={styles.chartTypeHead} >
          <h3 className={styles.chartTypeName}>{typeName}</h3>
          <Button type="primary" size="large" className={styles.chartNew}
           onClick={this.showModal}
          >
            新增图表
          </Button>
          <CreateChart
            wrappedComponentRef={this.saveFormRef}
            visible={visible}
            onCancel={this.handleCancel}
            onCreate={this.handleCreate}
            confirmLoading={confirmLoading}
          />
          <Modal
            okType= 'danger'
            title={titleDelete}
            visible={visible2}
            onOk={this.deleteSelection}
            onCancel={this.deleteSelectionCancel}
            confirmLoading={deleteLoading}
          >
            <p style={{textAlign:'center',marginBottom:15}}>
              <img src={dele} />
            </p>
            <p className={styles.selectItem}>
              确认删除吗？
            </p>
          </Modal>
        </div>
        {
          chartList.length ?
          (chartList || []).map(item => (
            <div key={item.id} style={{ marginRight: '-15px', marginLeft: '-15px' }}>
              <div className={styles.colItem} >
                <div className={styles.listItem}>
                  <div className={styles.listImg}>
                    <div className={styles.img}>
                      {

                        <ReactECharts
                          ref={e => {
                          this.echarts_react = e;
                          }}
                          option = {handleOption(item.option)}
                        />
                      }
                    </div>
                    <div className={styles.mask} >
                      <div className={styles.icon} >
                        <Tooltip placement="top" title="编辑">
                          <Button type="primary" size="large" style={{ fontSize: 40, height: 60,}} 
                            onClick={() => router.push(`/editor?id=${item.id}`)}
                          >
                            <Icon type="edit" />
                          </Button>
                        </Tooltip>
                        <div  style={{width:30}} />
                        <Tooltip placement="top" title="删除">
                          <Button type="danger" size="large" 
                          style={{fontSize: 40, height: 60,}} 
                          onClick={()=>this.showDelete(item.id)}
                          >
                            <Icon type="delete" />
                          </Button>
                        </Tooltip>
                      </div>
                    </div>
                  </div>
                  <h4 className={styles.title}>{item.title}</h4>
                </div>
              </div>
            </div>
          ))
          :
          null
        }
      </div>
    )
  }
}

export default Chart;
