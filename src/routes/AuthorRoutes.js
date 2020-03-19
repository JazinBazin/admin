const jsonParser = require("express").json();
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const listParamsMiddleware = require("./utils").listParamsMiddleware;

const authorSchema = new Schema(
    {
        lastName: {
            type: String,
            required: true,
            maxlength: 50
        },
        firstName: {
            type: String,
            required: true,
            maxlength: 50
        },
        middleName: {
            type: String,
            required: true,
            maxlength: 50
        },
        firstCreationDate: {
            type: Date,
            required: true
        },
    },
    { versionKey: false });

const Author = mongoose.model('Author', authorSchema);

module.exports = function (app) {
    // create
    app.post("/api/authors", jsonParser, (req, res) => {
        const { lastName, firstName, middleName } = req.body;
        const author = new Author({
            lastName,
            firstName,
            middleName,
            firstCreationDate: new Date(),
        });
        author.save()
            .then(() => {
                const authorToSend = {
                    id: author.id,
                    lastName: author.lastName,
                    firstName: author.firstName,
                    middleName: author.middleName,
                    firstCreationDate: author.firstCreationDate,
                }
                res.json(authorToSend);
            })
            .catch(error => console.log(error));
    });

    // update
    app.put("/api/authors/:id", jsonParser, (req, res) => {
        const { lastName, firstName, middleName, ran } = req.body;
        const author = {
            lastName,
            firstName,
            middleName,
        };
        Author.findByIdAndUpdate(
            req.params.id,
            author,
            { new: true })
            .then(newAuthor => {
                const authorToSend = {
                    id: newAuthor._id,
                    lastName: newAuthor.lastName,
                    firstName: newAuthor.firstName,
                    middleName: newAuthor.middleName,
                    firstCreationDate: newAuthor.firstCreationDate,
                }
                res.json(authorToSend);
            })
            .catch(error => console.log(error));
    });

    // delete
    app.delete("/api/authors/:id", (req, res) => {
        Author.findByIdAndDelete({ _id: req.params.id })
            .then(author => {
                const authorToSend = {
                    id: author.id,
                    lastName: author.lastName,
                    firstName: author.firstName,
                    middleName: author.middleName,
                    firstCreationDate: author.firstCreationDate,
                }
                res.json(authorToSend);
            })
            .catch(error => console.log(error));
    });

    // getList
    app.get("/api/authors", listParamsMiddleware, (req, res) => {
        const {
            sortField, sortOrder,
            rangeStart, rangeEnd,
            filter } = req.listParams;

        Author.find(filter)
            .sort({ [sortField]: sortOrder })
            .then(authors => {
                const contentLength = `authors ${rangeStart}-${rangeEnd - 1}/${authors.length}`;
                let authorsToSend = [];
                authors.slice(rangeStart, rangeEnd)
                    .map(author =>
                        authorsToSend.push({
                            id: author.id,
                            lastName: author.lastName,
                            firstName: author.firstName,
                            middleName: author.middleName,
                            firstCreationDate: author.firstCreationDate,
                        })
                    );
                res.set("Content-Range", contentLength);
                res.status(200);
                res.send(authorsToSend);
            })
            .catch(error => console.log(error));
    });

    // getOne
    app.get("/api/authors/:id", (req, res) => {
        const id = req.params.id;
        Author.findOne({ _id: id })
            .then(author => {
                const authorToSend = {
                    id: author.id,
                    lastName: author.lastName,
                    firstName: author.firstName,
                    middleName: author.middleName,
                    firstCreationDate: author.firstCreationDate,
                }
                res.json(authorToSend);
            })
            .catch(error => console.log(error));
    });
}