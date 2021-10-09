import React, { PureComponent } from 'react';
import noData from '@/assets/noData.svg';
import styles from './index.less';

class EvaluReport extends PureComponent {
  render() {
    return (
      <div className={styles.noData}>
        <img src={noData} alt="404" />
        <span style={{ fontSize: 20, marginTop: 10 }}>暂无内容~</span>
      </div>
    )
  }
}

export default EvaluReport;
