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

export const dalImg = (url: string) => {
  if(url){
    // 网络图片地址
    if(url.startsWith('http'))return url
    // 本地图片地址
    // @ts-ignore
    return SERVER_URL + url
  }
//   如果没有url,返回默认图片
  return 'http://gips2.baidu.com/it/u=195724436,3554684702&fm=3028&app=3028&f=JPEG&fmt=auto?w=1280&h=960'
};