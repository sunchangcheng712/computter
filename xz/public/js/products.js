$(function(){
    if(location.search.indexOf("kwords=")!=-1){
      var kwords=decodeURI(
        location.search.split("=")[1]);
      var pno=0;
      function loadPage(no=0){//no:新页号
          pno=no;
          $.ajax({
            url:"http://localhost:3000/products",
            type:"get",
            data:{kwords,pno},
            dataType:"json",
            success:function(output){
              var { products,pageCount }=output;
              var html="";
              for(var p of products){
                var {lid,title,price,md}=p;
                html+=`<div class="col-md-4 p-1">
                  <div class="card mb-4 box-shadow pr-2 pl-2">
                    <a href="product_details.html?lid=${lid}" title="${title}">
                      <img class="card-img-top" src="${md}">
                    </a>
                    <div class="card-body p-0">
                      <h5 class="text-primary">¥${price.toFixed(2)}</h5>
                      <p class="card-text">
                        <a href="product_details.html?lid=${lid}" class="text-muted small">${title}</a>
                      </p>
                      <div class="d-flex justify-content-between align-items-center p-2 pt-0">
                        <button class="btn btn-outline-secondary p-0 border-0" type="button">-</button>
                        <input type="text" class="form-control p-1" value="1">
                        <button class="btn btn-outline-secondary p-0 border-0" type="button">+</button>
                        <a class="btn btn-primary float-right ml-1 pl-1 pr-1" href="#" data-lid="${lid}">加入购物车</a>
                      </div>
                    </div>
                  </div>
                </div>`;
              }
              var $plist=$("#plist")
              $plist.html(html);
    
    
              var html="";
              for(var i=1;i<=pageCount;i++){
                  html+=`<li class="page-item ${i==pno+1?'active':''}"><a class="page-link bg-transparent" href="#">${i}</a></li>`
              }
              var $ul=$plist.next().find("nav>ul")
              $ul.children(":not(:first-child):not(:last-child)").remove()
              $ul.children().first().after(html)
              if(pno==0){
                $ul.children().first().addClass("disabled")
              }else{
                $ul.children().first().removeClass("disabled") 
              }
              if(pno==pageCount-1){
                $ul.children().last().addClass("disabled") 
              }else{
                $ul.children().last().removeClass("disabled")  
              }
            }
          })
      }
      loadPage();
      var $plist=$("#plist");
      var $ul=$plist.next().find("nav>ul")
      //只在页面首次加载时，在分页按钮的父元素上绑定一次
      $ul.on("click","a",function(e){
          e.preventDefault();
          var $a=$(this);
          if(!$a.parent().is(".disabled,.active")){
              if($a.parent().is(":first-child"))
                 var no=pno-1;
              else if($a.parent().is(":last-child"))
                 var no=pno+1;
              else
                 var no=$a.html()-1;
              loadPage(no);
          }
      });
      //
      $plist.on("click","button,a.btn",function(e){
          e.preventDefault();
          var $btn=$(this);
          if($btn.is("button")){
              var $input=$btn.siblings("input")
              var n=parseInt($input.val())
              if($btn.html()=="+")
                n++;
              else if(n>1)
                n--;
              $input.val(n);
          }else{
            (async function(){
                 var res=await $.ajax({
                     url:"http://localhost:3000/users/islogin",
                     type:"get",
                     dataType:"json"
                 });
                if(res.ok==1){
                    var lid=$btn.attr("data-lid");
                    var count=$btn.siblings("input").val();
                   await $.ajax({
                      url:"http://localhost:3000/cart/add",
                      type:"get",
                      data:{lid,count}
                    })
                   $btn.siblings("input").val(1);
                   alert("添加成功") 
                }else{
                  alert("请先登录！")
                }
          })()
         }
      });
      async function loadCart(){
          var res=await $.ajax({
              url:"http://localhost:3000/users/islogin",
              type:"get",
              dataType:"json"
            });
            if(res.ok==0)
              alert("暂未登录，无法加载购物车");
            else{
              var res=await $.ajax({
                url:"http://localhost:3000/cart/items",
                type:"get",
                dataType:"json"
             })
             var html="",total=0;
             for(var item of res){
               var {iid,title,count,price}=item;
               total+=price*count;
                html+=`<li class="p-0 list-group-item d-flex justify-content-between lh-condensed">
                <div class="input-group input-group-sm mt-1 mb-1">
                <div class="input-group-prepend">
                  <span class="input-group-text text-truncate bg-white p-1 border-0 d-inline-block" title="${title}">${title}</span>
                  <button class="btn btn-outline-secondary p-0 border-0" type="button" data-iid="${iid}">-</button>
                </div>
                <input type="text" class="form-control p-1" aria-label="Small" value="${count}" aria-describedby="inputGroup-sizing-sm">
                <div class="input-group-append">
                  <button class="btn btn-outline-secondary p-0 border-0" type="button" data-iid="${iid}">+</button>
                  <span class="input-group-text bg-white border-0 p-0 pl-1">￥${(price*count).toFixed(2)}</span>
                </div>
                </div>
                </li>`;
              }
              $ulCart.children(":gt(0):not(:last)").remove();
              $ulCart.find("li:last-child>h4")
                     .html(`￥${total.toFixed(2)}`)
                     .parent()
                     .prev()
                     .after(html);
           }
      }
      loadCart()
      var $ulCart=$("#cart");
      $ulCart.on("click","button",function(){
        var $btn=$(this);
        (async function(){
          var iid=$btn.attr("data-iid");
          var count=$btn.parent().siblings("input").val()
          if($btn.html()=="+")
             count++;
          else
             count--;
          if(count==0)
             if(!confirm("是否删除该商品？"))
                return;
          await $.ajax({
            url:"http://localhost:3000/cart/update",
            type:"get",
            data:{iid,count}
          })
          loadCart()
        })()
      })
    }
})
