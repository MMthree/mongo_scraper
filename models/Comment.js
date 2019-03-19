var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var CommentSchema = new Schema ({

    name: {
        type: String,
        required: true
    },

    text: {
        type: String,
        max: 280,
        required: true
    }

});

var Comment = mongoose.model("Comment", CommentSchema);

module.exports = Comment;