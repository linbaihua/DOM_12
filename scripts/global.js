
// window.onload函数
function addLoadEvent(func){
    var oldonload=window.onload;
    if(typeof window.onload!='function'){
        window.onload=func;
    }else{
        window.onload=function(){
            oldonload();
            func();
        }
    }
}

// 在一个节点后面插入节点
function insertAfter(newElement,targetElement){
    var parent=targetElement.parentNode;
    if(parent.lastChild==targetElement){
        parent.appendChild(newElement);
    }else{
        parent.insertBefore(newElement,targetElement.nextSibling);
    }
}

// 给节点增加 class
function addClass(element,value){
    if(!element.classname){
        element.classname=value;
    }else{
        newClassName=element.classname;
        newClassName+=" ";
        newClassName+=value;
        element.classname=newClassName;
    }
}

// 当前页面突出显示
// 给当前页面body 添加id
function highLightPage(){
    // 平稳退化
    if(!document.getElementById) return false;
    if(!document.getElementsByTagName) return false;
    // 元素是否存在
    if(!document.getElementById("navigation")) return false;
    // 获取id是navigation得元素
    var nav=document.getElementById("navigation");
    // 获取上面元素下的a数组
    var links=nav.getElementsByTagName("a");
    // 遍历数组
    for(var i=0;i<links.length;i++){
        // 获得a.href
        var linkurl=links[i].getAttribute("href");
        // 当前页面得href
        var currenturl=window.location.href;
        // 匹配当前页面href
        if(currenturl.indexOf(linkurl) != -1){
            links[i].classname="here";
            // 给当前页面得body设置id
            // lastChild是文本节点
            var linktext=links[i].lastChild.nodeValue.toLowerCase();
            document.body.setAttribute("id",linktext);
        }
    }
}

addLoadEvent(highLightPage);

