const { parseData, comparePwd, generateToken } = require('../../../utils/tools');
const { prisma } = require('../../../db');
const router = require('express').Router();
router.post('/admin_login', async (req, res, next) => {
  const { userName, password } = req.body;
  if (userName&& password ) {
    const manager = await prisma.manager.findFirst({
      where: {
        userName: userName,
      }
    });
    if (manager) {
        comparePwd(password,manager.password).then(result=>{
            // 密码正确,生成token
            // 使用jwt插件
            if(result){
                generateToken(manager).then(token=>{
                    res.json(parseData(token, true, '登录成功'));
                })
            }else{
                res.json(parseData('密码错误', false, '请重新填写正确的密码'));
            }
        })
    }else{
      res.json(parseData('用户名不存在', false, '请重新填写正确的用户名'));
    }
  } else {
    res.json(parseData('用户名和密码不能为空', false, '请输入用户名或密码'));
  }
});

module.exports = router;