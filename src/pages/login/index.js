import React, { Component } from 'react';
import { connect } from 'dva';
import Redirect from 'umi/redirect';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import styles from './login.less';


@connect(({ loginModel }) => (
  {
    loginStatus: loginModel.loginStatus,
  }),
)

class NormalLogin extends Component {
  handleSubmit = e => {
    const { dispatch } = this.props;
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        dispatch({
          type: 'loginModel/submit',
          payload: values,
        })
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;

    const { loginStatus } = this.props;
    if (!loginStatus) {
      return (
        <Form onSubmit={this.handleSubmit} className={styles.loginForm}>
          <Form.Item>
            {getFieldDecorator('username', {
              rules: [{ required: true, message: 'Please input your username!' }],
            })(
              <Input
                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="Username"
              />,
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: 'Please input your Password!' }],
            })(
              <Input
                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                type="password"
                placeholder="Password"
              />,
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('remember', {
              valuePropName: 'checked',
              initialValue: true,
            })(<Checkbox>Remember me</Checkbox>)}
            {/* eslint-disable-next-line jsx-a11y/anchor-has-content */}
            <a className={styles.loginFormForgot} href="">
              Forgot password
            </a>
            <Button type="primary" htmlType="submit" className={styles.loginFormButton}>
              Log in
            </Button>
            {/* eslint-disable-next-line jsx-a11y/anchor-has-content */}
            Or <a href="">register now!</a>
          </Form.Item>
        </Form>
      )
    }
      return <Redirect to="/" />
  }
}


const Login = Form.create({ name: 'login' })(NormalLogin);

export default Login;
