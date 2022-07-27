const { query } = require("express");

const mongoose = require("mongoose"),
    Schema = mongoose.Schema,
    model = mongoose.model,
    bcrypt = require("bcrypt"),
    FACTOR = 10;

const validateEmail = function (email) {
    const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email);
};

const schemaUser = new Schema(
    {
        userName: {
            type: String,
            unique: true,
            trim: true,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            validate: [validateEmail, "Validate email address."],
        },
        password: {
            type: String,
            required: true,
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: "Thought",
            },
        ],
        following: [
            {
                type: Schema.Types.ObjectId,
                ref: "User",
            },
        ],
        followedBy: [
            {
                type: Schema.Types.ObjectId,
                ref: "User",
            },
        ],
    },
    {
        timestamps: true,
        toJSON: {
            virtuals: true,
        },
    }
);

userSchema.virtual("numfollwing").get(function () {
    return this.followedBy.length;
});
userSchema.virtual("numfollow").get(function () {
    return this.following.length;
});

userSchema.pre("save", function (next) {
    var user = this;

    
    if (!user.isModified("password")) return next();

    
    bcrypt.genSalt(FACTOR, function (err, salt) {
        if (err) return next(err);

        
        bcrypt.hash(user.password, salt, function (err, hash) {
            if (err) return next(err);
            
            user.password = hash;
            next();
        });
    });
});

userSchema.pre("findOneAndUpdate", function (next) {
    const password = this.getUpdate().$set.password;
    if (!password) {
        return next();
    }
    try {
        const salt = bcrypt.genSaltSync();
        const hash = bcrypt.hashSync(password, salt);
        this.getUpdate().$set.password = hash;
        next();
    } catch (error) {
        return next(error);
    }
});

userSchema.methods.comparePassword = function (candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

const User = model("user", schemaUser);

module.exports = User;
