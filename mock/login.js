import mockjs from 'mockjs';

export default {
  'GET /api/query/login': mockjs.mock({
    code: 'U000000',
    data: {
      success: true,
      data: true,
      username: '123',
      password: '123',
    },
  }),
};
