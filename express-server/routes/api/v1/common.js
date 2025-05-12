/*
 * @Date: 2025-04-26 11:08:09
 * @LastEditors: 李龙
 * @LastEditTime: 2025-04-26 11:45:00
 * @FilePath: \02-react-antd\express-server\routes\api\v1\common.js
 */
const router = require('express').Router();
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const { parseData,generateQRCode } = require('../../../utils/tools');
if(!fs.existsSync(path.join(__dirname, '../../../public/uploads'))){
  fs.mkdirSync(path.join(__dirname, '../../../public/uploads'), { recursive: true });
}

const storage = multer.diskStorage({
  // 设置文件存储路径
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../../../public/uploads'));
  },
  // 设置文件名
  filename: (req, file, cb) => {
    console.log(file);
    cb(null, 
      Math.round(Math.random()*1e9)+'-'+file.fieldname+'-'+Date.now()+path.extname(file.originalname)
    );
  }
});

const upload = multer({ storage });
router.post('/upload', upload.single('file'),(req, res) => {
    // 获取上传之后的文件名输出
    res.json(parseData('/uploads/'+req.file.filename));
});
// 生成二维码
router.get('/qrcode',(req,res)=>{
  const {data} = req.query;
  generateQRCode(data,(url)=>{
    res.json(parseData(url));
  })
})

module.exports = router;
