import React from 'react';
import moment from 'moment';
import { Button, Empty, Table, Divider, Drawer, Icon, Modal, Input, Form, Select, Popconfirm, notification, Spin } from 'antd';
import { connect } from 'dva';
import dele from '@/assets/delete.svg';
// import { getDashboardList, addDashboard, deleteDashboard, getMenuPage,
//   createContainer2Dashboard,
//   getContainerForDashboard } from '@/services/dashBoard';
import ContainerManagement from './components/ContainerManagement';
import { addNewContainer2Dashboard } from '@/utils/formatDashBoard';
import styles from './index.less'
import CreateForm from './components/CreatForm';

const { Option } = Select;

@connect(({ dashBoard }) => ({
  totalCount: dashBoard.totalCount,
  current: dashBoard.current,
  pageSize: dashBoard.pageSize,
  dashboardList: dashBoard.dashboardList,
  menuList: dashBoard.menuList,
}))
class DashboardManagement extends React.Component {
  columns = [
    {
      title: '仪表盘名称',
      dataIndex: 'name',
      key: 'name',
      align: 'center',
    },
    {
      title: '业务主题场景',
      dataIndex: 'businessTheme',
      key: 'businessTheme',
      align: 'center',
    },
    {
      title: '创建人',
      dataIndex: 'createUserId',
      key: 'createUserId',
      align: 'center',
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
      width: '170px',
      align: 'center',
      render: val => moment(val).format('YYYY-MM-DD HH:mm:ss'),
    },
    {
      title: '修改人',
      dataIndex: 'modifyUserId',
      key: 'modifyUserId',
      align: 'center',
    },
    {
      title: '修改时间',
      dataIndex: 'modifyDatatime',
      key: 'modifyDatatime',
      align: 'center',
    },
    {
      title: '菜单页面关联',
      dataIndex: 'layout',
      key: 'layout',
      align: 'center',
    },
    {
      title: '操作',
      dataIndex: 'action',
      key: 'action',
      align: 'center',
      // render三个参数：行的值，行数据，行索引
      render: (text, rec) => (
        <span>
          <span className={styles.action} onClick = {() => this.handleEdit(rec)}>编辑</span>
          <Divider type="vertical" />
          <span className={styles.action} onClick = {() => this.addChart(rec)}>添加图表</span>
          <Divider type="vertical" />
          <Popconfirm
            title="确认删除吗?"
            onConfirm={() => this.handleDelete(rec)}
            icon={<Icon type="question-circle-o" style={{ color: 'red' }} />}
            okType="danger"
          >
            <span className={styles.action}>删除</span>
          </Popconfirm>
        </span>
      ),
    },
  ];

  constructor(props) {
    super(props);
    this.state = {
      dashboardName: '',
      themeName: '',
      createUserName: '',
      selectedProjectName: '',
      dashboardVisible: false,
      saveVisible: false,
      containerList: [],
      selectedRowKeys: [],
      visibleDelete: false,
      examDataLoading: false,
    }
  }

  componentDidMount() {
    const pagination = {
      current: 1,
      pageSize: 10,
    };
    this.getPageData(pagination);
  }

  getPageData = pagination => {
    const { dispatch } = this.props;
    this.setState({ examDataLoading: true });
    dispatch({
      type: 'dashBoard/getList',
      payload: pagination,
      callback: () => {
        this.setState({
          examDataLoading: false,
        });
      },
      failCallback: () => {
        this.setState({
          examDataLoading: false,
        });
        const args = {
          message: '提示',
          description: '操作失败',
        };
        notification.info(args);
      },
    });
  }

  // getDashboardListData = async pagination => {
  //   const res = await getDashboardList(pagination);
  //   return res.data;
  // }

  // 分页
  pageChange = page => {
    const newPage = {};
    newPage.current = page.current;
    newPage.pageSize = page.pageSize;
    this.getPageData(newPage)
    // dispatch({
    //   type: 'dashBoard/getList',
    //   payload: { current: page.current, pageSize: page.pageSize },
    //   callback: () => {
    //     this.setState({
    //       examDataLoading: false,
    //     });
    //   },
    // });
    // const newPage = this.state.pagination;
    // newPage.current = page.current;
    // newPage.pageSize = page.pageSize;
    // this.setState({ pagination: newPage })
  }

  // 先弹窗
  createDashboard = () => {
    this.setState({
      saveVisible: true,
    });
  }

