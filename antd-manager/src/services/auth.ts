// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 登录接口 POST /api/login/account */
export async function loginAPI(body: RAPI.LoginParams, options?: { [key: string]: any }) {
  return request<RAPI.ApiResult>('http://localhost:3000/api/v1/auth/admin_login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}