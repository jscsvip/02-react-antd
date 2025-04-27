/**
 * 列表 分页形式
 * 新增
 * 修改
 * 修改密码
 * 获取单条记录
 * 获取当前用户信息.通过token
 * 删除多个
 * 删除单个
 * 
 */
const router = require('express').Router();

/*
 * 列表 分页形式
 */
router.get('/', async function(req,res,next){

})

/*
 * 新增
 */
router.post('/', async function(req,res,next){

})

/*
 * 修改 根据id
 */
router.put('/:id', async function(req,res,next){

})  

/*
 * 修改密码 根据id
 */
router.put('/:id/reset_pwd', async function(req,res,next){

})

/**
 * 获取当前用户的登录信息,需要token
 * 
 */
router.get('/info', async function(req,res,next){

})
/**
 * 获取单个记录,不包含密码
 * 
 */
router.get('/:id', async function(req,res,next){

})

/**
 * 
 * 删除多个
 * 使用url传递 用,分割
 * 例如 ?ids=1,2,3
 */
router.delete('/delete_many', async function(req,res,next){

})

/*
 * 删除单个 根据id
 */
router.delete('/:id', async function(req,res,next){

})





module.exports = router;