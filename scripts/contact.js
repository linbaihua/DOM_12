
// 函数作用：找到每个label对应的input给其添加focus方法
function focusLabels(){
    if(!document.getElementsByTagName) return false;
    // 遍历label
    var labels=document.getElementsByTagName("label");
    for(var i=0;i<labels.length;i++){
        if(!labels[i].getAttribute("for")) continue;
        // 具体是给input元素添加focus方法
        // label.for=input.id,label设置表单，input用于输入
        labels[i].onclick=function(){
            var id=this.getAttribute("for");
            if(!document.getElementById(id)) return false;
            var element=document.getElementById(id);
            element.focus();
        }
    }
}

// whichform=一个form对象
function resetFiles(whichform){
    for(var i=0;i<whichform.elements.length;i++){
        var element=whichform.elements[i];
        if(element.type == "submit") continue;
        if(!element.defaultValue) continue;
        // 未点击文本框时，value=defaultvalue
        // 需要输入时将value值清空
        // defaultvalue就是input.value
        element.onfocus=function(){
            if(this.value == this.defaultValue){
                this.value = "";
            }
        }
        // 如果鼠标未输入文本就离开，则显示默认值
        element.onblur = function(){
            if(this.value == ""){
                this.value = this.defaultValue;
            }
        }
    }
}

function isFilled(element){
    if (element.value.length<1 || element.value == element.defaultValue) {
        return false;
    }else{
        return true;
    }
}

function isEmail(element){
    if (element.value.indexOf("@") == -1 || element.value.indexOf(".") == -1) {
        return false;
    }else{
        return true;
    }
}

function validateForm(whichform){
    for(var i=0;i<whichform.elements.length; i++){
        var element=whichform.elements[i];
        if (element.className.indexOf("required") != -1) {
            if (!isFilled(element)) {
                alert("please fill in the"+element.name+" field.");
                return false;
            }
        }
        if (element.className.indexOf("email") != -1) {
            if (!isEmail(element)) {
                alert("the "+element.name+" field must be a valid address.");
                return false;
            }
        }
    }
    return false;
}

function prepareForms(){
    for(var i=0; i<document.forms.length; i++){
        var thisform = document.forms[i];
        resetFiles(thisform);
        thisform.onsubmit = function(){
            return validateForm(this);
        }
    }
}

// 创建请求对象
function getHTTPObject(){
    if (typeof XMLHttpRequest == "undefined") {
        XMLHttpRequest = function(){
            try{return new ActiveXObject("Msxml2.XMLHTTP.6.0");}
            catch (e){}
            try{return new ActiveXObject("Msxml2.XMLHTTP.3.0");}
            catch (e) {}
            try{return new ActiveXObject("Msxml2.XMLHTTP");}
            catch (e) {}
            return false;
        }
    }
    return new XMLHttpRequest();
}

// 显示Ajax图片
function displayAjaxLoading(element){
    while(element.hasChildNodes()){
        element.removeChild(element.lastChild);
    }
    var content=document.createElement("img");
    content.setAttribute("src","../images/layout/loading.jpg");
    element.appendChild(content);
}

// Ajax，接收数据
// 没写完，看不懂现在
function submitFormWithAjax(whichform,thetarget){
    var request=getHTTPObject();
    if(!request) return false;
    displayAjaxLoading(thetarget);
    var dateParts = [];
    var element;
    for(var i=0; i<whichform.elements.length; i++){
        element=whichform.elements[i];
        dateParts[i] = element.name+ "=" +encodeURIComponent(element.value);
    }
    var date = dateParts.join('&');
    request.open('post',whichform.getAttribute("action"),true);
    request.setRequestHeader("Content-type","application/x-www-form-urlencode");

}

addLoadEvent(focusLabels);
addLoadEvent(prepareForms);