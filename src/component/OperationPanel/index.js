import React from 'react';
import { Select, Icon, notification, Popover, Button } from 'antd';
import styles from './index.less';

const { Option } = Select;

// const appList = [
//   {
//     title: 'uap',
//   },
//   {
//     title: 'uClass',
//   },
//   {
//     title: 'solar',
//   },
// ]

const actionDatas = [
  {
    icon: 'edit',
    title: '布局自定义',
  },
  {
    icon: 'cluster',
    title: '替换数据',
  },
  {
    icon: 'file-add',
    title: '添加图表',
  },
  {
    icon: 'fullscreen',
    title: '全屏',
  },
]

const OperationPanel = ({ operationChange,
  menus, toTarget, curKey, project,
  defaultTime, timeOptions, appList, currentApp }) => {
  const pojValue = project === 'uplus_dev' ? 'uplus' : 'uplus_dev';
  actionDatas[1].title = project === 'uplus_dev' ? '线下数据' : '线上数据';
  const openNotification = title => {
    notification.open({
      message: `猴子们正在开发（${title}）功能中！`,
      description:
        '猴子们已经获得了您的点击需求，点的越多，就越优先开发，尽情期待！！！！',
      icon: <Icon type="smile" style={{ color: '#108ee9' }} />,
    });
  };
  const renderOptions = () => timeOptions.map(item => {
      const { title, value } = item;
      return <Option key={title} value={value || title}>{title}</Option>
    })
  const renderAppOptions = () => appList.map(item => {
    const { ex_app_id: aid, ex_app_name: aname } = item;
    return <Option key={aname} value={aid}>{aname}</Option>
  })

  actionDatas[1].logic = () => {
    operationChange({
      project: pojValue,
    })
  }

  const renderContent = () => {
    let result = null;
    if (menus && menus.length) {
      result = [];
      menus.forEach(ele => {
        const node = (
          <div key={ele.name} className={styles.menuItem}>
            <Button
              style={{ width: '150px' }}
              type={curKey === ele.path ? 'primary' : null }
              key={ele.id}
              onClick={() => {
                toTarget(ele.path, {
                  defaultTime: ele.defaultTime,
                  timeName: ele.timeName,
                })
              }}
            >
              {ele.name}
            </Button>
          </div>
        )

        result.push(node);
      });
    }

    if (result) {
      return (
        <div>
          {result}
        </div>
      )
    }

    return result;
  }

  const renderAction = () => actionDatas.map(item => {
    const { title, icon, logic } = item;
    const fn = logic || openNotification;
    return (
      <div
        key={title}
        className={styles.actionItem}
        onClick={() => { fn(title) }}>
        <div className={styles.icon}>
          <Icon type={icon} />
        </div>
        <div className={styles.title}>{title}</div>
      </div>
    )
  });

  const menuNode = renderContent();
  const pageName = menus.find(ele => curKey === ele.path);
  return (
    <div className={styles.operationPanelWrap}>
      <div className={styles.defaultBoard}>
        <Popover
          placement="bottom"
          content={menuNode}
          trigger="hover"
        >
          <div className={styles.currentTitle}>
            <div className={styles.txt}>
              {pageName && pageName.name}
              <span className={styles.more}>...</span>
            </div>
          </div>
        </Popover>
        <div className={styles.addButton}>
          <span className={styles.icon}>+</span>
          <span className={styles.txt} onClick={() => { openNotification('添加') }}>添加</span>
        </div>
      </div>
      <div className={styles.pageTitle}>{pageName && pageName.name}</div>
      <div className={styles.formPanel}>
        <div className={styles.timeWrap}>
          <div className={styles.icon}><Icon type="filter" /></div>
          <div className={styles.timeSelect}>
            <Select
              defaultValue={[defaultTime]}
              style={{ width: '180px' }}
              onChange={value => {
                operationChange({
                    defaultTime: value,
                    timeName: timeOptions.find(item => item.value === value).title,
                  })
                }}
              >
              {renderOptions()}
            </Select>
          </div>
          <div className={styles.timeSelect}>
            {currentApp && (
              <Select
                defaultValue={[currentApp]}
                style={{ width: '180px' }}
                onChange={value => {
                  operationChange({
                    currentApp: value,
                  })
                }}
              >
                {renderAppOptions()}
              </Select>
            )}
          </div>
        </div>
        <div className={styles.actionWrap}>
          {renderAction()}
        </div>
      </div>
    </div>
  )
}

export default OperationPanel;
