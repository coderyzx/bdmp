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
      Object.keys(result[i][0]).forEach(item => {
        if (result[i][0][item] === 'label') {
          delete result[i][0][item].position;
        }
        if (result[i][0][item] === 'emphasis') {
          delete result[i][0][item];
        }
        // if (result[i][0][item] === 'detail') {
        //   Object.keys(result[i][0][item]).forEach(e => {
        //     if (result[i][0][item][e] === 'fontSize') {
        //       result[i][0][item][e] = 0;
        //     }
        //   })
        // }
        // if (result[i][0][item] === 'data') {
        //   // console.log( result[i][0][item]);
        //   result[i][0][item].forEach(e => {
        //     Object.keys(result[i][0][item][e]).forEach(elel => {
        //       if (result[i][0][item][e][elel] === 'name') {
        //         result[i][0][item][e][elel] = null;
        //       }
        //     })
        //   })
        // }
        if (result[i][0][item] === 'labelLine') {
          Object.keys(result[i][0][item]).forEach(elem => {
            if (result[i][0][item][elem] === 'lineStyle') {
              Object.keys(result[i][0][item][elem]).forEach(el => {
                if (result[i][0][item][elem][el] === 'width') {
                  result[i][0][item][elem][el] = 0;
                }
              })
            }
          })
        }
      })
    }
  })
  return result
}
