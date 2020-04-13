const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const jsonParser = require("express").json();
const jsonWebToken = require("jsonwebtoken");
const cookieParser = require('cookie-parser')();
const config = require("../../config");
const listParamsMiddleware = require("../utils").listParamsMiddleware;

const schema = new Schema({
    login: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    firstCreationDate: {
        type: Date,
        required: true
    },
},
    { versionKey: false });

const User = mongoose.model('User', schema);

function extractDataToSend(data) {
    return {
        id: data.id,
        login: data.login,
        password: data.password,
        isAdmin: data.isAdmin,
        firstCreationDate: data.firstCreationDate,
    }
}

function extractDataFromRequest(req) {
    return {
        "login": req.body.login,
        "password": req.body.password,
        "isAdmin": req.body.isAdmin,
    }
}

const resource = "users";

module.exports = function (app) {

    app.post("/api/login", jsonParser, (req, res) => {
        const { login, password } = req.body;
        User.findOne({ login })
            .then(user => {
                if (!user || user.password != password) {
                    res.status(401).json({
                        error: "Incorrect login or password"
                    });
                }
                else {
                    const payload = {
                        login,
                        isAdmin: user.isAdmin
                    };
                    const token = jsonWebToken.sign(payload, config.secretKey, {
                        expiresIn: 31536000
                    });
                    res.cookie("token", token, { httpOnly: true }).sendStatus(200);
                }
            })
            .catch(() => res.status(500).json({
                error: "Internal error, please try again"
            }));
    });

    app.get("/api/logout", (req, res) => {
        res.clearCookie('token').sendStatus(200);
    });

    const auth = (req, res, next) => {
        const token = req.cookies.token;
        if (!token) {
            res.status(401).json({
                error: "Unauthorized: no token provided"
            });
        }
        else {
            jsonWebToken.verify(token, config.secretKey, (error, decoded) => {
                if (error) {
                    res.status(401).json({
                        error: "Unauthorized: invalid token"
                    });
                }
                else {
                    req.login = decoded.login;
                    req.isAdmin = decoded.isAdmin;
                    next();
                }
            });
        }
    }

    app.get("/api/authenticate", cookieParser, auth, (req, res) => {
        res.sendStatus(200);
    });

    /*-------------------------------------------------------------------------------*/

    // is login exists
    app.post(`/api/${resource}/unique`, jsonParser, (req, res) => {
        let data = extractDataFromRequest(req);
        User.findOne({ login: data.login })
            .then(user => {
                if (user) res.json({ exists: true });
                else res.json({ exists: false });
            })
            .catch(() => res.status(500).json({
                error: "Internal error, please try again"
            }));
    });

    // create
    app.post(`/api/${resource}`, jsonParser, (req, res) => {
        let data = extractDataFromRequest(req);
        User.findOne({ login: data.login })
            .then(user => {
                if (user) {
                    res.status(409).json({ error: "Login already exists" });
                }
                else {
                    data["firstCreationDate"] = new Date();
                    const modelRecord = new User(data);
                    modelRecord.save()
                        .then(() => res.json(extractDataToSend(modelRecord)))
                        .catch(error => console.log(error));
                }
            })
            .catch(() => res.status(500).json({
                error: "Internal error, please try again"
            }));
    });

    // update
    app.put(`/api/${resource}/:id`, jsonParser, (req, res) => {
        User.findById(req.params.id)
            .then(user => {
                const data = extractDataFromRequest(req);
                if (user && user.login == data.login) {
                    User.findByIdAndUpdate(
                        req.params.id,
                        data,
                        { new: true })
                        .then(data => res.json(extractDataToSend(data)))
                        .catch(error => console.log(error));
                }
                else {
                    res.status(409).json({ error: "user not exists" });
                }
            })
            .catch(() => res.status(500).json({
                error: "Internal error, please try again"
            }));
    });

    // delete
    app.delete(`/api/${resource}/:id`, (req, res) => {
        User.findByIdAndDelete({ _id: req.params.id })
            .then(data => res.json(extractDataToSend(data)))
            .catch(error => console.log(error));
    });

    // getList
    app.get(`/api/${resource}`, listParamsMiddleware, (req, res) => {
        const { sortField, sortOrder, rangeStart, rangeEnd, filter } = req.listParams;
        User.find(filter)
            .sort({ [sortField]: sortOrder })
            .then(data => {
                const contentLength = `${resource} ${rangeStart}-${rangeEnd - 1}/${data.length}`;
                const dataToSend = data.slice(rangeStart, rangeEnd).map(dataItem => extractDataToSend(dataItem));
                res.set("Content-Range", contentLength).send(dataToSend);
            })
            .catch(error => console.log(error));
    });

    // getOne
    app.get(`/api/${resource}/:id`, (req, res) => {
        User.findOne({ _id: req.params.id })
            .then(data => res.json(extractDataToSend(data)))
            .catch(error => console.log(error));
    });
}