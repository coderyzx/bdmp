const defaultForm = [
  {
    type: 'DatePicker',
    label: '开始日期',
    field: 'timeStart',
    rules: null,
    formItemLayout: {
      labelCol: {
        span: 8,
      },
    },
  },
  {
    type: 'DatePicker',
    label: '结束日期',
    field: 'timeEnd',
    rules: null,
    formItemLayout: {
      labelCol: {
        span: 8,
      },
    },
  },
  {
    type: 'Select',
    label: '时间粒度',
    field: 'timeUnit',
    rules: null,
    formItemLayout: {
      labelCol: {
        span: 8,
      },
    },
    comProps: '',
    options: [
      // {
      //   key: 'YEAR',
      //   value: '年',
      // },
      // {
      //   key: 'MONTH',
      //   value: '月',
      // },
      // {
      //   key: 'WEEK',
      //   value: '周',
      // },
      {
        key: 'DAY',
        value: '日',
      },
      {
        key: 'HOUR',
        value: '小时',
      },
      {
        key: 'MINUTE',
        value: '分',
      },
    ],
  },
];

const formDatas = {
  defaultForm,
}

export default formDatas;
