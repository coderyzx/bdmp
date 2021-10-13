import React, { PureComponent } from 'react';
import { Empty } from 'antd';
import noMatchedCourse from '@/assets/noMatchedCourse.svg';
import styles from './index.less';

class EvaluReport extends PureComponent {
  render() {
    return (
      <Empty image={noMatchedCourse} className={styles.empty}/>
    )
  }
}

export default EvaluReport;
