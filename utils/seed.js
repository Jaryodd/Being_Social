const connection = require("../config/connection");
const { User, Thought } = require("../models");

connection.on("error", (err) => err);
connection.once("open", async () => {
    console.log("connected");
    await User.deleteMany({});
    await Thought.deleteMany({});
    console.log("Updated Database.");

    await Thought.create(
        {
            text: "I Didn't you expect that.",
            postedBy: "Martin",
            upvotes: 5,
            downvotes: 2,
            reactions: [
                {
                    reactionText: "What didn't you expect?",
                    userName: "Gina",
                },
            ],
        },
        {
            text: "Has anyone seen any new movies lately?",
            postedBy: "Gina",
            upvotes: 168,
            downvotes: 33,
            reactions: [
                {
                    reactionText: "I was thinking of going to see that new movie with KeKe Palmer.",
                    userName: "Martin",
                },
            ],
        }, //1 -
        {
            text: "I think it's called Alice.",
            postedBy: "Martin",
            upvotes: 7,
            downvotes: 3,
            reactions: [
                {
                    reactionText: "I was thinking of going to see that movie also.",
                    userName: "Cole",
                },
            ],
        }, //2 -
        {
            text: "Would yall like to go together if i can find a date?",
            postedBy: "Cole",
            upvotes: 526,
            downvotes: 57,
            reactions: [
                {
                    reactionText: "Yeah that would be fine, I might have a friend that I could call for you.",
                    userName: "Gina",
                },
            ],
        }, //3 -
        {
            text: "That would be great because you knowI'm single and ready to mingle.",
            postedBy: "Cole",
            upvotes: 983,
            downvotes: 71,
            reactions: [
                {
                    reactionText: "Okay she is a really nice person and down to earth.",
                    userName: "Gina",
                },
            ],
        }, //4 -
        {
            text: "I will call her and see if she wants to go.",
            postedBy: "Gina",
            upvotes: 123,
            downvotes: 13,
            reactions: [
                {
                    reactionText:
                        "What does she look like, not trying to be shallow or anything.?",
                    userName: "Cole",
                },
            ],
        }, //5 -
        {
            text: "Bro she ain't the best looker but her personality makes up for it.",
            postedBy: "Martin",
            upvotes: 8,
            downvotes: 1,
            reactions: [
                {
                    reactionText:
                        "That's fine with me cause you know them glamorous females be players.",
                    userName: "Cole",
                },
            ],
        }, //6 -
        {
            text: "Not all of them bro look at me and Gina!",
            postedBy: "Martin",
            upvotes: 1,
            downvotes: 9,
            reactions: [
                {
                    reactionText:
                        "I guess you have a point there, I guess that's me putting the last womans actions on all of them!",
                    userName: "Cole",
                },
            ],
        }, //7 -
        {
            text: "Have you seen what time the movie starts?",
            postedBy: "Cole",
            upvotes: 18,
            downvotes: 196,
            reactions: [
                {
                    reactionText: "Yea it starts at 10 so we should get ready to head out cause we still have to pick up Mary",
                    userName: "Gina",
                },
            ],
        }, //8 -
        {
            text: "Lets ride then cause I'm not trying to be late!!",
            postedBy: "Martn",
            upvotes: 3,
            downvotes: 0,
            reactions: [
                {
                    reactionText: "... who?",
                    userName: "Judge",
                },
            ],
        }, //9 -
        console.log("Thoughts Seeded!")
    );

    const u1Post = await Thought.find({ postedBy: "Martin" });
    // console.log(u1Post);
    const u2Post = await Thought.find({ postedBy: "Gina" });
    // console.log(u2Post);
    const u3Post = await Thought.find({ postedBy: "Cole" });
    // console.log(u3Post);

    await User.create(
        {
            userName: "Martin",
            email: "martin@none.net",
            password: "password",
            thoughts: u1Post,
            following: [],
            followedBy: [],
        },
        {
            userName: "Gina",
            email: "gina@none.net",
            password: "password",
            thoughts: u2Post,
            following: [],
            followedBy: [],
        },
        {
            userName: "Cole",
            email: "cole@none.net",
            password: "password",
            thoughts: u3Post,
            following: [],
            followedBy: [],
        },
        console.log("Users Seeded!")
    );

    const u1Following = await User.find({
        userName: { $in: ["Gina", "Cole"] },
    });
    console.log(u1Following);
    await User.findOneAndUpdate(
        { userName: "Martin" },
        { following: u1Following }
    );
    const u2Following = await User.find({ userName: "Cole" });
    console.log(u2Following);
    await User.findOneAndUpdate(
        { userName: "Gina" },
        { following: u2Following }
    );
    const u3Following = await User.find({ userName: "Gina" });
    console.log(u3Following);
    await User.findOneAndUpdate(
        { userName: "Cole" },
        { following: u3Following }
    );

    const u2FollowedBy = await User.find({
        userName: { $in: ["Cole", "Martin"] },
    });
    console.log(u2FollowedBy);
    await User.findOneAndUpdate(
        { userName: "Gina" },
        { followedBy: u2FollowedBy }
    );
    const u3FollowedBy = await User.find({
        userName: { $in: ["Gina", "Martin"] },
    });
    console.log(u3FollowedBy);
    await User.findOneAndUpdate(
        { userName: "Cole" },
        { followedBy: u3FollowedBy }
    );
    console.info("Seeded");
    process.exit(0);
});
