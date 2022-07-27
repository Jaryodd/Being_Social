const { Schema, Types, model } = require('mongoose');

const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
        reactionBodyName: {
            type: String,
            required: true,
            maxlength: 50,
            minlength: 4,
            default: 'Unnamed reaction',
        },
        username: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
    },

    {
        toJSON: {
            getters: true,
        },
        id: false
    }
);

module.exports = reactionSchema