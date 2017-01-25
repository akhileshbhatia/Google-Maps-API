var mongoose = require("mongoose");
var schema = mongoose.Schema;
var accountSchema = new schema({username:String,password:String});
module.exports = mongoose.model("account",accountSchema,"account");
