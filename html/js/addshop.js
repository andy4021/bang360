
window.onload=function(){  
    function getAdvList(advType,advNum,cb) {
        var xhr = new XMLHttpRequest();
        xhr.open("get","http://127.0.0.1/advListByType?advType="+advType+"&advNum="+advNum);
        xhr.send();
        xhr.onload=function (ev) {
            // console.log(xhr.responseText);
            cb(JSON.parse(xhr.responseText))
        }
    }
    /***************************************************************************************/
    function getGoodsList(goodsType,goodsNum,cb) {
        var xhr = new XMLHttpRequest();
        xhr.open("get","http://127.0.0.1/goodsListByType?goodsType="+goodsType+"&goodsNum="+goodsNum);
        xhr.send();
        xhr.onload=function (ev) {
            // console.log(xhr.responseText);
            cb(JSON.parse(xhr.responseText))
        }
    }
    // console.log(getQueryString("userName"));

    function getQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");

        var r = window.location.search.substr(1).match(reg);

        if (r != null) return r[2]; return null;
    }

    getAdvList(1,3,function (obj) {
        document.querySelector(".banner").innerHTML=baidu.template("tp",obj)
    });
    // 轮播图底部
    getAdvList(2,4,function (obj) {
    // console.log(obj.advList.length);
        document.querySelector(".seaa").innerHTML=baidu.template("tp2",obj)
    });
    // 热门回收的广告
    getAdvList(4,1,function (obj) {
        document.querySelector("#sesa").innerHTML=baidu.template("tp3",obj)
    });
    // 轮播图的广告
    getAdvList(3,1,function (obj) {
        document.querySelector("#sess").innerHTML=baidu.template("tp4",obj)
    });


    // 热门回收商品
    getGoodsList(1,5,function (obj) {
        document.querySelector("#hot_shop").innerHTML=baidu.template("tp5",obj)
    });
    // 精选商品
    getGoodsList(2,5,function (obj) {
        document.querySelector("#jing_shop").innerHTML=baidu.template("tp6",obj)
    });
    
}