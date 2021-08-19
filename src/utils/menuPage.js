export function getMenuPageKey (datas = []) {
  const result = [];
  // console.log('datas', datas);
  datas.forEach(ele => {
    const { id, parentCode, parentLabel, level, code, 
      sort, classLabel,classTttle,classPath, jumpCode,
      jumpPath,layoutType,classInfo,classLabelEn,classTttleEn,
      classInfoEn,classIcon,introCrid,componentCode
    } = ele;
    result.push({
      key: id,
      id, parentCode, parentLabel, level, code, 
      sort, classLabel,classTttle,classPath, jumpCode,
      jumpPath,layoutType,classInfo,classLabelEn,classTttleEn,
      classInfoEn,classIcon,introCrid,componentCode,
    })
  })
  // console.log('result', result);
  return result
}
