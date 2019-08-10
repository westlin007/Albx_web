const formidable = require('formidable')
var path = require('path')

exports.uploadFile = (req,res) => {
    var form = new formidable.IncomingForm()
    form.encoding = 'utf-8'
    form.uploadDir = __dirname + '/../uploads'
    form.keepExtensions = true

    form.parse(req,(err,fields,files) => {
        if(err){
            res.json({
                code:400,
                msg:'文件上传失败'
            })
        }else{
            var imgname = path.basename(files.img.path)
            res.json({
                code:200,
                msg:'上传文件成功',
                img:imgname
            })
        }
    })
}