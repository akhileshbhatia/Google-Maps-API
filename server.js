var express = require("express");
var app = express();
var path = require("path");

app.use(express.static("static_files"));

app.get("/",function(req,res){
  res.sendFile(path.join(__dirname + "/views"+"/map.html"));
});

app.listen(3000,function(){
  console.log("Server started at port 3000");
});
