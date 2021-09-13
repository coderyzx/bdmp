import React from 'react';
import moment from 'moment';
import { Button, Empty, Table, Divider, Drawer, Icon, Modal, Input, Select } from 'antd';

import { getDashboardList, addDashboard, deleteDashboard, getProject, getGroup,
  createContainer2Dashboard,
  getContainerForDashboard } from '@/services/dashBoard';
// import ContainerManagement from './components/ContainerManagement';
import { addNewContainer2Dashboard } from '@/utils/formatDashBoard';

import styles from './index.less'

const { Option } = Select;

class DashboardManagement extends React.Component {
  columns = [
    {
      title: '业务主题场景',
      dataIndex: 'projectName',
      key: 'projectName',
    },
    {
      title: '仪表盘所在文件夹',
      dataIndex: 'groupName',
      key: 'groupName',
    },
    {
      title: '发布状态',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: '创建人',
      dataIndex: 'createBy',
      key: 'createBy',
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
      width: '170px',
      render: val => moment(val).format('YYYY-MM-DD HH:mm:ss'),
    },
    {
      title: '仪表盘名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '仪表盘编号',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '操作',
      dataIndex: 'action',
      key: 'action',
      // render三个参数：行的值，行数据，行索引
      render: (text, rec) => (
        <span>
          <span className={styles.action} onClick = {() => this.handleEdit(rec)}>编辑</span>
          <Divider type="vertical" />
          <span className={styles.action} onClick = {() => this.handleDelete(rec)}>删除</span>
        </span>
      ),
    },
  ];

  constructor(props) {
    super(props);
    this.state = {
      dashboardList: [],
      projectList: [],
      groupList: [],
      dashboardName: '',
      selectedProjectId: '',
      selectedGroupId: '',
      dashboardVisible: false,
      saveVisible: false,
      containerList: [],
    }
  }

  componentDidMount() {
  //  this.getPageData();
  }

  getPageData = async () => {
    const dashboardList = await this.getDashboardListData();
    this.setState({ dashboardList });
  }

  getDashboardListData = async () => {
    const res = await getDashboardList();
    return res.data;
  }

  // 先弹窗
  createDashboard = async () => {
    const res = await getProject();
    this.setState({ saveVisible: true, dashboardName: '', projectList: res.data });
  }

  handleEdit = async rec => {
    const { name, id } = rec;
    this.displayId = id;
    const res = await getContainerForDashboard(this.displayId);
    if (res.code === 'U000000') {
      this.setState({
        containerList: res.data,
        dashboardVisible: true,
        dashboardName: name,
      })
    }
  }

  closeDashboard = async () => {
    const dashboardList = await this.getDashboardListData();
    this.displayId = null;
    this.setState({
      dashboardVisible: false,
      dashboardList,
      containerList: [],
    });
  }

  closeSave = () => {
    this.setState({ saveVisible: false });
  }

  saveDashboard = () => {
   // this.setState({ saveVisible: true })
  }

  selectProject = async value => {
   // console.log('project', value);
    const res = await getGroup({ projectId: value });
    this.setState({ selectedProjectId: value, groupList: res.data });
  }

  selectGroup = value => {
    // console.log('group', value);
    this.setState({ selectedGroupId: value });
  }

  addNewDashboard = async () => {
    const { dashboardName, selectedProjectId, selectedGroupId } = this.state;
    const { userId } = localStorage;
    const res = await addDashboard({
      name: dashboardName,
      createBy: userId,
      projectId: selectedProjectId,
      groupId: selectedGroupId,
     });
    if (res.code === 'U000000') {
      // const dashboardList = await this.getDashboardListData();
      this.displayId = res.data.id;
      this.setState({
        saveVisible: false,
       // dashboardList,
        dashboardVisible: true,
        // dashboardName: '',
      });
    }
  }

  handleDelete = async rec => {
    // console.log(rec);
    const { id } = rec;
    const res = await deleteDashboard(id);
    if (res.code === 'U000000') {
      const dashboardList = await this.getDashboardListData();
      this.setState({
        saveVisible: false,
        dashboardName: '',
        dashboardList,
      });
    }
  }

