/*
 * @Date: 2025-04-26 11:17:35
 * @LastEditors: 李龙
 * @LastEditTime: 2025-04-26 11:39:48
 * @FilePath: \02-react-antd\express-server\utils\tools.js
 */
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

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
  console.log("Comparing passwords in tool.js:");
  console.log("Plain password:", plainPassword);
  console.log("Hashed password:", hashedPassword);  
  try {
    const match = await bcrypt.compare(plainPassword, hashedPassword);
    console.log("Password match:", match); // 打印匹配结果，用于调试
    return match;
  } catch (error) {
    console.error("Error comparing password in tool.js:", error);
    // 在比较出错时，通常应视为不匹配，避免潜在的安全风险
    return false;
  }
}

// 统一返回格式
function parseData(data = {}, success= true,message = '',code = '200') {
  return {
    data,
    success,
    message,
    code
  }
}
// console.log(process.env.SECRET_KEY);
const secretKey = process.env.SECRET_KEY // 从环境变量获取密钥，如果未设置则使用默认值
  // 替换为你的密钥
// 生成token

async function generateToken(user) {
  const options = { expiresIn: '5h' }; // 设置过期时间，例如1小时
  const payload = { userId: user.id }; // 自定义负载
  return jwt.sign(payload, secretKey, options);
}
/**
 * 
 * @param {*} token 
 * @returns 解析出来的userId
 */
function getUserIdFromToken(token) {
  try {
    return jwt.verify(token, secretKey).userId
  } catch (error) {
    console.error('Error verifying token:', error);
    return null;
  }
}

module.exports = {
  parseData,
  encodePwd,
  comparePwd,
  generateToken,
  getUserIdFromToken
}