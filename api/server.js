const express = require("express");
const advRouter = require("./router/advRouter")
const goodsRouter = require("./router/goodsRouter")
const app = express();
app.use(express.static("../manage"));
app.use(express.static("./upload"));
app.use(express.static("../html"))
// 添加广告
app.post("/adv",advRouter.addAdv);
// 修改广告
app.put("/adv",advRouter.upAdv);
// 获取广告列表
app.get("/adv",advRouter.getAdv);
// 获取广告类别列表
app.get("/advTypeList",advRouter.getAdvTypeList);
// 根据ID删除广告信息
app.delete("/adv",advRouter.deleteAdvById);
// 根据ID获得广告信息
app.get("/advById",advRouter.getAdvById)
/**************************************对商品的管理*****************************************************/
//添加商品
app.post("/goods",goodsRouter.addGoods);
// 获取商品列表
app.get("/goods",goodsRouter.getGoods);


// 修改商品
app.put("/goods",goodsRouter.upGoods);
// 获取广告类别列表
app.get("/goodsTypeList",goodsRouter.getGoodsTypeList);
// 根据ID删除广告信息
app.delete("/goods",goodsRouter.deleteGoodsById);
// 根据ID获得广告信息
app.get("/goodsById",goodsRouter.getGoodsById)

/**************************************前端调用的接口****************************************************/
//广告调用
app.get("/advListByType",advRouter.advListByType)
//商品调用
app.get("/goodsListByType",goodsRouter.goodsListByType);



// app.post("/adv",function (req,res) {
//     // 基本的配置
//     var form = new formidable.IncomingForm();
//     form.uploadDir = "./upload";// 设置上传的地址
//     form.keepExtensions= true;// 保留扩展名
//     form.encoding = "utf-8";
//     // params 非file 文件的数据
//     form.parse(req,function (err,params,file) {
//         // 1、当你没有上传时，将空文件移除
//         // size path
//         var advPic = file["advPic"];
//         if(advPic.size > 0){
//             var keepArr =[".jpg",".png",".gif"];
//             var index =advPic.name.lastIndexOf(".");
//             var keepName = advPic.name.substr(index).toLowerCase();
//             if(keepArr.includes(keepName)){
//                 var newPicName = Date.now()+keepName;
//                 fs.rename(advPic.path,"./upload/"+newPicName,function (err) {
//                     // console.log(advPic);
//                     console.log(params);// 上传的项
//                     db.insertOne("advList",{
//                         advTitle:params.advTitle,
//                         advType:params.advType/1,
//                         orderByNum:params.orderByNum/1,
//                         advHref:params.advHref,
//                         advPic:newPicName,
//                         addTime:common.getNowTime()
//                     },function (err,results) {
//                         if(err)
//                             common.json(res);
//                         else
//                             common.json(res,1,"上传广告成功")
//                     })
//                 })
//             }else {
//                 fs.unlink(advPic.path,function (err) {
//                     res.json({
//                         ok: 1,
//                         msg: "请选择正确的图片格式（.gif,.png,.jpg）"
//                     })
//                 })
//             }
//         }
//         else{
//            fs.unlink(advPic.path,function (err) {
//                res.json({
//                    ok:-1,
//                    msg:"请选择要上传的图片"
//                })
//            })
//         }
//     })
// })
app.listen(80,function(){
    console.log("success");
})