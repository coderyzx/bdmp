import React from 'react';
import { Layout } from 'antd';
import styles from './wellcome.less';
import bigData from '@/assets/bigdata.jpeg'

const { Footer } = Layout;
class Wellcome extends React.Component {
    constructor (props) {
        super(props);
        this.state = { };
    }

    render () {
      return (
        <div className={styles.pageMain}>
          <div className ={styles.mainContent}>
            <section className ={styles.homeSection}>
              <div className={styles.homeDescriptionContainer }>
                <div className={styles.homeInfo }>
                  <div className={styles.homeBrand}>BDMP</div>
                  <div className={styles.homeSubtitle}>大数据可视化管理平台</div>
                </div>
                <div className={styles.homeChart}><img src={bigData} /></div>
              </div>
            </section>
          </div>
          <Footer style={{ textAlign: 'center' }}>UIH ©2021 Created by UIH-BDMP</Footer>
        </div>
      )
    }
}

export default Wellcome;
