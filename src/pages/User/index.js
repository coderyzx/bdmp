import React from 'react';
import { Empty } from 'antd';
import styles from './index.less';
import noMatchedCourse from '@/assets/noMatchedCourse.svg';

class User extends React.Component {
    constructor (props) {
        super(props);
        this.state = { };
    }

    render () {
      return (
        <Empty image={noMatchedCourse} className={styles.empty}/>
      )
    }
}

export default User;
