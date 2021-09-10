import React, { Component } from 'react';
import { Tree, Tooltip } from 'antd';
import { connect } from 'dva';
import DictEditModal from '../DictEditModal';
import DictAddModal from '../DictAddModal';
import DictDeleteModal from '../DictDeleteModal';
import DictDetailsModal from '../DictDetailsModal';
import { selectedDictItem } from '@/services/dict';
import styles from './index.less'

const { TreeNode } = Tree;

@connect(({ dict }) => ({ treeData: dict.treeData }))
class DictItem extends Component {
  state = {
    expandedKeys: [],
    autoExpandParent: false,
    selectedKeys: [],
    selectedDictItem: {},
  };

  onExpand = expandedKeys => {
    console.log('onExpand', expandedKeys);
    this.setState({
      expandedKeys,
      autoExpandParent: false,
    });
  };

  onSelect = async (selectedKeys, info) => {
    console.log(info)
    console.log('onSelect', selectedKeys);
    this.setState({ selectedKeys });
    // 获取选中子项的相关信息
    if (selectedKeys[0] > 0) {
      const res = await selectedDictItem(selectedKeys[0]);
      this.setState({
        selectedDictItem: res.data,
      })
    }
  };

  handleDictItemAdd = () => {
    this.add.showModal();
  }

  handleDictItemDelete = () => {
    this.delete.showModal();
  }

  handleDictItemEdit = () => {
    this.edit.showModal();
  }

  handleDictItemDetails = () => {
    this.details.showModal();
  }

  // 父组件调用子组件方法
  onRefAdd = ref => {
    this.add = ref;
  }

  onRefEdit = ref => {
    this.edit = ref;
  }

  onRefDelete = ref => {
    this.delete = ref;
  }

  onRefDetails = ref => {
    this.details = ref;
  }


  renderTreeNodes = data =>
    data.map(item => {
      if (item.children) {
        return (
          <TreeNode title={item.value} key={item.id} dataRef={item}>
            {this.renderTreeNodes(item.children)}
          </TreeNode>
        );
      }
      return <TreeNode key={item.id} title={item.value} {...item} />;
    });

  render() {
    return (
      <>
        <div className={styles.dictItemTitle}>
          <div className={styles.itemLeft}>字典项列表</div>
          <div className={styles.itemRight}>
            <Tooltip placement="top" title="创建字典项">
              <span className={this.state.selectedKeys[0] >= 0 ? styles.item : styles.disabled}><i className="iconfont icon-add-circle" onClick={this.handleDictItemAdd}/></span>
            </Tooltip>
            <Tooltip placement="top" title="删除字典项">
            <span className={this.state.selectedKeys[0] >= 1 ? styles.item : styles.disabled}><i className="iconfont icon-ashbin" onClick={this.handleDictItemDelete}/></span>
            </Tooltip>
            <Tooltip placement="top" title="编辑字典项">
            <span className={this.state.selectedKeys[0] >= 1 ? styles.item : styles.disabled}><i className="iconfont icon-edit" onClick={this.handleDictItemEdit}/></span>
            </Tooltip>
            <Tooltip placement="top" title="详情">
            <span className={this.state.selectedKeys[0] >= 1 ? styles.item : styles.disabled}><i className="iconfont icon-file" onClick={this.handleDictItemDetails}/></span>
            </Tooltip>
          </div>
        </div>
        <Tree
          onExpand={this.onExpand}
          expandedKeys={this.state.expandedKeys}
          autoExpandParent={this.state.autoExpandParent}
          onSelect={this.onSelect}
          selectedKeys={this.state.selectedKeys}
          blockNode
        >
        {this.renderTreeNodes(this.props.treeData)}
        </Tree>
        <DictAddModal onRef={this.onRefAdd} />
        <DictEditModal onRef={this.onRefEdit} selectedDictItem={this.state.selectedDictItem}
                       editItemkey={this.state.selectedKeys[0]}/>
        <DictDeleteModal onRef={this.onRefDelete} deleteItemkey={this.state.selectedKeys[0]}/>
        <DictDetailsModal onRef={this.onRefDetails} selectedDictItem={this.state.selectedDictItem}/>
      </>
    );
  }
}


export default DictItem;
