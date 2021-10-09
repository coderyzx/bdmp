import {
  Form,
  Input,
  Checkbox,
  Button,
  notification,
} from 'antd';
import React, { Component } from 'react';
import { connect } from 'dva';
import router from 'umi/router';
import styles from './login.less';
import bgIcon from '@/assets/login2.png';
import addUser from '@/assets/addUser.png';

@connect(({ loginModel }) => ({
  loginStatus: loginModel.loginStatus,
}),
)
class RegistrationForm extends Component {
  state = {
    confirmDirty: false,
  };

  handleSubmit = e => {
    const { dispatch } = this.props;
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      const { username, passWord } = values;
      const params = { username, passWord };
      if (!err) {
        dispatch({
          type: 'loginModel/register',
          payload: params,
          callback: res => {
            if (res.code === 'U000000') {
              console.log(res);
              router.push('/login');
            }
            if (res.code === 'U000004') {
              const args = {
                message: '提示',
                description: '帐号已存在，请重新注册',
              };
              notification.info(args);
            }
          },
        })
      }
    });
  };

  handleConfirmBlur = e => {
    const { value } = e.target;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  compareToFirstPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue('passWord')) {
      callback('您输入的两次密码不一致!');
    } else {
      callback();
    }
  };

  validateToNextPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  };

  renderRegister = () => {
    const { getFieldDecorator } = this.props.form;
    const dom = (
      <Form onSubmit={this.handleSubmit} layout="vertical" className={styles.loginForm}>
        <Form.Item label="E-mail">
          {getFieldDecorator('username', {
            rules: [
              {
                type: 'email',
                message: '请输入有效的邮箱!',
              },
              {
                required: true,
                message: '请输入您的邮箱!',
              },
            ],
          })(<Input style={{ height: '40px' }}/>)}
        </Form.Item>
        <Form.Item label="密码" hasFeedback>
          {getFieldDecorator('passWord', {
            rules: [
              {
                required: true,
                message: '请输入您的密码!',
                whitespace: true,
              },
              {
                validator: this.validateToNextPassword,
              },
            ],
          })(<Input.Password style={{ height: '40px' }}/>)}
        </Form.Item>
        <Form.Item label="确认密码" hasFeedback>
          {getFieldDecorator('confirm', {
            rules: [
              {
                required: true,
                message: '请确认您的密码!',
                whitespace: true,
              },
              {
                validator: this.compareToFirstPassword,
              },
            ],
          })(<Input.Password onBlur={this.handleConfirmBlur} style={{ height: '40px' }}/>)}
        </Form.Item>
        <Form.Item style={{ display: 'flex' }} >
          {getFieldDecorator('agreement', {
            valuePropName: 'checked',
            rules: [
              {
                required: true,
                message: '请阅读并勾选协议!',
              },
            ],
          })(
            <Checkbox>
              我已阅读并同意 <a href="#!"
              style={{
                cursor: 'pointer',
                textDecoration: 'underline',
                color: '#5063C2',
              }} >
                《用户协议》
              </a>
                和 <a href="#!"
                style={{
                  cursor: 'pointer',
                  textDecoration: 'underline',
                  color: '#5063C2',
                }} >《隐私协议》
              </a>
            </Checkbox>,
          )}
        </Form.Item>
        <Form.Item >
          <Button type="primary" htmlType="submit"
            style={{
              width: '100%',
              height: '40px',
              marginTop: '20px',
              border: '1px solid rgba(57,88,230,0.80)',
              borderRadius: '2px',
              fontSize: '16px',
              background: 'linear-gradient(225deg, #7996FA 0%, #3C5BCF 100%)',
            }}
            >
            注册
          </Button>
          <Button onClick={() => router.push('./login')}
            style={{
              width: '100%',
              height: '40px',
              marginTop: '20px',
              border: '1px solid rgba(57,88,230,0.80)',
              borderRadius: '2px',
              fontSize: '16px',
              color: '#5063C2',
            }}
          >
            登录
          </Button>
        </Form.Item>
      </Form>
    )
    return dom;
  }


  render() {
    return (
      <div className={styles.bodyContainer}>
        <div className={styles.contentWrap}>
          <div className={styles.logo}>
          <img src={bgIcon} alt="404" draggable="false"/>
        </div>
          <div className={styles.wrapper}
            style={{
            background: 'rgba(255,255,255,0.9)',
            margin: '0 auto',
            }}>
            <div className={styles.loginContainer}
          >
            <div className={styles.header}
              style={{
                marginTop: '80px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <img src={addUser} alt="404" draggable="false"/>
              <p style={{
                paddingTop: '20px',
                fontSize: '26px',
                color: '#1F2127',
                textAlign: 'center',
                display: 'block',
                marginBottom: '5px',
              }}>欢迎来到大数据管理平台注册</p>
            </div>
            {this.renderRegister()}
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
    );
  }
}

const Register = Form.create({ name: 'register' })(RegistrationForm);

export default Register;
