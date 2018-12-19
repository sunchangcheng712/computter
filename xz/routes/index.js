const express=require("express")
const router=express.Router()
const pool=require("../pool")

router.get("/getIndexProducts",(req,res)=>{
    var sql="SELECT * FROM xz_index_product WHERE seq_recommended!=0 order by seq_recommended";
    pool.query(sql,[],(err,result)=>{
        if(err) console.log(err);
        //res.send(result);
        res.writeHead(200,{
            "Content-Type":"application/json;charset=utf-8",
            "Access-Control-Allow-Origin":"*"
        })
        res.write(JSON.stringify(result));
        res.end();
    })
})


router.get("/image",(req,res)=>{
    var imagelist=[
        {id:1,img_url:"http://127.0.0.1:3000/img/banner1.png"},
        {id:2,img_url:"http://127.0.0.1:3000/img/banner2.png"},
        {id:3,img_url:"http://127.0.0.1:3000/img/banner3.png"},
        {id:4,img_url:"http://127.0.0.1:3000/img/banner4.png"}    
        ]; 
        res.writeHead(200,{
            "Content-Type":"application/json;charset=utf-8",
            "Access-Control-Allow-Origin":"*"
        });  
        res.write(JSON.stringify(imagelist));
        res.end();   
})

module.exports=router;