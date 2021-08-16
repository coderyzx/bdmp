export function getMenuMapArrData (datas = []) {
  const result = [];

  datas.forEach(ele => {
    const { id, path, src, dataSrc, dataProcessed, title, subTitle } = ele;
    result.push({
      id,
      key: id,
      path,
      src,
      dataSrc,
      dataProcessed,
      title,
      subTitle,
    })
  })
  // console.log('result', result);
  return result
}
