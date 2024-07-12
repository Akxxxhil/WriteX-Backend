const blog = require("../model/Blog.model");

exports.allblogList = async (req, res) => {
    try {
        const allBlog = await blog.find();
        return res.status(200).json({
            success: true,
            length: allBlog.length,
            allBlog,
            message: "Blog fetched Successfully"
        });
    } catch (error) {
        console.log(error);
        return res.status(401).json({
            success: false,
            message: "Something went wrong in fetching all Blog"
        });
    }
};

exports.createBlog = async (req, res) => {
    try {
        const { title, description } = req.body;
        if (!title || !description) {
            return res.status(401).json({
                success: false,
                message: "All fields are Required"
            });
        }

        const newBlog = await blog.create({ title, description });
        return res.status(200).json({
            success: true,
            newBlog,
            message: "Blog Created Successfully"
        });
    } catch (error) {
        console.log(error);
        return res.status(401).json({
            success: false,
            message: "Something went wrong in creating Blog"
        });
    }
};
