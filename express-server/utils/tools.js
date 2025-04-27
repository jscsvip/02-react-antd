/*
 * @Date: 2025-04-26 11:17:35
 * @LastEditors: 李龙
 * @LastEditTime: 2025-04-26 11:39:48
 * @FilePath: \02-react-antd\express-server\utils\tools.js
 */
const bcrypt = require('bcryptjs');
const saltRounds = 10; // 加盐轮数，可以根据需要调整

/**
 * 对密码进行哈希处理
 * @param {string} plainPassword 明文密码
 * @returns {Promise<string>} 哈希后的密码
 */
async function encodePwd(plainPassword) {
  if (!plainPassword) {
    throw new Error('Password cannot be empty');
  }
  try {
    const hashedPassword = await bcrypt.hash(plainPassword+'', saltRounds);
    return hashedPassword;
  } catch (error) {
    console.error("Error hashing password in tool.js:", error);
    throw error; // 将错误向上抛出，以便调用者处理
  }
}

/**
 * 比较明文密码和哈希密码是否匹配
 * @param {string} plainPassword 用户输入的明文密码
 * @param {string} hashedPassword 数据库中存储的哈希密码
 * @returns {Promise<boolean>} 是否匹配
 */
async function comparePwd(plainPassword, hashedPassword) {
  if (!plainPassword || !hashedPassword) {
    return false; // 如果缺少任一参数，则无法比较
  }
  try {
    const match = await bcrypt.compare(plainPassword, hashedPassword);
    return match;
  } catch (error) {
    console.error("Error comparing password in tool.js:", error);
    // 在比较出错时，通常应视为不匹配，避免潜在的安全风险
    return false;
  }
}

// 统一返回格式
function parseData(data = {}, success= true,message = '',errorCode = '') {
  return {
    data,
    success,
    message,
    errorCode
  }
}

module.exports = {
  parseData,
  encodePwd,
  comparePwd
}