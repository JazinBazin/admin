const fs = require("fs");
const path = require("path");
const appRoot = require('app-root-path');
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const multer = require("multer");
const shortid = require('shortid');
const listParamsMiddleware = require("./utils").listParamsMiddleware;

/*

Авторы +++
Поиск по автору
Место публикации +
Поиск по месту публикации
Рейтинг места публикации +
Сортировка по месту публикации
Отделы
Ниры
*/

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
        creationDate: {
            type: Date,
            required: true
        },
        firstCreationDate: {
            type: Date,
            required: true
        },
        publicationPlace: {
            type: Schema.Types.ObjectId,
            ref: 'PublicationPlace'
        },
        authors: [{ author: String }],
        file: {
            type: String,
            required: true
        }
    },
    { versionKey: false });

const Article = mongoose.model('Article', articleSchema);

const articleFilesFolder = "/media/articles";

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
        if (file.mimetype == "application/pdf") {
            cb(null, true);
        }
        else cb(null, false);
    }
});

module.exports = function (app) {
    // create
    app.post("/api/articles", articlesFormData.single("file"), (req, res) => {
        const { headline, text, creationDate, authors, publicationPlace } = req.body;
        const filePath = path.join(articleFilesFolder, req.file.filename);
        const article = new Article({
            headline,
            text,
            creationDate: new Date(creationDate),
            firstCreationDate: new Date(),
            publicationPlace,
            authors: JSON.parse(authors),
            file: filePath
        });
        article.save()
            .then(() => {
                const articleToSend = {
                    id: article.id,
                    headline: article.headline,
                    text: article.text,
                    creationDate: article.creationDate,
                    firstCreationDate: article.firstCreationDate,
                    publicationPlace: article.publicationPlace,
                    authors: article.authors,
                    file: {
                        url: article.file,
                        title: "Статья: " + article.headline
                    }
                }
                res.json(articleToSend);
            })
            .catch(error => console.log(error));
    });

    // update
    app.put("/api/articles/:id", articlesFormData.single("newfile"), (req, res) => {
        const { headline, text, creationDate, authors, publicationPlace } = req.body;
        const article = {
            headline,
            text,
            publicationPlace,
            creationDate: new Date(creationDate),
            authors: JSON.parse(authors),
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
                const articleToSend = {
                    id: newArticle._id,
                    headline: newArticle.headline,
                    text: newArticle.text,
                    creationDate: article.creationDate,
                    firstCreationDate: article.firstCreationDate,
                    publicationPlace: article.publicationPlace,
                    authors: article.authors,
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
                const articleToSend = {
                    id: article._id,
                    headline: article.headline,
                    text: article.text,
                    creationDate: article.creationDate,
                    firstCreationDate: article.firstCreationDate,
                    publicationPlace: article.publicationPlace,
                    authors: article.authors,
                    file: {
                        url: article.file,
                        title: "Статья: " + article.headline
                    }
                }
                res.json(articleToSend);
            })
            .catch(error => console.log(error));
    });

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
                            creationDate: article.creationDate,
                            firstCreationDate: article.firstCreationDate,
                            publicationPlace: article.publicationPlace,
                            authors: article.authors,
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
                    creationDate: article.creationDate,
                    firstCreationDate: article.firstCreationDate,
                    publicationPlace: article.publicationPlace,
                    authors: article.authors,
                    file: {
                        url: article.file,
                        title: "Статья: " + article.headline
                    }
                }
                res.json(articleToSend);
            })
            .catch(error => console.log(error));
    });
};