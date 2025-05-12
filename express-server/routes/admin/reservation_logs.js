/**
 * 列表 分页形式
 *     名字手机号查询
 *      用户id查找,主要是用在用户列表上的查看预约记录功能
 *      预约id查找,主要用在预约记录列表上的查看预约记录功能
 * 新增
 * 修改
 * 获取单条记录
 * 删除多个
 * 删除单个
 * 
 */
const router = require('express').Router();
const {prisma} = require('../../db');
const { parseData,encodePwd,comparePwd, getUserIdFromToken } = require('../../utils/tools');
/*
 * 列表 分页形式
 */
router.get('/', async function(req,res,next){
    try{
        const {page=1,per=10,name,mobile,uid:userId,rid} = req.query;  //?page=2&per=10
        const query = {}
        if(name){
            query.name = {
                contains: name
            }
        }
        if(mobile){
            query.mobile = {
                contains: mobile
            }
        }
        if(userId){
            query.userId = userId
        }
        if(rid){
            query.reservationId = rid
        }

        const count = await prisma.reservationLog.count({where:query}); //获取总条数
        const list = await prisma.reservationLog.findMany({
            skip: (page*1-1)*per,
            take: per*1,  //每页条数
            where: query,
            orderBy: {
                createdAt: 'desc'
            },
            include: { //关联查询 预约信息 与 用户信息
                reservation: true,
                user: true
            }
        })
        return res.json(parseData({
            data:list,
            page:page*1,
            pages: Math.ceil(count/per), //总页数
            per:per*1,
            total:count
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
        let data = req.body;
        let result = await prisma.reservationLog.create({
            data
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
        let data= req.body;
        let result = await prisma.reservationLog.update({
            where: {
                id: id
            },
            data
        })
        return res.json(parseData(result,true,'修改成功'))
    }catch (error) {
        next(error);
    }
})  

 

 
/**
 * 获取单个记录,不包含密码
 * 
 */
router.get('/:id', async function(req,res,next){
    try{
        let {id} = req.params;
        let result = await prisma.reservationLog.findFirst({
            where: {
                id: id
            },
            include: { //关联查询 预约信息 与 用户信息
                reservation: true,
                user: true
            }
        })
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
        let {count} = await prisma.reservationLog.deleteMany({
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
        let result = await prisma.reservationLog.delete({
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