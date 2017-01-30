var express = require("express");
var router = express.Router();
var account = require("./models/account");

router.post("/authenticate",function(req,res){
  account.find({"username":req.body.username,"password":req.body.password},function(err,data){
    if(err)
      res.send(err);
    else
      res.json(data);
  });
});

module.exports = router;
