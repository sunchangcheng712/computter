$(function(){
  if(location.search.indexOf("lid=")!=-1){
    var lid=location.search.split("=")[1];
    (async function(){
      var res=await $.ajax({
        url:"http://localhost:3000/details",
        type:"get",
        data:{lid},
        dataType:"json"
      })//ver res=open(res)
      //console.log(res);
      var {product,pics,specs}=res;
      //var {product,pics,specs}=res;
      var vm=new Vue({
        el:"#details",
        data:{
          lid,product,pics,specs
        }
      })

      var divPrev=document.getElementById("preview");
      var ul=divPrev.querySelector(
        "div>div.card-body>div>ul"
      );
      var html="";
      for(var pic of pics){
        var {sm,md,lg}=pic;
        html+=`<li class="float-left p-1">
          <img src="${sm}" data-md="${md}" data-lg="${lg}">
        </li>`
      }
      ul.innerHTML=html;
      ul.style.width=62*pics.length+"px";
      var mImg=divPrev.querySelector(
        "div>img.card-img-top"
      )
      mImg.src=pics[0].md;
      var lgDiv=document.getElementById("div-lg");
      lgDiv.style.backgroundImage=`url(${pics[0].lg})`;
      //鼠标进入每个小图片，切换中图片和大图片
     ul.onmouseover=function(e){
       if(e.target.nodeName==="IMG"){
          var img=e.target;
          var md=img.dataset.md;
          var lg=img.dataset.lg;
          mImg.src=md;
          lgDiv.style.backgroundImage=`url(${lg})`;
       }
     }

     //小图片的左右移动
     var $ul=$(ul);
     var $left=$("#preview>div>div.card-body>img:first")
     var $right=$left.nextAll().last()
     var moved=0;
     if(pics.length<=4)
        $right.addClass("disabled");
     $left.on("click",function(){
       var $left=$(this);
       if(!$left.is(".disabled")){
          moved--;
          $ul.css("marginLeft",-62*moved)
          $right.removeClass("disabled")
          if(moved==0)
              $left.addClass("disabled")
        }
     })
     $right.on("click",function(){
       var $right=$(this);
       if(!$right.is(".disabled")){
          moved++;
          $ul.css("marginLeft",-62*moved)
          $left.removeClass("disabled")
          if(pics.length-moved==4)
            $right.addClass("disabled");
      }
     })


     var $mImg=$(mImg),$lgDiv=$(lgDiv),$mask=$("#mask"),$smask=$("#super-mask");
     var MSIZE=176,
         MAX=352-MSIZE;
     $smask.hover(
       function(){
         $mask.toggleClass("d-none");
         $lgDiv.toggleClass("d-none");
       }
     )
     .mousemove(function(e){
       var left=e.offsetX-MSIZE/2;
       var top=e.offsetY-MSIZE/2;
       if(left<0)  left=0;
       else if(left>MAX) left=MAX;
       if(top<0) top=0;
       else if(top>MAX) top=MAX;
       $mask.css({left,top});
       $lgDiv.css("background-position",`-${16/7*left}px -${16/7*top}px`)
     })
    })()
  }
})