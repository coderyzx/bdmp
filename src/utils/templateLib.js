export function getMenuPageKey (datas = []) {
  const result = [];
  // console.log('datas', datas);
  datas.forEach(ele => {
    const { id, parentCode, parentLabel, level, code,
      sort, classLabel, classTttle, classPath, jumpCode,
      jumpPath, layoutType, classInfo, classLabelEn, classTttleEn,
      classInfoEn, classIcon, introCrid, componentCode,
      createUserId, createDatatime, modifyDatatime, modifyUserId,
      version,
      active,
      backgroud,
      deleted,
      mark,
    } = ele;
    result.push({
      key: id,
      id,
      parentCode,
      parentLabel,
      level,
      code,
      sort,
      classLabel,
      classTttle,
      classPath,
      jumpCode,
      jumpPath,
      layoutType,
      classInfo,
      classLabelEn,
      classTttleEn,
      classInfoEn,
      classIcon,
      introCrid,
      componentCode,
      createUserId,
      createDatatime,
      modifyDatatime,
      modifyUserId,
      version,
      active,
      backgroud,
      deleted,
      mark,
    })
  })
  // console.log('result', result);
  return result
}

export function handleOption (option) {
  const { ...result } = option
  // console.log(result);
  Object.keys(result).forEach(i => {
    if (i === 'title') {
      result[i] = null;
    }
    if (i === 'tooltip') {
      result[i] = null;
    }
    if (i === 'legend') {
      result[i] = null;
    }
    if (i === 'toolbox') {
      result[i] = null;
    }
    if (i === 'xAxis') {
      // delete result[i].boundaryGap;
      delete result[i].data;
    }
    if (i === 'yAxis') {
      // delete result[i].boundaryGap;
      delete result[i].data;
    }
    if (i === 'series') {
      result[i].forEach(item => {
        if (item.label) {
          delete item.label.position;
        }
        if (item.emphasis) {
          delete item.emphasis;
        }
      })
      // for (const j of result[i]) {
      //   if (j.label) {
      //     delete j.label.position;
      //   }
      //   if (j.emphasis) {
      //     delete j.emphasis;
      //   }
      // }
    }
  })
  return result
}
