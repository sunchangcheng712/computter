new Vue({
    el:"#container",
    data:{uname:"",upwd:""},
    methods:{
        signin(){
            (async ()=>{
               var res=await axios.post (
                   "http://localhost:3000/users/signin",
                   Qs.stringify({
                       uname:this.uname,upwd:this.upwd
                   })
               )
                res=res.data;
                if(res.ok==0)
                alert(res.msg);
                else{
                    alert("登录成功！即将返回来时的页面。。。")
                    if(location.search.startsWith("?back=")){
                        var url=location.search.slice(6)
                    }else{
                        var url="index.html" 
                    }
                location.href=url;
                }
            })()
        }
    }
})

$(":checkbox").on("click",function(){
    var $chb=$(this)
    $("input:not(:checkbox)")
    .prop("disabled",!$chb.prop("checked"))
})

var $txtName=$(":text"),$txtPwd=$(":password")
function vali($txt,minlen,maxlen,errmsg){
    var val=$txt.val();
    if(val.length>=minlen&&val.length<=maxlen){
        $txt.next().html("<img src='../img/ok.png'>")
    }else{
        $txt.next().html("<img src='../img/err.png'>"+errmsg)
    }
 }
 $txtName.on("blur",function(){
     vali($(this),3,9,"用户名必须介于3~9之间！")
 })
 $txtPwd.on("blur",function(){
     vali($(this),6,8,"密码必须介于6~8之间！")
 })



/*$(function(){
    $("input.login").click(function(){
        var uname=$("input.uname").val();
        var upwd=$("input.upwd").val();
        (async function(){
            var res=await $.ajax({
                url:"http://localhost:3000/users/signin",
                type:"post",
                data:{uname,upwd},      
                dataType:"json"
            })
            if(res.ok==0)
             alert(res.msg);
            else{
                alert("登录成功！即将返回来时的页面。。。")
                if(location.search.startsWith("?back=")){
                    var url=location.search.slice(6)
                }else{
                    var url="index.html" 
                }
               location.href=url;
            }
        })()
    })
    $(":checkbox").on("click",function(){
        var $chb=$(this)
        $("input:not(:checkbox)")
        .prop("disabled",!$chb.prop("checked"))
    })

    var $txtName=$(":text"),$txtPwd=$(":password")
    function vali($txt,minlen,maxlen,errmsg){
        var val=$txt.val();
        if(val.length>=minlen&&val.length<=maxlen){
            $txt.next().html("<img src='../img/ok.png'>")
        }else{
            $txt.next().html("<img src='../img/err.png'>"+errmsg)
        }
     }
     $txtName.on("blur",function(){
         vali($(this),3,9,"用户名必须介于3~9之间！")
     })
     $txtPwd.on("blur",function(){
         vali($(this),6,8,"密码必须介于6~8之间！")
     })
})*/