
function showP(id){
    // 平稳退化
    if(!document.getElementById) return false;
    if(!document.getElementsByTagName) return false;
    if(!document.getElementsByTagName("div")) return false;
    // 得到all div
    var divs=document.getElementsByTagName("div");
    // 遍历数组
    for(var i=0;i<divs.length;i++){
        // 只需要id是section的div
        if(divs[i].className.indexOf("section")== -1) continue;
        if (divs[i].id != id) {
            divs[i].style.display="none";
        }else{
            divs[i].style.display="block";
        }
    }  
}

function findShowP(){
    // 平稳退化
    if(!document.getElementsByTagName) return false;
    if(!document.getElementById) return false;
    if(!document.getElementById("intnernalnav")) return false;
    // 找到存放两个div的ul
    // 找到ul id
    // 找到ul id后，获取里面的a数组
    var ul=document.getElementById("intnernalnav");
    var links=ul.getElementsByTagName("a");
    // 遍历ul中的a数组
    for(var i=0;i<links.length;i++){
        // 得到ul中a数组的href转化成纯id，用split函数 
        var divId=links[i].getAttribute("href").split("#")[1];
        // 判断ul中a.href是否存在，continue，不存在就跳出此次循环开始下一次
        if(!document.getElementById(divId)) continue;
        // 存在的a.href指向的div设置成none
        document.getElementById(divId).style.display="none";
        // 给links[i]设置一个属性destination存储divid
        links[i].destination=divId;
        // 鼠标点击shij
        links[i].onclick=function(){
            // this在事件中代表这个事件对象，这里就对应links[i]
            showP(this.destination);
            return false; //不懂这里为啥要写return false
        }
    }
}

addLoadEvent(findShowP);