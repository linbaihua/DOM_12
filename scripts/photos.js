
// 函数作用：用于onclick事件
// 参数whicpic=links[i]=ul.a
function showImg(whicpic){
    // 判断占位符图片在不在
    if(!document.getElementById("placeholder")) return false;
    // a.href
    var source=whicpic.getAttribute("href");
    // 占位符图片
    var placeholder=document.getElementById("placeholder");
    // 替换占位符图片
    placeholder.setAttribute("src",source);
    // description是文本节点
    if(!document.getElementById("description")) return false;
    // a.title
    if(whicpic.getAttribute("title")){
        var text=whicpic.getAttribute("title");
    }else{
        var text=" ";
    }
    // 文本节点description
    var description=document.getElementById("description");
    // nodetype: 1是元素节点 3是文本节点
    if(description.firstChild.nodeType == 3){
        description.firstChild.nodeValue=text;
    }
    return false;
}

// 函数作用：给photos.html添加结构
// 在id=imagegallery的ul后面加上一个文本说明节点
// 紧跟文本说明节点后面放一个占位符图片用于替换图片
function preparePlaceholder(){
    if(!document.createElement) return false;
    if(!document.createTextNode) return false;
    if(!document.getElementById) return false;
    if(!document.getElementById("imagegallery")) return false;
    // 创建占位符图片，id是placeholder
    var placeholder=document.createElement("img");
    // 设置占位符图片的一些属性值
    placeholder.setAttribute("id","placeholder");
    placeholder.setAttribute("src","../images/layout/placeholder.gif");
    placeholder.setAttribute("alt","my image gallery");
    // 创建节点p
    var description=document.createElement("p");
    description.setAttribute("id","description");
    // 创建文本节点放到p中
    var desctext=document.createTextNode("choose an image");
    description.appendChild(desctext);
    // 获取id是imagegallery的ul节点
    var gallery=document.getElementById("imagegallery");

    insertAfter(description,gallery);
    insertAfter(placeholder,description);
}

function prepareGallery(){
    // 平稳退化
    if(!document.getElementById) return false;
    if(!document.getElementsByTagName) return false;
    if(!document.getElementById("imagegallery")) return false;
    // id=imagegallery的ul节点
    var gallery=document.getElementById("imagegallery");
    // id=imagegallery的ul节点中的所有a链接
    var links=gallery.getElementsByTagName("a");
    // 遍历所有a链接
    for(var i=0;i<links.length;i++){
        // 给每个a链接绑定onclick事件
        // this=links[i]
        links[i].onclick=function(){
            return showImg(this);
        }
    }
}

addLoadEvent(preparePlaceholder);
addLoadEvent(prepareGallery);