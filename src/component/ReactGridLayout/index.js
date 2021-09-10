import React from 'react';
import GridLayout from 'react-grid-layout'; // https://github.com/react-grid-layout/react-grid-layout
import CONTAINERCONFIG from '@/constants/chartContainersConfig';

import './index.less';

// const layout = [
//   { i: 'a', x: 0, y: 0, w: 12, h: 10 },
//   { i: 'b', x: 13, y: 0, w: 12, h: 10 },
//   { i: 'c', x: 0, y: 0, w: 12, h: 10 },
//   { i: 'd', x: 13, y: 0, w: 12, h: 10 },
//   { i: 'e', x: 0, y: 0, w: 12, h: 10 },
// ];
const { DEFAULTCOLS, DEFAULTROWHEIGHT, DEFAULTMARGIN } = CONTAINERCONFIG

class ReactGridLayout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  onLayoutChange = l => {
    const { onChange } = this.props;
    onChange(l);
  }

  render() {
    const { layout = {}, doms } = this.props;
    const layoutOptions = {
      width: 1920 - 50,
      autoSize: true,
      cols: DEFAULTCOLS,
      compactType: 'vertical', // 'vertical' | 'horizontal'
      margin: [DEFAULTMARGIN, DEFAULTMARGIN], // Margin between items [x, y] in px.
      // containerPadding: [0, 0], // Padding inside the container [x, y] in px
      rowHeight: DEFAULTROWHEIGHT,
      onLayoutChange: this.onLayoutChange,
      layout,
    };
    return (
      <GridLayout className="layout" {...layoutOptions}>
        {doms}
        {/* <div key="a">a</div>
        <div key="b">b</div>
        <div key="c">c</div>
        <div key="d">d</div>
        <div key="e">e</div> */}
      </GridLayout>
    )
  }
}

export default ReactGridLayout;
