const fs = require("fs");
const path = require("path");
const jsonParser = require("express").json();
const multer = require('multer')
const upload = multer();
const appRoot = require('app-root-path');
const shortid = require('shortid');
const cookieParser = require('cookie-parser')();
const auth = require("./auth").auth;

function listParamsMiddleware(req, res, next) {
    const sort = JSON.parse(req.query.sort);
    const sortField = sort[0];
    const sortOrder = sort[1];
    const range = JSON.parse(req.query.range);
    const rangeStart = range[0];
    const rangeEnd = range[1] + 1;
    const filters = JSON.parse(req.query.filter);

    const regexFilters = Object.keys(filters).reduce((result, key) => {
        if (key == "dateFrom") {
            let date = new Date(filters[key])
            date.setHours(0, 0, 0, 0);
            if (result["creationDate"]) {
                result["creationDate"]["$gte"] = date;
            }
            else {
                result["creationDate"] = {
                    "$gte": date
                }
            }
        }
        else if (key == "dateTo") {
            let date = new Date(filters[key])
            date.setHours(0, 0, 0, 0);
            date.setHours(0, 0, 0, 0);
            if (result["creationDate"]) {
                result["creationDate"]["$lt"] = date;
            }
            else {
                result["creationDate"] = {
                    "$lt": date
                }
            }
        }
        else if (key == "authors") {
            result["authors.author"] = {
                "$regex": filters[key],
                "$options": "i"
            }
        }
        else if (
            key == "rota" ||
            key == "publicationPlace" ||
            key == "department" ||
            key == "isAdmin") {
            result[key] = {
                "$eq": filters[key]
            }
        }
        else {
            result[key] = {
                "$regex": filters[key],
                "$options": "i"
            }
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

/*
extractDataFromRequest: -firstCreationDate, -file
*/

function createAPI(app, resource, Model, extractDataToSend, extractDataFromRequest) {
    // create
    app.post(`/api/${resource}`, upload.array(), cookieParser, auth, jsonParser, (req, res) => {
        if (req.isAdmin) {
            let data = extractDataFromRequest(req);
            data["firstCreationDate"] = new Date();
            const modelRecord = new Model(data);
            modelRecord.save()
                .then(() => res.json(extractDataToSend(modelRecord)))
                .catch(error => console.log(error));
        }
        else res.status(401).json({ error: "Access denied" });
    });

    // update
    app.put(`/api/${resource}/:id`, upload.array(), cookieParser, auth, jsonParser, (req, res) => {
        if (req.isAdmin) {
            Model.findByIdAndUpdate(
                req.params.id,
                extractDataFromRequest(req),
                { new: true })
                .then(data => res.json(extractDataToSend(data)))
                .catch(error => console.log(error));
        }
        else res.status(401).json({ error: "Access denied" });
    });

    // delete
    app.delete(`/api/${resource}/:id`, cookieParser, auth, (req, res) => {
        if (req.isAdmin) {
            Model.findByIdAndDelete({ _id: req.params.id })
                .then(data => res.json(extractDataToSend(data)))
                .catch(error => console.log(error));
        }
        else res.status(401).json({ error: "Access denied" });
    });

    // getList
    app.get(`/api/${resource}`, cookieParser, auth, listParamsMiddleware, (req, res) => {
        const { sortField, sortOrder, rangeStart, rangeEnd, filter } = req.listParams;
        Model.find(filter)
            .sort({ [sortField]: sortOrder })
            .then(data => {
                const contentLength = `${resource} ${rangeStart}-${rangeEnd - 1}/${data.length}`;
                const dataToSend = data.slice(rangeStart, rangeEnd).map(dataItem => extractDataToSend(dataItem));
                res.set("Content-Range", contentLength).send(dataToSend);
            })
            .catch(error => console.log(error));
    });

    // getOne
    app.get(`/api/${resource}/:id`, cookieParser, auth, (req, res) => {
        Model.findOne({ _id: req.params.id })
            .then(data => res.json(extractDataToSend(data)))
            .catch(error => console.log(error));
    });

    // getMany
    app.post(`/api/${resource}/many`, cookieParser, auth, upload.array('ids'), (req, res) => {
        Model.find().where("_id").in(JSON.parse(req.body.ids)).exec((error, records) => {
            if (error) console.log(error);
            else {
                const dataToSend = records.map(data => extractDataToSend(data));
                res.send(dataToSend);
            }
        });
    });
}

function createAPIwithFile(app, resource, mimeTypes,
    Model, extractDataToSend, extractDataFromRequest) {

    const filesFolder = path.join("/media/", resource);

    const filesStorage = multer.diskStorage({
        destination: (req, file, cb) => {
            const dir = path.join(appRoot.path, filesFolder);
            if (!fs.existsSync(dir)) fs.mkdirSync(dir);
            cb(null, dir);
        },
        filename: (req, file, cb) => {
            cb(null, shortid.generate() + "_" + file.originalname);
        },
    });

    const formData = multer({
        storage: filesStorage,
        fileFilter: (req, file, cb) => {
            if (mimeTypes.includes(file.mimetype)) {
                cb(null, true);
            }
            else cb(null, false);
        }
    });

    // create
    app.post(`/api/${resource}`, cookieParser, auth, formData.single("file"), (req, res) => {
        if (req.isAdmin) {
            const data = extractDataFromRequest(req);
            data["firstCreationDate"] = new Date();
            data["file"] = path.join(filesFolder, req.file.filename);
            const modelRecord = new Model(data);
            modelRecord.save()
                .then(() => res.json(extractDataToSend(modelRecord)))
                .catch(error => console.log(error));
        }
        else res.status(401).json({ error: "Access denied" });
    });

    // update
    app.put(`/api/${resource}/:id`, cookieParser, auth, formData.single("newfile"), (req, res) => {
        if (req.isAdmin) {
            const data = extractDataFromRequest(req);
            if (req.file) {
                data["file"] = path.join(filesFolder, req.file.filename);
                const oldFilePath = path.join(appRoot.path, req.body.file);
                fs.unlink(oldFilePath, error => {
                    if (error) console.log(error);
                });
            }
            else {
                data["file"] = req.body.file;
            }
            Model.findByIdAndUpdate(
                req.params.id,
                data,
                { new: true })
                .then(updatedData => res.json(extractDataToSend(updatedData)))
                .catch(error => console.log(error));
        }
        else res.status(401).json({ error: "Access denied" });
    });

    // delete
    app.delete(`/api/${resource}/:id`, cookieParser, auth, (req, res) => {
        if (req.isAdmin) {
            Model.findByIdAndDelete({ _id: req.params.id })
                .then(data => {
                    const filePath = path.join(appRoot.path, data.file);
                    fs.unlink(filePath, error => {
                        if (error) console.log(error);
                    });
                    res.json(extractDataToSend(data));
                })
                .catch(error => console.log(error));
        }
        else res.status(401).json({ error: "Access denied" });
    });

    // getList
    app.get(`/api/${resource}`, cookieParser, auth, listParamsMiddleware, (req, res) => {
        const { sortField, sortOrder, rangeStart, rangeEnd, filter } = req.listParams;
        Model.find(filter)
            .sort({ [sortField]: sortOrder })
            .then(data => {
                const contentLength = `${resource} ${rangeStart}-${rangeEnd - 1}/${data.length}`;
                const dataToSend = data.slice(rangeStart, rangeEnd).map(dataItem => extractDataToSend(dataItem));
                res.set("Content-Range", contentLength).send(dataToSend);
            })
            .catch(error => console.log(error));
    });

    // getOne
    app.get(`/api/${resource}/:id`, cookieParser, auth, (req, res) => {
        Model.findOne({ _id: req.params.id })
            .then(data => res.json(extractDataToSend(data)))
            .catch(error => console.log(error));
    });
}

exports.listParamsMiddleware = listParamsMiddleware;
exports.createAPI = createAPI;
exports.createAPIwithFile = createAPIwithFile;