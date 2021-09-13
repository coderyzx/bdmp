export function getMenuPageKey (datas = []) {
  const result = [];
  // console.log('datas', datas);
  datas.forEach(ele => {
    const { id, parentCode, parentLabel, level, code,
      sort, classLabel, classTttle, classPath, jumpCode,
      jumpPath, layoutType, classInfo, classLabelEn, classTttleEn,
      classInfoEn, classIcon, introCrid, componentCode,
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
    })
  })
  // console.log('result', result);
  return result
}

export function handleOption (option) {
  const { ...result } = option
    for (const i in result) {
      // switch (i) {
      //   case 'title': result[i] = null;
      //   case 'tooltip': result[i] = null;
      //   case 'legend': result[i] = null;
      //   case 'toolbox': result[i] = null;
      //   case 'xAxis': result[i] = null;
      //   case 'yAxis': result[i] = null;
      //   case 'series': result[i] = null;
      // }
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
        for (const j of result[i]) {
          if (j.label) {
            delete j.label.position;
          }
          if (j.emphasis) {
            delete j.emphasis;
          }
        }
      }
    }
    // console.log('result', result);
  return result
}
