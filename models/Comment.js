var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var CommentSchema = new Schema ({

    name: {
        type: String,
        required: true
    },

    body: {
        type: String,
        max: 280
    }

});

var Comment = mongoose.model("Comment", CommentSchema);

module.exports = Comment;