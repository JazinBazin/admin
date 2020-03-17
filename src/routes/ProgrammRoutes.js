const fs = require("fs");
const path = require("path");
const appRoot = require('app-root-path');
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const multer = require("multer");
const shortid = require('shortid');
const listParamsMiddleware = require("./utils").listParamsMiddleware;

const programmSchema = new Schema(
    {
        headline: {
            type: String,
            required: true,
            maxlength: 100
        },
        description: {
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
        file: {
            type: String,
            required: true
        }
    },
    { versionKey: false });

const Programm = mongoose.model('Programm', programmSchema);

const programmFilesFolder = "/media/programms";

const programmFilesStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(appRoot.path, programmFilesFolder));
    },
    filename: (req, file, cb) => {
        cb(null, shortid.generate() + "_" + file.originalname);
    },
});

const programmsFormData = multer({
    storage: programmFilesStorage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "application/x-rar-compressed" ||
            file.mimetype == "application/zip") cb(null, true);
        else cb(null, false);
    }
});

module.exports = function (app) {
    // create
    app.post("/api/programms", programmsFormData.single("file"), (req, res) => {
        const { headline, description, creationDate } = req.body;
        const filePath = path.join(programmFilesFolder, req.file.filename);
        const programm = new Programm({
            headline,
            description,
            creationDate: new Date(creationDate),
            firstCreationDate: new Date(),
            file: filePath
        });
        programm.save()
            .then(() => {
                programmToSend = {
                    id: programm.id,
                    headline: programm.headline,
                    description: programm.description,
                    creationDate: programm.creationDate,
                    firstCreationDate: programm.firstCreationDate,
                    file: {
                        url: programm.file,
                        title: programm.headline
                    }
                }
                res.json(programmToSend);
            })
            .catch(error => console.log(error));
    });

    // update
    app.put("/api/programms/:id", programmsFormData.single("newfile"), (req, res) => {
        const { headline, description, creationDate } = req.body;
        const programm = {
            headline,
            description,
            creationDate: new Date(creationDate),
        };
        if (req.file) {
            programm.file = path.join(programmFilesFolder, req.file.filename);
            const oldProgrammFilePath = path.join(appRoot.path, req.body.file);
            fs.unlink(oldProgrammFilePath, error => {
                if (error) console.log(error);
            });
        }
        else {
            programm.file = req.body.file;
        }
        Programm.findByIdAndUpdate(
            req.params.id,
            programm,
            { new: true })
            .then(newProgramm => {
                programmToSend = {
                    id: newProgramm._id,
                    headline: newProgramm.headline,
                    description: newProgramm.description,
                    creationDate: newProgramm.creationDate,
                    firstCreationDate: programm.firstCreationDate,
                    file: {
                        url: newProgramm.file,
                        title: newProgramm.headline
                    }
                }
                res.json(programmToSend);
            })
            .catch(error => console.log(error));
    });

    // delete
    app.delete("/api/programms/:id", (req, res) => {
        Programm.findByIdAndDelete({ _id: req.params.id })
            .then(programm => {
                const programmFilePath = path.join(appRoot.path, programm.file);
                fs.unlink(programmFilePath, error => {
                    if (error) console.log(error);
                });
                programmToSend = {
                    id: programm._id,
                    headline: programm.headline,
                    description: programm.description,
                    creationDate: programm.creationDate,
                    firstCreationDate: programm.firstCreationDate,
                    file: {
                        url: programm.file,
                        title: programm.headline
                    }
                }
                res.json(programmToSend);
            })
            .catch(error => console.log(error));
    });

    // getList
    app.get("/api/programms", listParamsMiddleware, (req, res) => {
        const {
            sortField, sortOrder,
            rangeStart, rangeEnd,
            filter } = req.listParams;

        Programm.find(filter)
            .sort({ [sortField]: sortOrder })
            .then(programms => {
                const contentLength = `programms ${rangeStart}-${rangeEnd - 1}/${programms.length}`;
                let programmsToSend = [];
                programms.slice(rangeStart, rangeEnd)
                    .map(programm =>
                        programmsToSend.push({
                            id: programm._id,
                            headline: programm.headline,
                            description: programm.description,
                            creationDate: programm.creationDate,
                            firstCreationDate: programm.firstCreationDate,
                            file: {
                                url: programm.file,
                                title: programm.headline
                            }
                        })
                    );
                res.set("Content-Range", contentLength);
                res.status(200);
                res.send(programmsToSend);
            })
            .catch(error => console.log(error));
    });

    // getOne
    app.get("/api/programms/:id", (req, res) => {
        const id = req.params.id;
        Programm.findOne({ _id: id })
            .then(programm => {
                const programmToSend = {
                    id: programm._id,
                    headline: programm.headline,
                    description: programm.description,
                    creationDate: programm.creationDate,
                    firstCreationDate: programm.firstCreationDate,
                    file: {
                        url: programm.file,
                        title: programm.headline
                    }
                }
                res.json(programmToSend);
            })
            .catch(error => console.log(error));
    });
};