const express = require('express')
const router=express.Router()

const {allblogList}=require("../controllers/Blog.controler")
const {createBlog}=require("../controllers/Blog.controler")

const {auth}=require("../Middleware/auth")

router.get("/allblog",allblogList)
router.post("/createblog",auth,createBlog)

module.exports=router
