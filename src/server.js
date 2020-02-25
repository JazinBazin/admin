const express = require("express");
const path = require("path");
const app = express();
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const jsonParser = express.json();

const postSchema = new Schema(
    {
        headline: {
            type: String,
            required: true,
            maxlength: 100
        },
        text: {
            type: String,
            required: true,
            maxlength: 5000
        }
    },
    { versionKey: false });

const Post = mongoose.model('Post', postSchema);

mongoose.connect(
    "mongodb://localhost:27017/test",
    {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    })
    .then(() => {
        app.listen(3000, () => {
            console.log("Server has started.");
        });
    })
    .catch(error => console.log(error));

app.use(function (req, res, next) {
    res.header("Cache-Control", "no-cache, no-store, must-revalidate");
    res.header("Pragma", "no-cache");
    res.header("Expires", 0);
    next();
});

function extractQueryParams(query) {
    const sort = JSON.parse(query.sort);
    const sortField = sort[0];
    const sortOrder = sort[1];
    const range = JSON.parse(query.range);
    const rangeStart = range[0];
    const rangeEnd = range[1] + 1;
    const filters = JSON.parse(query.filter);
    const regexFilters = Object.keys(filters).reduce((result, key) => {
        result[key] = {
            "$regex": filters[key],
            "$options": "i"
        }
        return result
    }, {});

    return {
        sortField, sortOrder,
        rangeStart, rangeEnd,
        filter: regexFilters
    };
}

// getList
app.get("/api/posts", (req, res) => {
    const {
        sortField, sortOrder,
        rangeStart, rangeEnd,
        filter } = extractQueryParams(req.query);

    Post.find(filter)
        .sort({ [sortField]: sortOrder })
        .then(posts => {
            const contentLength = `posts ${rangeStart}-${rangeEnd - 1}/${posts.length}`;
            let postsToSend = [];
            posts.slice(rangeStart, rangeEnd)
                .map(post =>
                    postsToSend.push({
                        id: post._id,
                        headline: post.headline,
                        text: post.text
                    })
                );
            res.set("Content-Range", contentLength);
            res.status(200);
            res.send(postsToSend);
        })
        .catch(error => console.log(error));
});

// getOne
app.get("/api/posts/:id", (req, res) => {
    const id = req.params.id;
    Post.findOne({ _id: id })
        .then(post => res.json(post))
        .catch(error => console.log(error));
})

// create
app.post("/api/posts", jsonParser, (req, res) => {
    const { headline, text } = req.body;
    const post = new Post({ headline, text });
    post.save()
        .then(() => {
            postToSend = {
                id: post._id,
                headline: post.headline,
                text: post.text
            }
            res.json(postToSend);
        })
        .catch(error => console.log(error));
});

// update
app.put("/api/posts/:id", jsonParser, (req, res) => {
    const post = {
        headline: req.body.headline,
        text: req.body.text
    };
    Post.findByIdAndUpdate(
        req.params.id,
        post,
        { new: true })
        .then(() => {
            postToSend = {
                id: post._id,
                headline: post.headline,
                text: post.text
            }
            res.json(postToSend);
        })
        .catch(error => console.log(error));
});

// delete
app.delete("/api/posts/:id", (req, res) => {
    Post.findByIdAndDelete({ _id: req.params.id })
        .then(post => {
            postToSend = {
                id: post._id,
                headline: post.headline,
                text: post.text
            }
            res.json(postToSend);
        })
        .catch(error => console.log(error));
});

app.use('/dist', express.static(path.resolve(
    __dirname,
    "../dist/"
)));

app.use("/*", (req, res) => {
    res.sendFile(path.resolve(
        __dirname,
        "../public/index.html"
    ));
});