  handleNameChange = e => {
    // console.log(e.target.value)
    const val = e.target.value;
    this.setState({ dashboardName: val });
  }

  // onContainerChange = data => {
  //   this.containersData = data;
  //   const reqParams = addNewContainer2Dashboard(this.containersData)
  // }

  onContainerCreate = async (data, callback) => {
    this.containersData = data;
    const reqParams = addNewContainer2Dashboard(this.containersData);
    const { userId } = localStorage;
    const res = await createContainer2Dashboard(this.displayId, reqParams, {
      createBy: userId,
    });
    if (res.code === 'U000000' && callback) {
      callback();
    }
  }

  showSaveModal = () => {
    console.log(this.containersData);
  }

  renderList = () => {
    const { dashboardList } = this.state;
    if (dashboardList && dashboardList.length) {
      return (
        <Table
          rowSelection={{}}
          rowKey="id"
          dataSource={dashboardList}
          columns={this.columns}
        />
      )
    }
    return (<Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />);
  }

  renderDrawerTitle = () => (
    <div className={styles.drawerTitle}>
      <div className={styles.left}>
        <Icon type="left-circle" theme="filled" className={styles.icon}/>
        <span onClick={this.closeDashboard}>返回列表</span>
        <Input
          className={styles.nameInput}
          placeholder="请输入仪表盘名称"
          value={this.state.dashboardName}
          onChange={e => this.handleNameChange(e)}
        />
      </div>
      <div className={styles.right}>
        <Button type="primary" onClick={this.saveDashboard}>保存</Button>
      </div>
    </div>
  )

  renderDashboard = () => {
    const { dashboardVisible, containerList } = this.state;
    // console.log(curdashboardId)
    return (
      <Drawer
        title={this.renderDrawerTitle()}
        placement="right"
        visible={dashboardVisible}
        getContainer={false}
        onClose={this.closeDashboard}
        destroyOnClose
        closable={false}
        style={{ position: 'absolute' }}
        width="100%"
        height="100%"
      >
        <div className={styles.drawerBody}>
          <div className={styles.addItem}>
            <Button className={styles.showChartBtn} onClick={this.showChart}>
              + 图表组件
            </Button>
          </div>
          {/* <ContainerManagement
            containerList={containerList}
            onContainerCreate={this.onContainerCreate}
          /> */}
        </div>
      </Drawer>
    )
  }

  render() {
    const {
      dashboardList,
      dashboardVisible,
      saveVisible,
      dashboardName,
      projectList,
      groupList,
    } = this.state;
    const listNode = this.renderList()
    return (
      <div className={styles.wrapper}>
        <div className={styles.wrapHeader}>
          <Button className={styles.createBtn} onClick={this.createDashboard}>
            + 创建仪表板
          </Button>
        </div>
        <div className={styles.wrapMain}>
          <div className={styles.Listdesc}>{`仪表板列表 | 共${dashboardList && dashboardList.length}条记录`}</div>
          <div className={styles.dashboardListStyle}>
            {listNode}
          </div>
        </div>
        {dashboardVisible && this.renderDashboard()}
        <Modal
          title="保存仪表板"
          visible={saveVisible}
          destroyOnClose
          centered
          closable={false}
          onOk={this.addNewDashboard}
          onCancel={this.closeSave}
        >
          <div className={styles.saveBody}>
            <label style={{ display: 'block', margin: '5px' }}>仪表板名称：</label>
            <Input placeholder="请输入仪表盘名称" value={dashboardName} onChange={e => this.handleNameChange(e)}/>
            <label style={{ display: 'block', margin: '5px' }}>仪表板所属主题: </label>
            <Select onChange={this.selectProject} style={{ width: '100%' }}>
              {
                projectList.map(item =>
                  <Option key={item.id} value={item.id}>
                    {item.name}
                  </Option>,
                  )
              }
            </Select>
            <label style={{ display: 'block', margin: '5px' }}>仪表板存放文件夹: </label>
            <Select onChange={this.selectGroup} style={{ width: '100%' }}>
              {
                groupList.map(item =>
                  <Option key={item.id} value={item.id}>
                    {item.name}
                  </Option>,
                  )
              }
            </Select>
          </div>
        </Modal>
      </div>
    )
  }
}
export default DashboardManagement;
