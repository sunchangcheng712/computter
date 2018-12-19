new Vue({
    el:"#main>div:nth-child(2)>h3:first-child",
    data:{ 
        res:[
          {price:0},
          {price:0},
          {price:0}
        ]
     },
     mounted(){
         //this->vm
         axios.get("http://localhost:3000/index/getIndexProducts").then(res=>this.res=res.data)
     }
})
$("div.carousel-item>img").on("click",function(){
    var $img=$(this);
    var i=parseInt($img.attr("alt"))
    i++;
    if(i>4) i=1;
    $img.attr({
        "src":`img/index/banner${i}.png`,
        "alt":`${i}th slide`
    })
})


/*$(function(){
    $.ajax({
        url:"http://localhost:3000/index/getIndexProducts",
        type:"get",
        dataType:"json",
        success: function(res){
           new Vue({
               el:"#main>div:nth-child(2)>h3:first-child",
               data:{ res }
           })
       }
    })

    $("div.carousel-item>img").on("click",function(){
        var $img=$(this);
        var i=parseInt($img.attr("alt"))
        i++;
        if(i>4) i=1;
        $img.attr({
            "src":`img/index/banner${i}.png`,
            "alt":`${i}th slide`
        })
    })
})*/
