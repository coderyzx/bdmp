import React from 'react';
// import 'antd/dist/antd.css';
import { Layout, Menu } from 'antd';
import styles from './index.less';

const { Sider } = Layout;
const { Item } = Menu;

class SideNav extends React.Component {
  constructor (props) {
    super(props);
   // const [curItem] = this.props.list;
    // const [curItem] = this.props.list;
    // console.log(curItem)
    // const { id } = curItem;
    const { defaultSelected } = this.props;
    // console.log(list);
    this.state = {
      curId: defaultSelected,
    };
  }


  changeType = curId => {
    const { selectType } = this.props;
    this.setState({
      curId,
    })
    selectType(curId);
  };

  renderNav = () => {
    const { curId } = this.state;
    const { list, defaultSelected } = this.props;
    return (
      <Sider className={styles.siderWrap}>
        <Menu className={styles.itemWrap} selectedKeys={ defaultSelected }>
          {
            list.map(item => {
              const { id: tid } = item;
              let curClassName = styles.item;
              if (tid === curId) {
                curClassName = [styles.item, styles.active].join(' ');
              }
              return (
                // eslint-disable-next-line max-len
                <Item key = {tid} onClick = {() => { this.changeType(tid) }} className={curClassName}>
                  <span>
                    {/* <Icon type="unordered-list" /> */}
                    <img src={`https://dataview-dev.uihcloud.cn/api/image/chartType/${item.imageFile}`} alt="tu"/>
                  </span>
                  <span>
                    {item.name}
                  </span>
                </Item>
              )
            })
          }
        </Menu>
      </Sider>
    )
  }

  render() {
    const node = this.renderNav();
    return node;
  }
}
export default SideNav
