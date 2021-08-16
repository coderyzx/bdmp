export function getUserInfo (userName, route) {
  let localData = localStorage.userInfo || '{}';
  const nulls = {
    tableInfo: [],
  };
  if (localData && typeof localData === 'string') {
    localData = JSON.parse(localData);
    const userData = localData[userName];
    if (userData) {
      return userData[route] || nulls;
    }
    return nulls;
  }

  return nulls;
}

export function saveUserInfo (userName, route, datas) {
  let localData = localStorage.userInfo || '{}';
  if (localData && typeof localData === 'string') {
    localData = JSON.parse(localData);
    const userData = localData[userName] || {};
    const routeData = userData[route] || {};
    routeData.tableInfo = datas;
    userData[route] = routeData;
    localData[userName] = userData;
    localStorage.userInfo = JSON.stringify(localData);
  }
}

export function diffTableInfo (userColumns, localColumns) {
  const result = [];
  if (localColumns.length) {
    localColumns.forEach(item => {
      userColumns.forEach(ele => {
        const curEle = ele;
        if (curEle.title === item.title) {
          curEle.width = item.width
          result.push(curEle);
        }
      });
    });
  }

  return result.length ? result : userColumns;
}
