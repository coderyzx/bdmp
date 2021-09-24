import moment from 'moment';

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

export const formatDate = timeUnit => {
  // const YESTERDAY = 1;
  const ONEDAYTIMEMS = 86400 * 1000;
  const TODAYSTART = moment().hour(0)
  .minute(0)
  .second(0)
  .millisecond(0);
  const TODAYEND = moment().hour(0)
  .hour(23)
  .minute(59)
  .second(59)
  .millisecond(999);
  if (timeUnit === '0') {
    return [TODAYSTART.valueOf(), TODAYEND.valueOf()];
  }
  const time = ((timeUnit - 0)) * ONEDAYTIMEMS;
  const targetStartTime = TODAYSTART.valueOf() - time;
  const targetEndTime = TODAYEND.valueOf() - ONEDAYTIMEMS;
  const result = [targetStartTime, targetEndTime];
  return result;
};

export const formatOneDay = (value, defaultValue) => {
  const ONEDAYTIMEMS = 86400 * 1000;
  const timeArr = value.split('-');
  let TODAYSTART = moment(`${value} 0:00:000`, '"YYYY-MM-DD HH:mm:SSS"').valueOf();
  let TODAYEND = moment(`${value} 23:59:999`, '"YYYY-MM-DD HH:mm:SSS"').valueOf();
  if (timeArr.length === 1) {
    TODAYSTART = moment(`${value}:00:000`, '"HH:mm:SSS"').valueOf();
    TODAYEND = moment(`${value}:59:999`, '"HH:mm:SSS"').valueOf();
  } else if (timeArr.length === 2) {
    const startTime = `${value}-01`;
    if (timeArr[1] === '12') {
      timeArr[0] = ((timeArr[0] - 0) + 1).toString();
      timeArr[1] = '01';
    }
    timeArr[1] = `0${((timeArr[1] - 0) + 1)}`;
    const endTime = `${timeArr.join('-')}-01`;
    TODAYSTART = moment(`${startTime} 0:00:000`, '"YYYY-MM-DD HH:mm:SSS"').valueOf();
    TODAYEND = moment(`${endTime} 23:59:999`, '"YYYY-MM-DD HH:mm:SSS"').valueOf() - ONEDAYTIMEMS;
  }

  if (defaultValue === '1') {
    TODAYSTART -= ONEDAYTIMEMS;
    TODAYEND -= ONEDAYTIMEMS;
  }
  return {
    timeStart: TODAYSTART,
    timeEnd: TODAYEND,
  }
}

export const S4 = () => (((1 + Math.random()) * 0x10000)).toString(16).substring(1).split('.')[0];

export const getRandomId = () => S4() + S4() + S4();
