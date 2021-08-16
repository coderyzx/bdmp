import React from 'react';
import { Layout } from 'antd';

const { Footer } = Layout;
class DataProcessing extends React.Component {
    constructor (props) {
        super(props);
        this.state = { };
    }

    render () {
      return (
        <div >

          <div >数据加工厂</div>
          <Footer style={{ textAlign: 'center' }}>UIH ©2021 Created by UIH-BDMP</Footer>
        </div>
      )
    }
}

export default DataProcessing;
