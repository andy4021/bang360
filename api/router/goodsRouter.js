const db = require("../module/db");
const common = require("../module/common");
const {upPic}= require("../module/upPic");//{upPic:xxx}
const fs = require("fs");

module.exports.getGoodsTypeList = function (req,res) {
    db.find("goodsTypeList",{
        sort:{goodsType:1}
    },function (err,goodsTypeList) {
        res.json({
            ok:1,
            goodsTypeList
        })
    })
}


module.exports.getGoodsById = function (req,res) {
    db.findOneById("goodsList",req.query.id,function (err,goodsInfo) {
        res.json({
            ok:1,
            goodsInfo
        })
    })
}

module.exports.deleteGoodsById =function (req,res) {
    // 1、删除数据库的文档，2 删除 文件
    var id = req.query.id;
    db.findOneById("goodsList",id,function (err,goodsInfo) {
        fs.unlink("./upload/"+goodsInfo.goodsPic,function (err) {
            db.deleteOneById("goodsList",id,function (err) {
                res.json({
                    ok:1,
                    msg:"成功"
                })
            })
        })
    })
}

module.exports.upGoods = function (req,res) {
    upPic(req,"goodsPic",function (obj) {
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
                goodsName:obj.params.goodsName,
                goodsType:obj.params.goodsType/1,
                orderByNum:obj.params.orderByNum/1,
                goodsPrice:obj.params.goodsPrice/1
            }
            // console.log(1111,whereObj);
            if(obj.ok  === 3){
                whereObj.goodsPic = obj.newPicName;
            }
            db.updateOneById("goodsList",obj.params.id,whereObj,function (err,results) {
                // console.log(obj.params.id);
                res.json({
                    ok:1,
                    msg:"修改成功"
                })
            })
        }
    })
}




//获取商品
module.exports.getGoods = function (req,res) {
    var goodsType = req.query.goodsType/1;
    var keyword = req.query.keyword;
    var find = {};
    if(goodsType > 0)
        find.goodsType = goodsType
    if(keyword.length>0){
        find.goodsName = new RegExp(keyword);
    }
    db.count("goodsList",find,function (count) {
        var pageNum =2;
        var pageSum =Math.ceil(count/pageNum);// 总页数
        if(pageSum<1)
            pageSum=1;
        var pageIndex = req.query.pageIndex/1;
        if(pageIndex<1)
            pageIndex =1;
        if(pageIndex>pageSum)
            pageIndex =pageSum;
        db.find("goodsList",{
            find,
            sort:{
                orderByNum:-1,
                addTime:-1
            },
            skip:(pageIndex-1)*pageNum,
            limit:pageNum
        },function (err,goodsList) {
            res.json({
                ok:1,
                goodsList,
                pageIndex,
                pageSum
            })
        })
    })
}

module.exports.addGoods = function (req,res) {
    upPic(req,"goodsPic",function (obj) {
        // console.log(111111111);
        if(obj.ok === 3){
            db.insertOne("goodsList",{
                goodsName:obj.params.goodsName,
                goodsType:obj.params.goodsType/1,
                orderByNum:obj.params.orderByNum/1,
                goodsPic:obj.newPicName,
                goodsPrice:obj.params.goodsPrice/1,
                addTime:common.getNowTime()
            },function (err,results) {
                common.json(res,1,"上传成功")
            })
        }else{
            common.json(res,-1,obj.msg);
        }
    })
}
//前端调用方法
module.exports.goodsListByType = function (req,res) {
    //  advType     advNum  ?
    var goodsType = req.query.goodsType/1;
    var goodsNum = req.query.goodsNum/1;
    db.find("goodsList",{
        find:{
            goodsType
        },
        sort:{
            orderByNum:-1,
            addTime:-1
        },
        limit:goodsNum
    },function (err,goodsList) {
        res.json({
            ok:1,
            goodsList
        })
    })

}