var express = require('express');
var router = express.Router();
var upload = require("./multer");
var pool = require("./pool");


router.post('/fetchallproductsbygender', function(req, res, next) {
  q="select p.*, (select categoryname from categories where categoryid = p.categoryid )as categoryname,(select framename from frametypes where frameid =p.frameid )as frametypename,(select materialname from material where materialid=p.materialid)as materialname,(select shapename from shapes where shapeid = p.shapeid)as shapename from product  as p where p.categoryid=? and p.type=?"
  console.log(req.body)
   pool.query(q,[req.body.categoryid,req.body.gender],function(error,result){
       if(error)
       {
         res.status(500).json([])
       }
       else
       {
         res.status(200).json({data:result})
       }
     })
 });
 
 
 
 
router.get('/fetchallproducts', function(req, res, next) {
 q="select p.*, (select categoryname from categories where categoryid = p.categoryid )as categoryname,(select framename from frametypes where frameid =p.frameid )as frametypename,(select materialname from material where materialid=p.materialid)as materialname,(select shapename from shapes where shapeid = p.shapeid)as shapename from product  as p"
 
  pool.query(q,function(error,result){
      if(error)
      {
        res.status(500).json([])
      }
      else
      {
        res.status(200).json({data:result})
      }
    })
});






router.get('/fetchallshapes', function(req, res, next) {
 
    pool.query("select * from shapes",function(error,result){
        if(error)
        {
          res.status(500).json([])
        }
        else
        {
          res.status(200).json({data:result})
        }
      })
  });

  router.get('/fetchallmaterials', function(req, res, next) {
 
    pool.query("select * from material",function(error,result){
        if(error)
        {
          res.status(500).json([])
        }
        else
        {
          res.status(200).json({data:result})
        }
      })
  });

  router.get('/fetchallframes', function(req, res, next) {
 
    pool.query("select * from frametypes",function(error,result){
        if(error)
        {
          res.status(500).json([])
        }
        else
        {
          res.status(200).json({data:result})
        }
      })
  });

  router.get('/fetchallcategories', function(req, res, next) {
 
    pool.query("select * from categories",function(error,result){
        if(error)
        {
          res.status(500).json([])
        }
        else
        {
          res.status(200).json({data:result})
        }
      })
  });

  router.post('/insertproduct',upload.single("picture"), function(req, res, next) {
    //console.log("BODY:", req.body);
    //console.log("FILE", req.file);
    pool.query("insert into product (productname,categoryid,type,frameid,materialid,shapeid,description, picture,status,adstatus) values(?,?,?,?,?,?,?,?,?,?) ",[req.body.productname,req.body.categoryid,req.body.type,req.body.frameid,req.body.materialid,req.body.shapeid,req.body.description,req.body.myfilename,req.body.status,req.body.adstatus],function(error,result){
        if(error)
        {
          res.status(500).json(false)
        }
        else
        {
          res.status(200).json(true)
        }
      })
  });

  router.post('/updateproductdata', function(req, res, next) {
   // console.log("BODY:", req.body);
    pool.query("update product set productname=?,categoryid=?,type=?,frameid=?,materialid=?,shapeid=?,status=?,adstatus=?,description=? where productid=?",[req.body.productname,req.body.categoryid,req.body.type,req.body.frameid,req.body.materialid,req.body.shapeid,req.body.status,req.body.adstatus,req.body.description,req.body.productid],function(error,result){
        if(error)
        { console.log(error)
          res.status(500).json(false)
        }
        else
        {
          res.status(200).json(true)
        }
      })
  });


  router.post('/editpicture',upload.single("picture"), function(req, res, next) {
    pool.query("update product set picture=? where productid=?",[req.body.myfilename,req.body.productid],function(error,result){
        if(error)
        {  console.log(error);
          res.status(500).json(false)
        }
        else
        {
          res.status(200).json(true)
        }
      })
  });

  router.post('/deleteproduct', function(req, res, next) {
    pool.query("delete from product where productid=?",[req.body.productid],function(error,result){
        if(error)
        {
          res.status(500).json(false)
        }
        else
        {
          res.status(200).json(true)
        }
      })
  });


  module.exports = router;