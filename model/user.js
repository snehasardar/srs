const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  query: {
    type: String,
    required: true,
  },
  response: {
    type: String,
    required: true,
  },
  
});
//id
//list

module.exports = mongoose.model("User", userSchema);
