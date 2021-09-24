export function addToolOption (option) {
  const { ...result } = option
  // if (!result.hasOwnProperty('toolbox')) {
  // }
  result.toolbox = [
    {
      padding: 5,
      itemGap: 8,
      backgroundColor: 'transparent',
      borderColor: '#ccc',
      orient: 'horizontal',
      show: true,
      tooltip: {
        show: false,
        position: 'bottom',
      },
      iconStyle: {
        borderColor: '#666',
        color: 'none',
      },
      feature: {
        saveAsImage: {
          connectedBackgroundColor: '#fff',
          excludeComponents: [
            'toolbox',
          ],
          show: true,
          icon: 'M4.7,22.9L29.3,45.5L54.7,23.4M4.6,43.6L4.6,58L53.8,58L53.8,43.6M29.2,45.1L29.2,0',
          name: '',
          title: '保存为图片',
          type: 'png',
          lang: [
            '右键另存为图片',
          ],
        },
        restore: {
          show: true,
          icon: 'M3.8,33.4 M47,18.9h9.8V8.7 M56.3,20.1 C52.1,9,40.5,0.6,26.8,2.1C12.6,3.7,1.6,16.2,2.1,30.6 M13,41.1H3.1v10.2 M3.7,39.9c4.2,11.1,15.8,19.5,29.5,18 c14.2-1.6,25.2-14.1,24.7-28.5',
          title: '还原',
        },
        dataZoom: {
          yAxisIndex: 'none',
          show: true,
          filterMode: 'filter',
          icon: {
            zoom: 'M0,13.5h26.9 M13.5,26.9V0 M32.1,13.5H58V58H13.5 V32.1',
            back: 'M22,1.4L9.9,13.5l12.3,12.3 M10.3,13.5H54.9v44.6 H10.3v-26',
          },
          title: {
            zoom: '区域缩放',
            back: '区域缩放还原',
          },
          brushStyle: {
            borderWidth: 0,
            color: 'rgba(210,219,238,0.2)',
          },
          iconStatus: {
            zoom: 'normal',
            back: 'normal',
          },
        },
      },
      top: 'top',
      borderRadius: 0,
      left: 'right',
      borderWidth: 0,
      showTitle: true,
      emphasis: {
        iconStyle: {
          borderColor: '#3E98C5',
        },
      },
      z: 6,
      zlevel: 0,
      itemSize: 15,
    },
  ]
  if (!result.hasOwnProperty('axisPointer')) {
    result.axisPointer = [
      {
        show: 'auto',
        zlevel: 0,
        z: 50,
        type: 'line',
        snap: false,
        triggerTooltip: true,
        value: null,
        status: null,
        link: [],
        animation: null,
        animationDurationUpdate: 200,
        lineStyle: {
          color: '#B9BEC9',
          width: 1,
          type: 'dashed',
        },
        shadowStyle: {
          color: 'rgba(210,219,238,0.2)',
        },
        label: {
          show: true,
          formatter: null,
          precision: 'auto',
          margin: 3,
          color: '#fff',
          padding: [
            5,
            7,
            5,
            7,
          ],
          backgroundColor: 'auto',
          borderColor: null,
          borderWidth: 0,
          borderRadius: 3,
        },
        handle: {
          show: false,
          icon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4h1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7v-1.2h6.6z M13.3,22H6.7v-1.2h6.6z M13.3,19.6H6.7v-1.2h6.6z',
          size: 45,
          margin: 50,
          color: '#333',
          shadowBlur: 3,
          shadowColor: '#aaa',
          shadowOffsetX: 0,
          shadowOffsetY: 2,
          throttle: 40,
        },
      },
    ]
  }
  return result;
}