  // 新增
  addNewDashboard = () => {
    // const { dashboardName, selectedProjectName, themeName,
    // createUserName } = this.state;
    const { form } = this.formRef.props;
    const { dispatch, current, pageSize } = this.props;
    // const pagination = { current, pageSize };
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      dispatch({
        type: 'dashBoard/addList',
        payload: { values, current, pageSize },
        callback: res => {
          if (res.code === 'U000000') {
            this.setState({
              saveVisible: false,
            });
            const args = {
              message: '提示',
              description: '新建数据成功',
            };
            notification.success(args);
          } else {
            this.setState({
              saveVisible: false,
            });
            const args = {
              message: '提示',
              description: '新建数据失败',
            };
            notification.info(args);
          }
        },
      });
      form.resetFields();
    });
      // const { current, pageSize } = this.props;
      // const pagination = { current, pageSize }
      // const data = await this.getDashboardListData(pagination);
      // const dashboardList = data.lists;
      // this.displayId = res.data.id;
  }

  closeSave = () => {
    this.setState({ saveVisible: false });
  }

  saveFormRef = formRef => {
    this.formRef = formRef;
  };

  saveDashboard = () => {
   // this.setState({ saveVisible: true })
  }

  // 编辑
  handleEdit = rec => {
    this.setState({
      saveVisible: true,
    });
    const { name, id } = rec;
    this.displayId = id;
    // const res = await getContainerForDashboard(this.displayId);
    // if (res.code === 'U000000') {
    //   this.setState({
    //     containerList: res.data,
    //     dashboardVisible: true,
    //     dashboardName: name,
    //   })
    // }
  }

  // 添加图表
  // addChart = async rec => {
  //   const { name, id } = rec;
  //   this.displayId = id;
  //   const res = await getContainerForDashboard(this.displayId);
  //   if (res.code === 'U000000') {
  //     this.setState({
  //       containerList: res.data,
  //       dashboardVisible: true,
  //       dashboardName: name,
  //     })
  //   }
  // }

  // closeDashboard = async () => {
  //   const { pagination } = this.state;
  //   const data = await this.getDashboardListData(pagination);
  //   const dashboardList = data.lists;
  //   this.displayId = null;
  //   this.setState({
  //     dashboardVisible: false,
  //     dashboardList,
  //     containerList: [],
  //   });
  // }

  // 删除
  handleDelete = rec => {
    const { id } = rec;
    const { dispatch, current, pageSize } = this.props;
    dispatch({
      type: 'dashBoard/deleteById',
      payload: { id, current, pageSize },
      callback: res => {
        if (res.code === 'U000000') {
          const args = {
            message: '提示',
            description: '删除成功',
          };
          notification.success(args);
        } else {
          const args = {
            message: '提示',
            description: '删除失败',
          };
          notification.info(args);
        }
      },
    });
  }

  // onContainerCreate = async (data, callback) => {
  //   this.containersData = data;
  //   const reqParams = addNewContainer2Dashboard(this.containersData);
  //   const { userId } = localStorage;
  //   const res = await createContainer2Dashboard(this.displayId, reqParams, {
  //     createBy: userId,
  //   });
  //   if (res.code === 'U000000' && callback) {
  //     callback();
  //   }
  // }

  showSaveModal = () => {
    console.log(this.containersData);
  }

  // 删除多行
  showDelete = () => {
    this.setState({ visibleDelete: true });
  };

  // 选中table整行
  selectRow = record => {
    const { selectedRowKeys } = this.state;
    const selectRow = selectedRowKeys;
    if (selectRow.indexOf(record.id) >= 0) {
      selectRow.splice(selectRow.indexOf(record.id), 1);
    } else {
      selectRow.push(record.id);
    }
    this.setState({ selectedRowKeys: selectRow })
  }

  onSelectChange = selectedRowKeys => {
    this.setState({ selectedRowKeys });
  };

  deleteSelection = selectedRowKeys => {
    const { dispatch, current, pageSize } = this.props;
    this.setState({
      selectedRowKeys: [],
      visibleDelete: true,
    });
    dispatch({
      type: 'dashBoard/deleteList',
      payload: { selectedRowKeys, current, pageSize },
      callback: res => {
        if (res.code === 'U000000') {
          this.setState({
            visibleDelete: false,
          });
          const args = {
            message: '提示',
            description: '批量删除成功',
          };
          notification.success(args);
        } else {
          this.setState({
            visibleDelete: false,
          });
          const args = {
            message: '提示',
            description: '批量删除失败',
          };
          notification.info(args);
        }
      },
    });
  };

  deleteSelectionCancel = () => {
    this.setState({ visibleDelete: false });
  };

  renderList = () => {
    const { selectedRowKeys, visibleDelete, examDataLoading } = this.state;
    const { totalCount, current, pageSize, dashboardList } = this.props;
    const pagination = { total: totalCount, current, pageSize }
    const paginationProps = {
      showQuickJumper: true,
      showSizeChanger: true,
      ...pagination,
      showTotal: () => `共${totalCount}条`,
    }
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };
    const hasSelected = selectedRowKeys.length > 0;
    const titleDelete = <p style={{ fontSize: 30, marginBottom: 5, textAlign: 'center' }}>删除</p>;
    const renderList = dashboardList.length > 0 && !examDataLoading;
    const emptyList = dashboardList.length === 0 && !examDataLoading;
    return (
      <>
        { examDataLoading && <div className={styles.spin}><Spin />加载中...</div>}
        { emptyList && <Empty image={Empty.PRESENTED_IMAGE_SIMPLE}/> }
        { renderList &&
        <>
          <Table
            bordered
            rowKey="id"
            dataSource={dashboardList}
            columns={this.columns}
            pagination={paginationProps}
            onChange={this.pageChange}
            rowSelection={rowSelection}
            onRow={record => ({
              onDoubleClick: () => {
                this.selectRow(record);
              },
            })}
          />
          <Modal
          okType="danger"
          title={titleDelete}
          visible={visibleDelete}
          onOk={() => this.deleteSelection(selectedRowKeys)}
          onCancel={this.deleteSelectionCancel}
          >
            <p style={{ textAlign: 'center', marginBottom: 15 }}>
              <img src={dele} />
            </p>
            <p className={styles.selectItem}>
              确认删除所选择的&nbsp;<b>{hasSelected ? `${selectedRowKeys.length}` : ''}</b>
              &nbsp;项吗？
            </p>
          </Modal>
        </>
        }
      </>
    )
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
          {/* <div className={styles.addItem}>
            <Button className={styles.showChartBtn} onClick={this.showChart}>
              + 图表组件
            </Button>
          </div> */}
          <ContainerManagement
            containerList={containerList}
            onContainerCreate={this.onContainerCreate}
          />
        </div>
      </Drawer>
    )
  }

  render() {
    const {
      dashboardVisible,
      saveVisible,
      dashboardName,
      themeName,
      createUserName,
      selectedRowKeys,
    } = this.state;
    const { menuList, totalCount } = this.props;
    const listNode = this.renderList()
    const hasSelected = selectedRowKeys.length > 0;
    return (
      <div className={styles.wrapper}>
        <div className={styles.wrapHeader}>
          <Button className={styles.createBtn} onClick={this.createDashboard} type="primary" size="large" >
            + 创建仪表盘
          </Button>
          <Button
            type="danger"
            size="large"
            onClick={this.showDelete}
            disabled={!hasSelected}
            icon="delete"
            style={{ fontSize: 18 }}
          >
            批量删除
          </Button>
        </div>
        <div className={styles.wrapMain}>
          <span className={styles.desc} style={{ margin: 10, fontSize: 16 }}>
            {`仪表板列表 | 共${totalCount || 0}条记录`}
          </span>
          <div className={styles.dashboardListStyle}>
            {listNode}
          </div>
        </div>
        {dashboardVisible && this.renderDashboard()}
        <CreateForm
          wrappedComponentRef={this.saveFormRef}
          visible={saveVisible}
          onCancel={this.closeSave}
          onCreate={this.addNewDashboard}
        />
        {/* <Modal
          visible={saveVisible}
          title="创建仪表盘"
          destroyOnClose
          centered
          // closable={false}
          // onOk={this.addNewDashboard}
          onCancel={this.closeSave}
          footer={[
            <Button key="back" onClick={this.closeSave}>
              取消
            </Button>,
            <Button key="reset" type="danger" onClick={this.handleReset}>
              重置
            </Button>,
            <Button key="submit" type="primary" onClick={this.addNewDashboard}>
              确定
            </Button>,
          ]}
        >
          <div className={styles.saveBody}>
            <label style={{ display: 'block', margin: '5px' }}>仪表盘名称：</label>
            <Input placeholder="请输入仪表盘名称" value={dashboardName} onChange={e => this.handleNameChange(e)}/>
            <label style={{ display: 'block', margin: '5px' }}>业务主题场景：</label>
            <Input placeholder="请输入业务主题场景" value={themeName} onChange={e => this.handleThemeChange(e)}/>
            <label style={{ display: 'block', margin: '5px' }}>创建人：</label>
            <Input placeholder="请输入创建人" value={createUserName} onChange={e => this.handleCreateUserChange(e)}/>
            <label style={{ display: 'block', margin: '5px' }}>关联菜单页面：</label>
            <Select
            onChange={this.selectProject}
            style={{ width: '100%' }}
            filterOption={(input, option) =>
              option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
            >
              {
                (menuList || []).map(item =>
                  <Option key={item.id} value={item.id}>
                    {item}
                  </Option>,
                )
              }
            </Select>
            <span style={{ display: 'block', marginTop: '10px', color: 'green' }} >温馨提示：创建仪表盘后，请添加图表</span>
          </div>
        </Modal> */}
      </div>
    )
  }
}
export default DashboardManagement;
