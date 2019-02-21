const db = require("../module/db");
const common = require("../module/common");
const {upPic}= require("../module/upPic");//{upPic:xxx}
const fs = require("fs");
module.exports.getAdvTypeList = function (req,res) {
    db.find("advTypeList",{
        sort:{advType:1}
    },function (err,advTypeList) {
        res.json({
            ok:1,
            advTypeList
        })
    })
}

module.exports.getAdv = function (req,res) {
    var advType = req.query.advType/1;
    var keyword = req.query.keyword;
    var find = {};
    if(advType > 0)
        find.advType = advType
    if(keyword.length>0){
        find.advTitle = new RegExp(keyword);
    }
    db.count("advList",find,function (count) {
        var pageNum =2;
        var pageSum =Math.ceil(count/pageNum);// 总页数
        if(pageSum<1)
            pageSum=1;
        var pageIndex = req.query.pageIndex/1;
        if(pageIndex<1)
            pageIndex =1;
        if(pageIndex>pageSum)
            pageIndex =pageSum;
        db.find("advList",{
            find,
            sort:{
                orderByNum:-1,
                addTime:-1
            },
            skip:(pageIndex-1)*pageNum,
            limit:pageNum
        },function (err,advList) {
            res.json({
                ok:1,
                advList,
                pageIndex,
                pageSum
            })
        })
    })
}

module.exports.getAdvById = function (req,res) {
    db.findOneById("advList",req.query.id,function (err,advInfo) {
        res.json({
            ok:1,
            advInfo
        })
    })
}

module.exports.deleteAdvById =function (req,res) {
    // 1、删除数据库的文档，2 删除 文件
    var id = req.query.id;
    db.findOneById("advList",id,function (err,advInfo) {
        fs.unlink("./upload/"+advInfo.advPic,function (err) {
            db.deleteOneById("advList",id,function (err) {
                res.json({
                    ok:1,
                    msg:"成功"
                })
            })
        })
    })
}

module.exports.upAdv = function (req,res) {
    upPic(req,"advPic",function (obj) {
        /*
        * 1、判断ok是否等于2
        *   1、等于2，返回错误信息
        *   2、不等于2
        *       1、等于1的时候，不需要更新图片（advPic）
        *       2、等于3的时候，需要更新图片*/

        if(obj.ok === 2){
            common.json(res,-1,obj.msg);
        }else{
            var whereObj ={
                advTitle:obj.params.advTitle,
                advType:obj.params.advType/1,
                orderByNum:obj.params.orderByNum/1,
                advHref:obj.params.advHref
                // advPic:obj.newPicName,
            }
            console.log(1111,whereObj);
            if(obj.ok  === 3){
                whereObj.advPic = obj.newPicName;
            }
            db.updateOneById("advList",obj.params.id,whereObj,function (err,results) {
                console.log(err,results);
                res.json({
                    ok:1,
                    msg:"修改成功"
                })
            })
        }
    })
}
module.exports.addAdv = function (req,res) {
    // upPic(req,xxx,xxxx,function (err,result) {
    //
    // })
    upPic(req,"advPic",function (obj) {
        console.log(111111111);
        if(obj.ok === 3){
            db.insertOne("advList",{
                advTitle:obj.params.advTitle,
                advType:obj.params.advType/1,
                orderByNum:obj.params.orderByNum/1,
                advHref:obj.params.advHref,
                advPic:obj.newPicName,
                addTime:common.getNowTime()
            },function (err,results) {
                common.json(res,1,"上传成功")
            })
        }else{
            common.json(res,-1,obj.msg);
        }
    })
}


module.exports.advListByType = function (req,res) {
    //  advType     advNum  ?
    var advType = req.query.advType/1;
    var advNum = req.query.advNum/1;
    db.find("advList",{
        find:{
            advType
        },
        sort:{
            orderByNum:-1,
            addTime:-1
        },
        limit:advNum
    },function (err,advList) {
        res.json({
            ok:1,
            advList
        })
    })
}

