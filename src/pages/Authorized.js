import React from 'react'
import PropTypes from 'prop-types'
import { Redirect } from 'dva/router'
import Cookies from 'js-cookie'

const propTypes = {
  children: PropTypes.array,
  route: PropTypes.object,
}
const AuthRouter = props => {
  // 判断是否登录， 即是否有token
  const isLogin = !!Cookies.get('token')
  if (isLogin) {
    // 删除跳转登录之前的页面
    window.sessionStorage.removeItem('from_router')
    return (<div className="auth-router">{ props.children }</div>)
  }
    // 保存跳转登录之前的页面
    const { hash } = window.location
    const fromRouter = hash ? hash.slice(1) : ''
    window.sessionStorage.setItem('from_router', fromRouter)
    // 跳转登录页面
    return (<Redirect to="/login" />)
}
AuthRouter.propTypes = propTypes
export default AuthRouter
