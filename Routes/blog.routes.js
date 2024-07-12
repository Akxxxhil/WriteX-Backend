const express = require('express')
const router=express.Router()

const {allblogList}=require("../controllers/Blog.controler")
const {createBlog}=require("../controllers/Blog.controler")

router.get("/allblog",allblogList)
router.post("/createblog",createBlog)

module.exports=router
