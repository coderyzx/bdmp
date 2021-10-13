import React, { PureComponent } from 'react';
import { Empty } from 'antd';
import noMatchedCourse from '@/assets/noMatchedCourse.svg';
import styles from './index.less';

class MetaData extends PureComponent {
  render() {
    return (
      <Empty image={noMatchedCourse} className={styles.empty}/>
    )
  }
}

export default MetaData;
