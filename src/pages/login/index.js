import React, { Component } from 'react';
import { connect } from 'dva';
// import Redirect from 'umi/redirect';
import { Form, Icon, Input, Button, Checkbox, notification } from 'antd';
import router from 'umi/router';
import styles from './login.less';
import bgImg from '@/assets/login.png';
import bgIcon from '@/assets/login2.png';

@connect(({ loginModel }) => ({
    loginStatus: loginModel.loginStatus,
  }),
)
class NormalLogin extends Component {
  handleSubmit = e => {
    const { dispatch } = this.props;
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      const { username, passWord } = values;
      const params = { username, passWord };
      if (!err) {
        dispatch({
          type: 'loginModel/submit',
          payload: params,
          callback: res => {
            if (res.code === 'U000000') {
              localStorage.setItem('token', res.data);
              router.push('/');
            } else {
              const args = {
                message: '提示',
                description: '帐号不存在，请先注册',
              };
              notification.info(args);
            }
          },
        })
      }
    });
  }

  handleRegister = () => {
    router.push('./register')
  }

  renderLogin = () => {
    const { getFieldDecorator } = this.props.form;
    const dom = (
        <Form onSubmit={this.handleSubmit} className={styles.loginForm} layout="vertical">
          <Form.Item label="登录名">
            {getFieldDecorator('username', {
              rules: [{ required: true, message: '请输入您的登录账号!' }],
            })(
              <Input style={{ height: '40px' }}
                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="登录名"
              />,
            )}
          </Form.Item>
          <Form.Item label="密码" >
            {getFieldDecorator('passWord', {
              rules: [
                { required: true, message: '请输入您的密码!' },
              ],
            })(<Input.Password
              style={{ height: '40px' }}
              placeholder="密码"
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              />,
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('remember', {
              valuePropName: 'checked',
              initialValue: true,
            })(
              <div className={styles.formWrap}>
                <Checkbox>记住登录名</Checkbox>
                <a className={styles.loginFormForgot} href="#!" onClick={this.handleRegister} >
                  忘记密码
                </a>
              </div>,
            )}
            <Button type="primary" htmlType="submit"
            className={styles.loginFormButton}>
              登录
            </Button>
            <Button onClick={this.handleRegister}
            className={styles.loginFormButton}
            style={{ color: '#5063C2', background: 'none' }}>
              注册
            </Button>
          </Form.Item>
        </Form>
    )
    return dom;
  }

  render() {
    return (
      <div className={styles.bodyContainer}>
        <div className={styles.bgContainer} >
          <img className={styles.img} draggable="false" src={bgImg} alt="404" />
        </div>
        <div className={styles.contentWrap}>
          <div className={styles.logo}>
            <img src={bgIcon} alt="404" draggable="false"/>
          </div>
          <div className={styles.wrapper}>
            <div className={styles.loginContainer}>
              <div className={styles.header}>
                <p style={{
                  marginTop: '140px',
                  paddingTop: '50px',
                  fontSize: '32px',
                  color: '#1F2127',
                  fontWeight: 'bold',
                  textAlign: 'center',
                  display: 'block',
                }}>大数据管理平台登录</p>
                <p style={{ display: 'block' }} />
              </div>
              {this.renderLogin()}
            </div>
          </div>
        </div>
        <div className={styles.copyright}>
          <span style={{
            zIndex: 999,
            }}>
            Copyright © 2020-2021 上海联影医疗科技有限公司 版权 | 沪公网安备31011402003693号
          </span>
        </div>
      </div>
    )
  }
}


const Login = Form.create({ name: 'login' })(NormalLogin);

export default Login;
