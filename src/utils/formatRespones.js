export const formatRes = (values, chartsOtions) => {
  const charts = [];
  values.forEach((ele, index) => {
    if (ele.data) {
      const { data: { chartData, user_cnt: count,
        columns, dataSource, data: tableData,
        nodes, categories, links, total,
      } } = ele;
      const { curType, id, ...other } = chartsOtions[index];
      let chartOptions = {};
      switch (curType) {
        case 'wordCloud':
          chartOptions = {
            renderType: 'wordCloud',
            curType,
            data: ele.data.data,
            id,
            links,
            ...other,
          };
          break;
        case 'sankey':
          chartOptions = {
            renderType: 'chart',
            id,
            nodes: tableData,
            curType,
            links,
            ...other,
          }
          break;
        case 'graph':
          chartOptions = {
            renderType: 'chart',
            id,
            nodes,
            curType,
            categories,
            links,
            ...other,
          }
          break;
        case 'map':
          chartOptions = {
            renderType: 'map',
            id,
            data: chartData.data,
            ...other,
          }
          break;
        case 'retention':
          chartOptions = {
            renderType: 'retention',
            id,
            tableData,
            dataSource,
            columns,
            ...other,
          }
          break;
        case 'table':
          chartOptions = {
            renderType: 'table',
            id,
            tableData,
            dataSource,
            columns,
            ...other,
          }
          break;
        case 'card':
          chartOptions = {
            renderType: 'card',
            id,
            count: count || total,
            ...other,
          }
          break;
        case 'renderChildren':
          chartOptions = {
            renderType: 'renderChildren',
            id,
            chartData: {
              data: chartData.data,
              columns,
            },
            ...other,
          }
          break;
        case 'card1':
          chartOptions = {
            renderType: 'card1',
            id,
            count: count || total,
            num: chartData && Math.max(...chartData.data),
            columns,
            data: chartData && chartData.data,
            ...other,
          }
          break;
        case 'lineV2':
          chartOptions = {
            renderType: 'chartV2',
            id,
            curType,
            columns,
            chartData,
            ...other,
          }
          break;
        case 'line':
        case 'pie':
        case 'bar':
          chartOptions = {
            renderType: 'chart',
            id,
            columns,
            data: chartData[0].data,
            curType,
            ...other,
          }
          break;
        default:
          break;
      }
      charts.push(chartOptions);
    }
  });

  return charts;
}

export const formatChartsRes = (chartTypeList, charts) => {
  const chartTypeMapping = {};
  chartTypeList.forEach(ele => {
    const { id, name } = ele;
    chartTypeMapping[id] = name;
  });
  const chartObj = {};
  charts.forEach(ele => {
    const { chartTypeId, ...datas } = ele;
    const typeName = chartTypeMapping[chartTypeId];
    const values = {
      chartTypeId,
      typeName,
      ...datas,
    };
    if (!chartObj[typeName]) {
      chartObj[typeName] = [values];
    } else {
      chartObj[typeName].push(values);
    }
  });

  return chartObj;
}
