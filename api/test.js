var db = require("./module/db");
db.findOneById("advList","5c47c665e4359131e8e6991b",function (err,advInfo) {
    console.log(advInfo);
})


// db.count("advList",{advType:3},function (count) {
//     console.log(count);
// })




// function post(cb) {
//    console.log(cb);
//     cb(3,4);
// }
//
// function fn(a,b) {
//     console.log(a,b);
// }
//
// post(fn())






// var {a,b} ={a:1,b:2};
// console.log(a,b);

// var [a,[b,c=b]] = [1,[2]];
// console.log(a,b,c);

// function fn({a,{c,d}}) {
//     console.log(a,c,d);
//
// }
// fn({a:3,{c:5,d:6}})




//
//
// var app ={
//    post:function (routerName,fn) {
//        fn(1,2);
//    }
// }
// function cb(req,res) {
//     console.log(req,res);
// }
// app.post("/adv",cb)












// var fs = require("fs");
// // fs.rename("./xixi.txt","./haha.txt",function (err) {
// //     console.log(err);
// // })
// fs.unlink("./haha.txt",function (err) {
//    console.log(err);
// })

// var name= '1000.txt';
// var index =name.lastIndexOf(".");
// console.log(index);
// console.log(name.substr(index).toLowerCase());
// var keepName = name.substr(index).toLowerCase();
// var keepArr =[".jpg",".png",".gif"];
// if(keepArr.includes(keepName)){
//    console.log(true);
// }