
/* function test(){
    document.body.setAttribute("id","bodyid");   
    var href=window.location.href;
    var href1=document.getElementById("navigation");
    var links=href1.getElementsByTagName("a");
    alert(links[0].href);
    alert(href);
}
addLoadEvent(test); */

function test(){
    var gallery=document.getElementById("imagegallery");
    var links=gallery.getElementsByTagName("a");
    for(var i=0;i<links.length;i++){
        links[i].onclick=function(){
            alert(this.title);
        }
    }
}
addLoadEvent(test);