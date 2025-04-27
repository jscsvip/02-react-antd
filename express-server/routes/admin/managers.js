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
const {prisma} = require('../../db');
const { parseData,encodePwd,comparePwd } = require('../../utils/tools');
/*
 * 列表 分页形式
 */
router.get('/', async function(req,res,next){
    try{
        const {page=1,per=10} = req.query;  //?page=2&per=10

        const count = await prisma.manager.count(); //获取总条数
        const list = await prisma.manager.findMany({
            skip: (page*1-1)*per,
            take: per*1,  //每页条数
            where: {
                // is_delete: 0
            },
            orderBy: {
                createdAt: 'desc'
            }
        })
        return res.json(parseData({
            data:list.map(item=>{ //删除密码
                delete item.password;
                return item;
            }),
            page:page*1,
            pages: Math.ceil(count/per), //总页数
            per:per*1,
            count
            },true,'获取成功')
        )
    }catch (error) {
        next(error);
    }
    
})

/*
 * 新增
 */
router.post('/', async function(req,res,next){
    try {
        let {userName,nickName,password,avatar} = req.body;
        if (!userName || !password) {
            return res.json(parseData(null,false,'用户名和密码不能为空'));
        }
        let pwd = await encodePwd(password);
        let result = await prisma.manager.create({
            data: {
                userName,
                nickName,
                avatar,
                password: pwd
            }
        })
        return res.json(parseData(result,true,'添加成功'))
    }catch (error) {
       next(error); 
    }
})

/*
 * 修改 根据id
 */
router.put('/:id', async function(req,res,next){
    try{
        let {id} = req.params;
        let {userName,nickName,avatar} = req.body;
        let result = await prisma.manager.update({
            where: {
                id: id
            },
            data: {
                userName,
                nickName,
                avatar
            }
        })
        return res.json(parseData(result,true,'修改成功'))
    }catch (error) {
        next(error);
    }
})  

/*
 * 修改密码 根据id
 */
router.put('/:id/reset_pwd', async function(req,res,next){
    try{
        let {id} = req.params;
        let {password} = req.body;
        if (!password) {
            return res.json(parseData(null,false,'密码不能为空'));
        }
        let pwd = await encodePwd(password);
        let result = await prisma.manager.update({
            where: {
                id: id
            },
            data: {
                password: pwd
            }
        })
        return res.json(parseData(result,true,'修改成功'))
    }catch (error) {
        next(error);
    }
})

/**
 * 获取当前用户的登录信息,需要token
 * Todo: 实现登录功能后
 */
router.get('/info', async function(req,res,next){

})
/**
 * 获取单个记录,不包含密码
 * 
 */
router.get('/:id', async function(req,res,next){
    try{
        let {id} = req.params;
        let result = await prisma.manager.findFirst({
            where: {
                id: id
            }
        })
        delete result.password;
        return res.json(parseData(result,true,'获取成功'))
    }catch (error) {
        next(error);
    }

})

/**
 * 
 * 删除多个
 * 使用url传递 用,分割
 * 例如 ?ids=1,2,3
 */
router.delete('/delete_many', async function(req,res,next){
    try{
        let {ids} = req.query;
        if (!ids) {
            return res.json(parseData(null,false,'参数不能为空'));
        }
        let arr = ids.split(',');
        let {count} = await prisma.manager.deleteMany({
            where: {
                id: {
                    in: arr
                }
            }
        })
        return res.json(parseData(count,true,'删除多条成功'))
    }catch (error) {
        next(error);
    }
})

/*
 * 删除单个 根据id
 */
router.delete('/:id', async function(req,res,next){
    try{
        let {id} = req.params;
        let result = await prisma.manager.delete({
            where: {
                id: id
            }
        })
        return res.json(parseData(result,true,'删除成功'))
    }catch (error) {
        next(error);
    }
})





module.exports = router;