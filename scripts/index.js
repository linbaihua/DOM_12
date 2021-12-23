
/* 函数作用：传入元素id，元素的最终位置，移动间隔时间，是图片可以动起来 */
// parseInt函数：将非int变量转变为int类型
// clearTimeout函数：停止setTimeout函数
// setTimeout函数：设置一定时间后发生
// 变量和实参不一样，有时候不一样加“”，elementId不用加“”
// math函数，math.ceil将非整数转化为偏大的整数
function moveFunc(elementId,final_x,final_y,internal){
    // 平稳退化
    if(!document.getElementById) return false;
    if(!document.getElementsByTagName) return false;
    // 判断图片是否存在
    if(!document.getElementById(elementId)) return false;
    // 获取图片id
    var elem=document.getElementById(elementId);
    // 防止动画停滞，及时clear
    if(elem.movement){
        clearTimeout(elem.movement);
    }
    // 检查图片的初始位置，没有就设置初始值
    if (!elem.style.left) {
        elem.style.left="0px";
    }
    if (!elem.style.top) {
        elem.style.top="0px";
    }
    // 获取图片位置的数值类型parseInt
    var xleft=parseInt(elem.style.left);
    var ytop=parseInt(elem.style.top);
    // 判断图片是否移动到指定位置
    var dist=0;
    if (xleft==final_x && ytop==final_y) {
        return true;
    }
    if (xleft<final_x) {
        dist=Math.ceil((final_x-xleft)/10);
        xleft+=dist;
    }
    if (xleft>final_x) {
        dist=Math.ceil((xleft-final_x));
        xleft-=dist;
    }
    if (ytop<final_y) {
        dist=Math.ceil((final_y-ytop)/10);
        ytop+=dist;
    }
    if (ytop>final_y) {
        dist=Math.ceil((ytop-final_y)/10);
        ytop-=dist;
    }
    // 更新每次图片移动后的位置
    elem.style.left=xleft+"px";
    elem.style.top=ytop+"px";
    // setTimeout函数递归此函数
    var repeat="moveFunc('"+elementId+"',"+final_x+","+final_y+","+internal+")";
    elem.movement=setTimeout(repeat,internal);
}
// repeat为什么要这样写？
// elem.movement为什么可以直接这样写？

// 在主页创建幻灯片放在某个节点后面
function prepareSlideShow(){
    // 平稳退化
    if(!document.getElementById) return false;
    if(!document.getElementsByTagName) return false;
    // 获取已知节点x，将幻灯片插在x节点后
    var intro=document.getElementById("intro");
    // 创建节点div，img，将img放在div中存放幻灯片
    var slideShow=document.createElement("div");
    var preview=document.createElement("img");
    slideShow.setAttribute("id","slideShow");
    preview.setAttribute("id","preview");
    preview.setAttribute("src","../images/layout/slideshow.gif");

    var frame=document.createElement("img");
    frame.setAttribute("id","frame");
    frame.setAttribute("src","../images/layout/frame.gif");
    slideShow.appendChild(frame);

    slideShow.appendChild(preview);
    // 幻灯片节点插在已知节点后
    insertAfter(slideShow,intro);
    // 获取a节点数组，遍历a节点数组
    var links=intro.getElementsByTagName("a");
    for(var i=0;i<links.length;i++){
        links[i].onmouseover=function(){
            // 给每个鼠标事件添加一个a.href
            // 事件处理函数中this指向触发事件的元素
             var destination=this.getAttribute("href");
             // 判断这个鼠标对应哪个a.href,附加相应的照片
            if (destination.indexOf("index.html" != -1)) {
                moveFunc("preview",0,0,5);
            }
            if (destination.indexOf("about.html") != -1) {
                moveFunc("preview",-150,0,5);
            }
            if (destination.indexOf("photos.html") != -1) {
                moveFunc("preview",-300,0,5);
            }
            if (destination.indexOf("live.html") != -1) {
                moveFunc("preview",-450,0,5);
            }
            if (destination.indexOf("contact.html") != -1) {
                moveFunc("preview",-600,0,5);
            }
        }
    }
}
// indexof函数？

addLoadEvent(prepareSlideShow);