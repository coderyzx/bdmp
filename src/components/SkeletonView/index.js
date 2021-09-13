import React from 'react';
import { Row, Col, Card, Spin } from 'antd';

import style from './index.less';

class SkeletonView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  renderSkeletonView = () => {
    const { datas } = this.props;
    const result = [];
    if (datas && datas.length) {
      datas.forEach(ele => {
        const { id, curType, height, span, text, offsetSpan } = ele;
        let h = height || null;
        let c = span || 24;
        switch (curType) {
          case 'card':
          case 'card1':
            h = 181 || 600;
            c = 4;
            break;
          case 'table':
            h = 600;
            break;
          default:
            h = 600;
            break;
        }

        const node = (
          <Col key={`SkeletonView-${id}`} span={c} style={{ marginBottom: '15px' }}>
            <Card title={text}>
              <div style={{ position: 'relative', height: `${h - 100}px` }}>
                <Spin size="large" className={style.spin} />
              </div>
            </Card>
          </Col>
        );
        result.push(node);
        if (offsetSpan) {
          result.push((
            <Col key={`${id}-offset`} span={offsetSpan} style={{ marginBottom: '15px', visibility: 'hidden' }}>
              <Card title={text}>
                <div style={{ position: 'relative', height: `${h - 100}px` }}>
                  <Spin size="large" className={style.spin} />
                </div>
              </Card>
            </Col>
          ))
        }
      })
    }
    return result;
  }

  render() {
    const node = this.renderSkeletonView();
    return (
      <Row gutter={24}>
        {node}
      </Row>
    )
  }
}

export default SkeletonView;
