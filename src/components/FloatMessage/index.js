import React, { Component } from 'react'
import ReactDOM from 'react-dom';

import styles from './styles.less';

let messageRoot = null;

const iconMap = {
  info: 'multi-tenicon-tip-alert',
  success: 'multi-tenicon-complete-alert',
  error: 'multi-tenicon-error',
}

class MessageContent extends Component {
  state ={
    show: false,
  }

  hideTimer = null;

  componentDidMount() {
    setTimeout(() => {
      this.setState({ show: true });
      this.setHideTimer();
    }, 0);
  }

  setHideTimer = () => {
    if (this.hideTimer) clearTimeout(this.hideTimer);
    this.hideTimer = setTimeout(() => {
      this.setState({ show: false });
    }, 2000);
  }

  render () {
    const { type, message } = this.props;
    const { show } = this.state;
    return (
      <div className={`${styles.messageWarp} ${show ? styles.show : ''} FlexCol`}>
        <span className={`${styles.messageIcon} ${iconMap[type]}`} ></span>
        <p className={styles.message}>{message}</p>
      </div>
    )
  }
}

const showMessage = (type, message) => {
  if (messageRoot) document.body.removeChild(messageRoot); // 移除dom元素来达到闪烁的效果
  messageRoot = document.createElement('div');
  messageRoot.className = 'floatMessage';
  document.body.append(messageRoot);
  ReactDOM.render(<MessageContent type={type} message={message} />, messageRoot);
}

const FloatMessage = {
  info(message) {
    showMessage('info', message)
  },
  success(message) {
    showMessage('success', message)
  },
  error(message) {
    showMessage('error', message)
  },
};

export default FloatMessage
