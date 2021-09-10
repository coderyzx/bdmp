/* eslint-disable no-unused-expressions */
/* eslint-disable class-methods-use-this */
import { Button } from 'antd';
import React, { Component } from 'react';
import client from './authClient.js';
import styles from './loginCallback.less';
import { setAuthLoginInfo } from './authHandler';

class LoginCallback extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isError: false,
      showErrorType: false,
    };
  }


  componentDidMount() {
    const { history } = this.props;
    client.loginCallback().then(async () => {
      const token = await client.getAuthToken();
      setAuthLoginInfo(token);
      const { url } = sessionStorage;
      delete sessionStorage.errorNumber;
      delete sessionStorage.url;
      history.replace(url || '/home');
    })
  }

  render() {
    if (this.state.isError) {
      return (
        <div className={styles.tips}>
          <h1>即将跳转到首页</h1>
        </div>
      )
    }

    if (this.state.showErrorType) {
      return (
        <div className={styles.tips}>
          <h1>服务异常，请稍后重试</h1>
          <Button onClick={this.resetRefresh}>重试</Button>
        </div>
      )
    }
    return (
      <div className={styles.tips}>
        <h1>正在处理 请稍等...</h1>
      </div>
    )
  }
}

export default LoginCallback;
