import React from 'react';
import { Icon, Popover, Tooltip } from 'antd';
import domtoimage from 'dom-to-image';

import styles from './index.less';

class CardTools extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      datas: [
        {
          text: '图表切换',
          type: 'line-chart',
          apiFn: 'changeChart',
          children: [
            {
              type: 'bar-chart',
            },
            // {
            //   type: 'area-chart',
            // },
            // {
            //   type: 'pie-chart',
            // },
            {
              type: 'line-chart',
            },
          ],
        },
        {
          type: 'download',
          fn: () => {
            this.downloadImage();
          },
        },
        {
          type: 'question-circle',
          help: true,
        },
      ],
    };
  }

  downloadImage = () => {
    const { domId } = this.props;
    domtoimage.toPng(document.getElementById(domId), { quality: 1 })
    .then(dataUrl => {
        const link = document.createElement('a');
        link.download = `${domId}.png`;
        link.href = dataUrl;
        link.click();
    });
  }

  renderItem = () => {
    const { datas } = this.state;
    const { changeChartItemView } = window;
    const { domId, datas: data } = this.props;
    const result = [];
    datas.forEach(item => {
      const { type, fn, children, text, help } = item;
      let node = <Icon type={type} />;
      if (children && children.length) {
        const content = (
          <div className={styles.ioncList}>
            {children.map(sItem => {
              const { type: sType } = sItem;
              return (
                <div
                  className={styles.iconItem}
                  onClick={() => {
                    changeChartItemView({
                      id: domId,
                      type: sType,
                    })
                  }}
                  key={sType}
                >
                  <Icon type={sType} />
                </div>
              )
            })}
          </div>
        );
        node = (
          <Popover style={{ padding: '5px', width: '40px' }} trigger="click" title={text} content={content}>
            <Icon type={type} />
          </Popover>
        )
      }
      if (help) {
        node = (
          <Tooltip placement="top" title={data && data.help}>
            <Icon type={type} />
          </Tooltip>
        )
      }
      const wrap = (
        <div
          className={styles.tooleIoncItem}
          onClick={() => { if (fn) fn() }}
          key={type}
        >
          {node}
        </div>
      );
      result.push(wrap)
    });

    return result;
  }

  render () {
    const tooles = this.renderItem();
    return (
      <div className={styles.cardToolsWrap}>
        {tooles}
      </div>
    );
  }
}

export default CardTools;
