/*
 * @Date: 2025-04-26 11:17:35
 * @LastEditors: 李龙
 * @LastEditTime: 2025-04-26 11:39:48
 * @FilePath: \02-react-antd\express-server\utils\tools.js
 */
// 统一返回格式
function parseData(data = {}, success= true,errorMessage = '',errorCode = '') {
  return {
    success,
    errorMessage,
    errorCode,
    data
  }
}

module.exports = {
  parseData
}