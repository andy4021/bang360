// 上传图片
/*
* author:laozhang
* 2019.1.22
* req:请求对象，
* picName:表单图片的name
* cb回调：{
*   ok:1,未上传图片   2、请选择正确的图片格式（.gif,.png,.jpg）3、上传成功
* }*/
var formidable = require("formidable");
var fs = require("fs");
module.exports.upPic =function (req,picName,cb) {
    var form = new formidable.IncomingForm();
    form.encoding = "utf-8";
    form.uploadDir = "./upload";
    form.keepExtensions = true;

    form.parse(req,function (err,params,file) {
        var picInfo = file[picName];
        if(picInfo.size>0){// 说明有图片
            var keepArr =[".jpg",".png",".gif"];
            var index = picInfo.name.lastIndexOf(".");
            var keepName = picInfo.name.substr(index).toLowerCase();
            if(keepArr.includes(keepName)){
                var newPicName = Date.now()+keepName;
                fs.rename(picInfo.path,"./upload/"+newPicName,function (err) {
                    cb({
                        ok:3,
                        msg:"上传成功",
                        params,
                        newPicName
                    })
                })
            }else{
                fs.unlink(picInfo.path,function (err) {
                    cb({
                        ok:2,
                        msg:"请选择正确的图片格式（.gif,.png,.jpg）",
                        params
                    })
                })
            }
        }else{
            fs.unlink(picInfo.path,function (err) {
                cb({
                    ok:1,
                    msg:"未上传图片",
                    params
                })
            })
        }
    })

}