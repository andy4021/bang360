const mongodb = require("mongodb");
const mongoClient = mongodb.MongoClient;
// 连接数据库
function _connect(cb) {
    mongoClient.connect("mongodb://127.0.0.1:27017",{useNewUrlParser:true},function (err,client) {
        if(err){
            console.log("连接失败")
        }else{
            console.log("连接成功");
            var db = client.db("bang");// 获得你要操作的数据库
            cb(db);// 执行回调
        }
    })
}
/*更新一条记录*/
module.exports.updateOneBySet =function (coll,whereObj,upObj,cb) {
    _connect(function (db) {
        db.collection(coll).updateOne(whereObj,{$set:upObj},cb)
    })
}
module.exports.updateOne=function (coll,whereObj,upObj,cb) {
    _connect(function (db) {
        db.collection(coll).updateOne(whereObj,upObj,cb)
    })
}
module.exports.updateOneById=function (coll,id,upObj,cb) {
    _connect(function (db) {
        db.collection(coll).updateOne({_id:mongodb.ObjectId(id)},{$set:upObj},cb)
    })
}
/*根据ID删除记录*/
module.exports.deleteOneById = function (coll,id,cb) {
    _connect(function (db) {
        db.collection(coll).deleteOne({_id:mongodb.ObjectId(id)},cb)
    })
}
/*删除一条记录
* coll:集合名
* whereObj:删除的条件
* cb:回调函数*/
module.exports.deleteOne=function(coll,whereObj,cb){
    _connect(function (db) {
        db.collection(coll).deleteOne(whereObj,cb)
    })
}
/*
* 获得条数
*   coll:集合名*/
module.exports.count=function(coll,whereObj,cb){
    _connect(function (db) {
        db.collection(coll).countDocuments(whereObj).then(cb)
    })
}
module.exports.findOneById = function (coll,id,cb) {
    _connect(function (db) {
        db.collection(coll).findOne({_id:mongodb.ObjectId(id)},cb)
    })
}
/*
* 根据条件查找信息
* obj:
*   find:条件，
*   sort:排序条件
*   skip:跳过行数
*   limit:显示行数*/
module.exports.find = function (coll,obj,cb) {
    // 语法糖
    obj.find = obj.find || {};
    obj.sort = obj.sort || {};
    obj.skip = obj.skip || 0;
    obj.limit = obj.limit || 0;
    _connect(function (db) {
        db.collection(coll).find(obj.find).sort(obj.sort).skip(obj.skip).limit(obj.limit).toArray(cb);
        // db.collection(colle).find().toArray(function (err,results) {
        //     cb(err,results);
        // });
    })
}
/*
* 添加一条记录
* coll:插入的集合名
* obj:插入的内容
* cb:返回插入的结果*/
module.exports.insertOne = function (coll,obj,cb) {
    console.log(obj);
    _connect(function (db) {
        db.collection(coll).insertOne(obj,cb);
    })
}
