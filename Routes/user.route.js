const express = require('express');
const router = express.Router();

const { signup,login,userDetails,userUpdate } = require("../controllers/user.controler")

router.post("/signup", signup);
router.post("/login", login);
router.get("/userdetails/:id", userDetails);
router.put("/userupdate/:id", userUpdate);

module.exports = router;
