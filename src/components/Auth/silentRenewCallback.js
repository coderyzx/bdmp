import React, { Component } from 'react';

import client from './authClient'

export default class SilentRenewCallback extends Component {
   componentDidMount () {
    client.silentRenewCallback().then(() => {
      let jwt = null;
      const paramsArr = window.location.hash.substring(1).split('&');
      paramsArr.forEach(ele => {
        const [key, value] = ele.split('=');
        if (key === 'access_token') {
          jwt = value;
        }
      })
      let userId = null;
      if (jwt) {
        // jwt解析
        const userParams = JSON.parse(decodeURIComponent(escape(window.atob(jwt.split('.')[1]))));
        userId = userParams && userParams.userId;
      }
      localStorage.userId = userId;
    }).catch(error => {
      // eslint-disable-next-line no-console
      console.error(error);
    });
  }

  render() {
    return (
      <h1>something is wrong!</h1>
    );
  }
}
