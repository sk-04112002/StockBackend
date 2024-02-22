const express = require("express");
const router = express.Router();
const UserModel = require("../models/UserModel.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const uuid = require("shortid");
const nodemailer = require("nodemailer");

const generateToken = (id) => {
  return jwt.sign({id}, "SaravanaKumarS", {expiresIn:"1hr"})
}

router.post("/login", (req, res) => {
  const { email, password } = req.body;
  if(!email || !password){
    res.json("Please fill all required fields")
  }
  UserModel.findOne({ email: email })
    .then((user) => {
      if (user) {
        bcrypt.compare(password, user.password, (err, response) => {
          if (response) {
            const token = generateToken({email: user.email});
            res.cookie("token",token);
            res.json("Login Successfull !");
          } else {
            res.json("Incorrect Password");
          }
        });
      } else {
        res.json("User Not Found");
      }
    })
    .catch((err) => res.json(err));
});


router.post("/register", async (req, res) => {
  const { name, email, password, role } = req.body;
  if(!name || !email || !password){
    res.json("Please fill all required fields")
  }
  const salt = await bcrypt.genSalt();
  const hash = await bcrypt.hash(password, salt);
  const adminId = uuid.generate();
  UserModel.create({ name, email, password: hash, role, adminid: adminId })
    .then((user) => {
     

      var transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "coolstevensaravana10@gmail.com",
          pass: "wkbp segw mwkc znzo",
        },
      });

      var mailOptions = {
        from: "coolstevensaravana10@gmail.com",
        to: user.email,
        subject: "Account Creation Successfully",
        text: `Hello ${user.name} your account created successfully here is your admin id : ${user.adminid}`,
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
        }
      });
      res.json(user)
    })
    .catch((err) => res.json(err));
});

router.get("/getuser/:UserId", async (req,res) => {
  const UserId = req.params.UserId;
  const user = await UserModel.findOne({email: UserId});
  const name = user.name;
  res.json({name: name});
})
router.post("/logout", async (req,res) => {
  res.cookie("token", "");
  res.json("Successfully Logged Out");
})

router.post("/createuser/:UserId", async (req,res) => {
  const { name, email, password, role } = req.body;
  const UserId = req.params.UserId;
  const admin = await UserModel.findOne({email: UserId});
  if (!name || !email || !password) {
    res.json("Please fill all required fields");
  }
  const salt = await bcrypt.genSalt();
  const hash = await bcrypt.hash(password, salt);
  const adminId = admin.adminid;
  UserModel.create({ name, email, password: hash, role, adminid: adminId })
    .then((user) => {
      var transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "coolstevensaravana10@gmail.com",
          pass: "wkbp segw mwkc znzo",
        },
      });

      var mailOptions = {
        from: "coolstevensaravana10@gmail.com",
        to: user.email,
        subject: "Account Created Successfully",
        text: `Hello ${user.name} your account created successfully here is your id : ${user.adminid}`,
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
        }
      });
      res.json(user);
    })
    .catch((err) => res.json(err));

})
router.get("/findrole/:UserId", async (req,res) => {
    const UserId = req.params.UserId;
    const User = await UserModel.findOne({email: UserId});
    const role = User.role
    res.json({role: role});
  
  
})

router.get("/getuserdetails/:UserId", async(req,res) => {
  const UserId = req.params.UserId;
  const User = await UserModel.findOne({email: UserId});
  const adminid = User.adminid;
  const UserData = await UserModel.find({adminid: adminid});
  res.json(UserData);
})
router.delete("/deleteuser/:id", async(req,res) => {
  const id = req.params.id;
  const deleteUser = await UserModel.findByIdAndDelete({_id: id});
  res.json(deleteUser);
})
module.exports = router;
