import React from 'react';
// import moment from 'moment';
import { Button, Empty, Table, Divider, Drawer, Icon, Modal, Popconfirm, notification, Spin } from 'antd';
import { connect } from 'dva';
import router from 'umi/router';
import dele from '@/assets/delete.svg';
import ContainerManagement from './components/ContainerManagement';
import styles from './index.less'
import CreateForm from './components/CreatForm';
import EditForm from './components/EditForm';


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
      width: '15%',
      ellipsis: true,
    },
    {
      title: '业务主题场景',
      dataIndex: 'businessTheme',
      key: 'businessTheme',
      align: 'center',
      width: '10%',
      ellipsis: true,
    },
    {
      title: '关联菜单页面',
      dataIndex: 'classLabel',
      key: 'classLabel',
      align: 'center',
      width: '10%',
      ellipsis: true,
    },
    {
      title: '创建人',
      dataIndex: 'createUserId',
      key: 'createUserId',
      align: 'center',
      width: '7%',
      ellipsis: true,
    },
    {
      title: '创建时间',
      dataIndex: 'createDatatime',
      key: 'createDatatime',
      align: 'center',
      width: '12%',
      ellipsis: true,
    },
    {
      title: '修改人',
      dataIndex: 'modifyUserId',
      key: 'modifyUserId',
      align: 'center',
      width: '7%',
      ellipsis: true,
    },
    {
      title: '修改时间',
      dataIndex: 'modifyDatatime',
      key: 'modifyDatatime',
      align: 'center',
      width: '12%',
      ellipsis: true,
    },
    {
      title: '操作',
      dataIndex: 'action',
      key: 'action',
      align: 'center',
      // render三个参数：行的值，行数据，行索引
      render: (text, rec) => (
        <span>
          <span className={styles.action} onClick = {() => this.handleEdit(rec)}>
            <i className="iconfont icon-edit">编辑</i>
          </span>
          <Divider type="vertical" />
          <span className={styles.action} onClick = {() => this.addChart(rec)}>
            <Icon type="area-chart" />
            添加图表
          </span>
          <Divider type="vertical" />
          <span className={styles.action} onClick = {() => this.handlePreview(rec)}>
            <i className="iconfont icon-dongtaiyulan">仪表盘预览</i>
          </span>
          <Divider type="vertical" />
          <Popconfirm
            title="确认删除吗?"
            onConfirm={() => this.handleDelete(rec)}
            icon={<Icon type="question-circle-o" style={{ color: 'red' }} />}
            okType="danger"
          >
            <span className={styles.action} >
              <i className="iconfont icon-shanchu">删除</i>
            </span>
          </Popconfirm>
        </span>
      ),
    },
  ];

  constructor(props) {
    super(props);
    this.state = {
      dashboardName: '',
      dashboardVisible: false,
      saveVisible: false,
      containerList: [],
      selectedRowKeys: [],
      visibleDelete: false,
      examDataLoading: false,
      editData: {},
      editVisible: false,
      displayId: 1,
      pagination: {
        current: 1,
        pageSize: 10,
      },
      confirmLoading: false, // 添加是否加载
      editLoading: false, // 编辑保存是否加载
      deleteLoading: false, // 选择多行删除是否加载
    }
  }

  componentDidMount() {
    const { pagination } = this.state;
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
      },
    });
  }


  handlePreview = rec => {
    console.log(rec);
    const { id } = rec;
    router.push(`/dashBoard?id=${id}`);
  }


  // 分页
  pageChange = page => {
    const newPage = {};
    newPage.current = page.current;
    newPage.pageSize = page.pageSize;
    this.getPageData(newPage)
    this.setState({
      pagination: newPage,
    });
  }

  // 先弹窗
  createDashboard = () => {
    this.setState({
      saveVisible: true,
    });
  }

  // 新增
  addNewDashboard = () => {
    const { form } = this.formRef.props;
    const { dispatch, current, pageSize } = this.props;
    this.setState({
      confirmLoading: true,
    });
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
              confirmLoading: false,
            });
            const args = {
              message: '提示',
              description: '新建数据成功',
            };
            notification.success(args);
          } else {
            this.setState({
              saveVisible: false,
              confirmLoading: false,
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
  }

  closeSave = () => {
    this.setState({
      saveVisible: false,
      editVisible: false,
      displayId: null,
     });
  }

  saveFormRef = formRef => {
    this.formRef = formRef;
  };

  // 编辑
  editFormRef = formRef => {
    this.editformRef = formRef;
  };

  handleEdit = rec => {
    const { id } = rec;
    this.setState({
      editVisible: true,
      displayId: id,
    });
    const { dispatch } = this.props;
    dispatch({
      type: 'dashBoard/getById',
      payload: id,
      callback: res => {
        this.setState({
          editData: res.data,
        });
      },
    });
  }

  // 编辑
  updateDashboard = () => {
    const { displayId } = this.state;
    const { dispatch, current, pageSize } = this.props;
    const { form } = this.editformRef.props;
    this.setState({
      editLoading: true,
    });
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      const data = values;
      data.id = displayId;
      dispatch({
        type: 'dashBoard/updateList',
        payload: { data, current, pageSize },
        callback: res => {
          if (res.code === 'U000000') {
            this.setState({
              editVisible: false,
              editLoading: false,
            });
            const args = {
              message: '提示',
              description: '修改成功',
            };
            notification.success(args);
          } else {
            this.setState({
              editVisible: false,
              editLoading: false,
            });
            const args = {
              message: '提示',
              description: '修改失败',
            };
            notification.info(args);
          }
        },
      });
      form.resetFields();
    });
  }

  // 添加图表
  addChart = rec => {
    const { id } = rec;
    this.addId = id;
    const { dispatch } = this.props;
    dispatch({
      type: 'dashBoard/getChart',
      payload: id,
      callback: res => {
        if (res.code === 'U000000') {
          this.setState({
            dashboardVisible: true,
            containerList: res.data,
          });
        } else {
          this.setState({
            dashboardVisible: true,
          });
          const args = {
            message: '提示',
            description: '无法获取仪表盘相关图表',
          };
          notification.info(args);
        }
      },
    });
    dispatch({
      type: 'dashBoard/getById',
      payload: id,
      callback: res => {
        this.setState({
          dashboardName: res.data.name,
        });
      },
    });
  }

  handleNameChange = e => {
    const val = e.target.value;
    this.setState({ dashboardName: val });
  }

  // 保存图表
  saveDashboard = () => {
    const { dispatch, current, pageSize } = this.props;
    const data = this.containersData;
    data.id = this.addId;
    console.log(data);
    dispatch({
      type: 'dashBoard/addChart',
      payload: { data, current, pageSize },
      callback: res => {
        if (res.code === 'U000000') {
          this.setState({ dashboardVisible: false });
          const args = {
            message: '提示',
            description: '保存成功',
          };
          notification.success(args);
        } else {
          this.setState({ dashboardVisible: false })
          const args = {
            message: '提示',
            description: '保存失败',
          };
          notification.info(args);
        }
      },
    });
  }

  closeDashboard = () => {
    const { pagination } = this.state;
    this.getPageData(pagination);
    this.setState({
      dashboardVisible: false,
      containerList: [],
    });
  }

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

  onContainerCreate = data => {
    this.containersData = data;
  }

  // showSaveModal = () => {
  //   console.log(this.containersData);
  // }

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
    const { selectedRowKeys, visibleDelete, examDataLoading, deleteLoading } = this.state;
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
          confirmLoading={deleteLoading}
          >
            <p style={{ textAlign: 'center', marginBottom: 15 }}>
              <img src={dele} alt="404" />
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
        <div onClick={this.closeDashboard} className={styles.leftBack}>
          <Icon type="left-circle" theme="filled" className={styles.icon}/>
          <span>返回</span>
        </div>
        {/* <Input
          className={styles.nameInput}
          placeholder="请输入仪表盘名称"
          value={this.state.dashboardName}
          // onChange={e => this.handleNameChange(e)}
        /> */}
        <span className={styles.nameInput} value={this.state.dashboardName}>
          {this.state.dashboardName}
        </span>
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
          <ContainerManagement
            containerList={containerList}
            onContainerCreate={this.onContainerCreate}
            dashboardId={this.addId}
          />
        </div>
      </Drawer>
    )
  }

  render() {
    const {
      dashboardVisible,
      saveVisible,
      editVisible,
      selectedRowKeys,
      editData,
      confirmLoading,
      editLoading,
    } = this.state;
    const { totalCount } = this.props;
    const listNode = this.renderList()
    const hasSelected = selectedRowKeys.length > 0;
    return (
      <div className={styles.wrapper}>
        <div className={styles.wrapHeader}>
          <Button className={styles.createBtn} onClick={this.createDashboard} type="primary" >
            <i className="iconfont icon-add-circle">创建仪表盘</i>
          </Button>
          <Button
            type="danger"
            onClick={this.showDelete}
            disabled={!hasSelected}
          >
            <i className="iconfont icon-piliangshanchu"> 批量删除仪表盘</i>
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
          confirmLoading={confirmLoading}
        />
        <EditForm
          wrappedComponentRef={this.editFormRef}
          visible={editVisible}
          onCancel={this.closeSave}
          onCreate={this.updateDashboard}
          data={editData}
          confirmLoading={editLoading}
        />
      </div>
    )
  }
}
export default DashboardManagement;
