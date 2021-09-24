const userColumns = [
  {
    title: '用户id',
    dataIndex: 'uid',
    width: 150,
    key: 'uid',
  },
  {
    title: '用户名称',
    dataIndex: 'name',
    width: 250,
    key: 'name',
  },
  {
    title: '租户名称',
    dataIndex: 'tenant_name',
    width: 250,
    key: 'tenant_name',
  },
  {
    title: '租户id',
    dataIndex: 'tenant_id',
    width: 250,
    key: 'tenant_id',
  },
  {
    title: '性别',
    dataIndex: 'gender',
    width: 150,
    key: 'gender',
    render: val => {
      if (val === 'F') return '女';
      if (val === 'O') return '未知';
      if (val === 'M') return '男';
      return '-';
    },
  },
  {
    title: '登录方式',
    dataIndex: 'channel',
    width: 150,
    key: 'channel',
    render: val => {
      if (val === '4256') return '域账号';
      if (val === '6341') return '自定义账号（批量注册）';
      if (val === '8569') return '社交账号';
      if (val === '7542') return '手机账号';
      if (val === '5231') return '邮箱账号';
      if (val === '7563') return '武汉CA账号';
      if (val === '4589') return '未知账号';
      return '-';
    },
  },
];

export default userColumns;
