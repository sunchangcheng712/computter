const express=require("express")
const router=express.Router()
const pool=require("../pool")

router.get("/",(req,res)=>{
    var kwords=req.query.kwords;
    var arr=kwords.split(" ")
    for(var i=0;i<arr.length;i++){
        arr[i]=`title like '%${arr[i]}%'`
    }
    var where=" where "+arr.join(" and ")
    //console.log(where);
    var output={
        pageSize:9
    }
    output.pno=req.query.pno;
    var sql="SELECT *,( SELECT md from xz_laptop_pic WHERE laptop_id=lid LIMIT 1) as md FROM xz_laptop ";
    pool.query(sql+where,[],(err,result)=>{
        if(err) console.log(err)
        output.count=result.length;
        output.pageCount=Math.ceil(output.count/output.pageSize);
        output.products=result.slice(output.pno*9,output.pno*9+9)
        //console.log(output)//json 对象
        res.writeHead(200,{
            "Content-Type":"application/json;charset=utf-8",
            "Access-Control-Allow-Origin":"*"
          })
         res.write(JSON.stringify(output));//转换为字符串
         res.end();
    })
})


module.exports=router;