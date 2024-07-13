const mongoose = require("mongoose");

const BlogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",  // This references the User model
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model("Blog", BlogSchema);
