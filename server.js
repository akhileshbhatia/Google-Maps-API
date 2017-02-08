var express = require("express");
var app = express();
var path = require("path");

app.use(express.static("static_files"));

app.get("/map",function(req,res){
  res.sendFile(path.join(__dirname + "/views"+"/map.html"));
});

app.get("/",function(req,res){
  res.sendFile(path.join(__dirname + "/views"+"/login.html"));
});

app.listen(3000,function(){
  console.log("Server started at port 3000");
});

var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/mapsDb");

var bodyParser = require("body-parser");
app.use(bodyParser.json());

var router = require("./routes");
app.use('/api',router);
