module.exports.getNowTime=function(){
    var date=new Date();
    return date.getFullYear()+"-"
        +(date.getMonth()+1).toString().padStart(2,"0")+"-"
        +date.getDate().toString().padStart(2,"0")+" "
        +date.getHours().toString().padStart(2,"0")+":"
        +date.getMinutes().toString().padStart(2,"0")+":"
        +date.getSeconds().toString().padStart(2,"0");

}
module.exports.json=function (res,ok=-1,msg="网络连接错误") {
    res.json(
        {
            ok,
            msg
        }
    )
}