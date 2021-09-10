import { notification, Icon } from 'antd';

export function openNotificationLocal (res) {
  if(res === 400){
    notification.open({
      message: '添加失败',
      description:
        `报错${res}, 你发送了一个很坏的请求~，服务器不接受`,
      icon: <Icon type="smile" theme="twoTone" twoToneColor="#eb2f96" />,
      // duration: 5,
    })  
  }else{
    notification.open({
      message: '添加失败',
      description:
        `报错${res}, 可能是你自己客户端的问题~，别怪服务器`,
      icon: <Icon type="smile" theme="twoTone" twoToneColor="#eb2f96" />,
      // duration: 5,
    })
  }
}

export function openNotificationServer (res) {
  notification.open({
    message: '添加失败',
    description:
      `报错${res}, 服务器不对劲，也可能你不对劲，请稍后再来`,
    icon: <Icon type="smile" rotate={180} theme="twoTone" twoToneColor="#108ee9" />,
    duration: 5,
  })
}

