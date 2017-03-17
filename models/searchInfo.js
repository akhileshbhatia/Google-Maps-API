var mongoose = require("mongoose");
var schema = mongoose.Schema;
var searchSchema = new schema({
  "user_id" : String,
  "details" : [
    {
      "date" : Date,
      "search_info_list" : [
        {
          "source" : String,
          "destination" : String
        }
      ]
    }
  ]
});
module.exports = mongoose.model("searchInfo",searchSchema,"searchInfo");
