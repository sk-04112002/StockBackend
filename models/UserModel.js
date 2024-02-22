const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please fill name field"],
  },
  email: {
    type: String,
    required: [true, "Please fill name field"],
    unique: true,
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please enter a valid emaial",
    ],
  },
  password: {
    type: String,
    required: [true, "Please fill password field"],
    minLength: [8, "Password length must be upto 8 characters"]
  },
  role: {
    type: String,
  },
  adminid: {
    type: String,
  }
},
{
    timestamps: true,
}
);

const UserModel = mongoose.model("users",UserSchema)
module.exports = UserModel