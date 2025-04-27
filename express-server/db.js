const { PrismaClient } = require('@prisma/client')
// 创建一个数据库客户端实例
const prisma = new PrismaClient()

module.exports = {
    prisma
}