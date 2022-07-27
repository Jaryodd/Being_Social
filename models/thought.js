const { Schema, model } = require("mongoose");
const reactionSchema = require("./reaction");

const schemaThought = new Schema(
    {
        text: {
            type: String,
            required: true,
            minLength: 1,
            maxLength: 280,
        },
        postedBy: {
            type: String,
            required: true,
        },
        upvotes: {
            type: Number,
        },
        downvotes: {
            type: Number,
        },
        reactions: [reactionSchema],
    },
    { timestamps: true }
);

const Thought = model("Thought", schemaThought);

module.exports = Thought;
