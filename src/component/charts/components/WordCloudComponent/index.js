import React from 'react';
import { Card } from 'antd';
import WordCloud from 'WordCloud';
import CardTools from '@/components/CardTools';

// import styles from './index.less'

class WordCloudComponent extends React.Component {
  constructor (props) {
    super(props);
    this.wordCouldRef = React.createRef();
    this.state = {};
  }

  componentDidMount() {
    this.createOptions();
  }

  shouldComponentUpdate(nextProps) {
    if (nextProps.datas.curType === this.curType) {
      return false;
    }

    return true
  }

  createOptions = () => {
    const { datas: { data, curType: ct } } = this.props;
    this.curType = ct;
    const list = data.map(item => [item.keyword, item.cnt * 2]);
    WordCloud(this.wordCouldRef.current, {
      list,
      gridSize: 35, // 密集程度 数字越小越密集
      weightFactor: 1, // 字体大小=原始大小*weightFactor
      maxFontSize: 80, // 最大字号
      minFontSize: 40, // 最小字号
      fontWeight: 'normal', // 字体粗细
      fontFamily: 'MicrosoftYaHei', // 字体
      color: 'random-dark', // 字体颜色 'random-dark' 或者 'random-light'
      rotateRatio: 0, // 字体倾斜(旋转)概率，1代表总是倾斜(旋转)
      shape: 'circle',
    });
  }

  render() {
    const { title, datas: { id, height: propsHeight } } = this.props;
    const height = propsHeight || 350;
    return (
      <Card id={id} title={title} style={{ marginBottom: '15px' }} extra={<CardTools domId={id} />}>
        <div ref={this.wordCouldRef} style={{ height: `${height}px` }} />
      </Card>
    )
  }
}

export default WordCloudComponent;
