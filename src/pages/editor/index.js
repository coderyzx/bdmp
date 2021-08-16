import React from 'react';
import ReactECharts from 'echarts-for-react';
import { connect } from 'dva'
// import Link from 'umi/link';
import { Layout } from 'antd';
import Mirror from './mirror';

const { Content } = Layout;
@connect(({ chartModel }) => (
  {
    lineChartEditor: chartModel.lineChartEditor,
  }),
)
class Editor extends React.Component {
  constructor (props) {
    super(props);
    this.state = {};
  }

  render() {
    const { lineChartEditor } = this.props;
    return (
      <Content style={{ padding: '0 50px', background: '#fff' }}>
        <Mirror/>
        <ReactECharts
            ref={e => {
              this.echarts_react = e;
            }}
            option = {lineChartEditor}
          />
      </Content>
    )
  }
}

export default Editor;
