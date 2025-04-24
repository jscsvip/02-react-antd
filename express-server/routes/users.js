var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/list',function(req,res,next){
  res.json({
    code: 200,
    msg: 'success',
    data: [
      {
        name: '张三',
        age: 20
      },
      {
        name: '李四',
        age: 22
      }
    ]
  });
})

router.post('/add',function(req,res,next){
  
  console.log(req.body)
  res.json({
    code: 200,
    msg: 'success',
    data: JSON.stringify(req.body) // 转成J
  });
})
module.exports = router;
