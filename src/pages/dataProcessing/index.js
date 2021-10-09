import React from 'react';
import noData from '@/assets/noData.svg';
import styles from './index.less';

class DashBoard extends React.Component {
    constructor (props) {
        super(props);
        this.state = { };
    }

    render () {
      return (
        <div className={styles.noData}>
          <img src={noData} alt="404" />
          <span style={{ fontSize: 20, marginTop: 10 }}>暂无内容~</span>
        </div>
      )
    }
}

export default DashBoard;
