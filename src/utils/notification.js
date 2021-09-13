import { notification } from 'antd';

export function openNotificationLocal () {
  notification.info({
    message: '添加失败',
    description: '报错, 你发送了一个很坏的请求~，服务器不接受',
  })
}

export function openNotificationServer () {
  notification.info({
    message: '添加失败',
    description: '报错500, 服务器不对劲，请稍后再来',
  })
}
