const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const createAPI = require("../utils").createAPI;
const jsonParser = require("express").json();
const jsonWebToken = require("jsonwebtoken");
const cookieParser = require('cookie-parser')();
const config = require("../config");

const schema = new Schema({
    login: {
        type: String,
        required: true,
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
                        expiresIn: '1h'
                    });
                    res.cookie("token", token, { httpOnly: true }).sendStatus(200);
                }
            })
            .catch(() => res.status(500).json({
                error: "Internal error, please try again"
            }));
    });

    createAPI(app, resource, User, extractDataToSend, extractDataFromRequest);
}