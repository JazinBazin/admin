const fs = require("fs");
const express = require("express");
const path = require("path");
const app = express();
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const multer = require("multer");
const appRoot = require('app-root-path');
const shortid = require('shortid');

const articleSchema = new Schema(
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
        },
        file: {
            type: String,
            required: true
        }
    },
    { versionKey: false });

const Article = mongoose.model('Article', articleSchema);

mongoose.connect(
    "mongodb://localhost:27017/era",
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

const articleFilesFolder = "/media/articles"

const articleFilesStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(appRoot.path, articleFilesFolder));
    },
    filename: (req, file, cb) => {
        cb(null, shortid.generate() + "_" + file.originalname);
    },
});

const articlesFormData = multer({
    storage: articleFilesStorage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "application/pdf") cb(null, true);
        else cb(null, false);
    }
});

// create
app.post("/api/articles", articlesFormData.single("file"), (req, res) => {
    const { headline, text } = req.body;
    const filePath = path.join(articleFilesFolder, req.file.filename);
    const article = new Article({
        headline,
        text,
        file: filePath
    });
    article.save()
        .then(() => {
            articleToSend = {
                id: article.id,
                headline: article.headline,
                text: article.text,
                file: {
                    url: article.file,
                    title: "Статья" + article.headline
                }
            }
            res.json(articleToSend);
        })
        .catch(error => console.log(error));
});

// update
app.put("/api/articles/:id", articlesFormData.single("newfile"), (req, res) => {
    const article = {
        headline: req.body.headline,
        text: req.body.text
    };
    if (req.file) {
        article.file = path.join(articleFilesFolder, req.file.filename);
        const oldArticleFilePath = path.join(appRoot.path, req.body.file);
        fs.unlink(oldArticleFilePath, error => {
            if (error) console.log(error);
        });
    }
    else {
        article.file = req.body.file;
    }
    Article.findByIdAndUpdate(
        req.params.id,
        article,
        { new: true })
        .then(newArticle => {
            articleToSend = {
                id: newArticle._id,
                headline: newArticle.headline,
                text: newArticle.text,
                file: {
                    url: newArticle.file,
                    title: "Статья: " + newArticle.headline
                }
            }
            res.json(articleToSend);
        })
        .catch(error => console.log(error));
});

// delete
app.delete("/api/articles/:id", (req, res) => {
    Article.findByIdAndDelete({ _id: req.params.id })
        .then(article => {
            const articleFilePath = path.join(appRoot.path, article.file);
            fs.unlink(articleFilePath, error => {
                if (error) console.log(error);
            });
            articleToSend = {
                id: article._id,
                headline: article.headline,
                text: article.text,
                file: {
                    url: article.file,
                    title: "Статья: " + article.headline
                }
            }
            res.json(articleToSend);
        })
        .catch(error => console.log(error));
});

function listParamsMiddleware(req, res, next) {
    const sort = JSON.parse(req.query.sort);
    const sortField = sort[0];
    const sortOrder = sort[1];
    const range = JSON.parse(req.query.range);
    const rangeStart = range[0];
    const rangeEnd = range[1] + 1;
    const filters = JSON.parse(req.query.filter);
    const regexFilters = Object.keys(filters).reduce((result, key) => {
        result[key] = {
            "$regex": filters[key],
            "$options": "i"
        }
        return result
    }, {});
    req.listParams = {
        sortField, sortOrder,
        rangeStart, rangeEnd,
        filter: regexFilters
    };
    next();
}

// getList
app.get("/api/articles", listParamsMiddleware, (req, res) => {
    const {
        sortField, sortOrder,
        rangeStart, rangeEnd,
        filter } = req.listParams;

    Article.find(filter)
        .sort({ [sortField]: sortOrder })
        .then(articles => {
            const contentLength = `articles ${rangeStart}-${rangeEnd - 1}/${articles.length}`;
            let articlesToSend = [];
            articles.slice(rangeStart, rangeEnd)
                .map(article =>
                    articlesToSend.push({
                        id: article._id,
                        headline: article.headline,
                        text: article.text,
                        file: {
                            url: article.file,
                            title: "Статья: " + article.headline
                        }
                    })
                );
            res.set("Content-Range", contentLength);
            res.status(200);
            res.send(articlesToSend);
        })
        .catch(error => console.log(error));
});

// getOne
app.get("/api/articles/:id", (req, res) => {
    const id = req.params.id;
    Article.findOne({ _id: id })
        .then(article => {
            const articleToSend = {
                id: article._id,
                headline: article.headline,
                text: article.text,
                file: {
                    url: article.file,
                    title: "Статья: " + article.headline
                }
            }
            res.json(articleToSend)
        })
        .catch(error => console.log(error));
})

app.use('/dist', express.static(path.join(appRoot.path, "/dist/")));

app.use('/media', express.static(path.join(appRoot.path, "/media/")));

app.get("/*", (req, res) => {
    res.sendFile((path.join(appRoot.path, "/public/index.html")));
});