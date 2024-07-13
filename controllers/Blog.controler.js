const blog = require("../model/Blog.model");

exports.allblogList = async (req, res) => {
    try {
        const allBlog = await blog.find();
        return res.status(200).json({
            success: true,
            length: allBlog.length,
            allBlog,
            message: "Blogs fetched Successfully"
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong in fetching all Blogs"
        });
    }
};

exports.createBlog = async (req, res) => {
    try {
        const { title, description } = req.body;
        if (!title || !description) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

       

        // Create new blog post with user reference
        const newBlog = await blog.create({
            title,
            description,
            user: req.user.userID,
              // Ensure this is correctly set from req.user
        });

        return res.status(201).json({
            success: true,
            newBlog,
            message: "Blog Created Successfully"
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong in creating Blog"
        });
    }
};
