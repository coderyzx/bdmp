import { getRandomId } from '@/utils/utils';

const DEFAULTCOLS = 24;

const CONTAINERCONFIG = {
  DEFAULTCOLS: 24,
  DEFAULTROWHEIGHT: 12,
  DEFAULTMARGIN: 15,
  DEFAULTHEIGHT: 20,
  DEFAULTWIDTH: DEFAULTCOLS / 2,
};

const { DEFAULTHEIGHT, DEFAULTWIDTH } = CONTAINERCONFIG

export const addNewContainer2Dashboard = data => {
  const result = [];
  if (data && data.length) {
    data.forEach(ele => {
      const { id, chartOptions } = ele;
      result.push({
        id,
        chartOption: chartOptions,
      })
    })
  }

  return result;
};

export const setItemId = datas => {
  if (datas && datas.length) {
    datas.forEach(val => {
      const item = val;
      const { id } = item;
      item.id = `${getRandomId()}-${id}`;
    })
  }
}

export const layoutData2Mapping = layoutArr => {
  const mapping = {};
  layoutArr.forEach(ele => {
    const { i } = ele;
    mapping[i] = ele;
  });
  return mapping;
}

export const getContainerLayout = (datas, layoutData) => {
  const result = [];
  const layouts = layoutData2Mapping(layoutData);
  if (datas && datas.length) {
    datas.forEach((val, index) => {
      const { id } = val;
      const layout = layouts[id] || {
        i: id,
        x: (index % 2) > 0 ? ((Math.ceil(index / 2) * DEFAULTWIDTH) + 1) : 0,
        y: Math.floor(index / 2) * DEFAULTHEIGHT,
        w: DEFAULTWIDTH,
        h: DEFAULTHEIGHT,
      }
      result.push(layout);
    })
  }
  return result;
}
