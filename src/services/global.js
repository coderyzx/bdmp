import request from '@/utils/request';

export async function getLogin(payload) {
  return request('/api/consumer/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });
}

export async function getRegister(payload) {
  return request('/api/consumer/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });
}
