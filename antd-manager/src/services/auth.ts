// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 登录接口 POST /api/login/account */
export async function loginAPI(body: RAPI.LoginParams, options?: { [key: string]: any }) {
  return request<RAPI.ApiResult>('/api/v1/auth/admin_login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

export async function getCurrentUserAPI() {
  return request('/api/v1/admin/managers/info',{
    method: 'GET',
  }) 
}