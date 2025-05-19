/**
 * 设置token
 * @param token
 * @returns
 */
export const setToken = (token: string) => sessionStorage.setItem('token', token);

/**
 * 获取token
 * @returns
 */
export const getToken = () => sessionStorage.getItem('token');

/**
 * 删除token
 * @returns
 */
export const removeToken = () => sessionStorage.removeItem('token');