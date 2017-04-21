var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var HistorySchema = new Schema({
	name: {
    type: String
  },
	email: {
    type: String,
    unique: true,
    match: [/.+\@.+\..+/, "Please enter a valid e-mail address"]
  },
  location1: {
    type: String
  },
  location2: {
    type: String
  },
  date: {
    type: Date
  },
  distancebetween: {
    type: String
  },
});

var History = mongoose.model("History", HistorySchema);
module.exports = History;
