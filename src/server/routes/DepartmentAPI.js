const mongoose = require("mongoose");
const schema = require('../schemas').departmentSchema;
const createAPI = require("../utils").createAPI;

const Model = mongoose.model('Department', schema);

function extractDataToSend(data) {
    return {
        id: data.id,
        name: data.name,
        firstCreationDate: data.firstCreationDate,
    }
}

function extractDataFromRequest(req) {
    return {
        "name": req.body.name,
    }
}

const resource = "departments";

module.exports = function (app) {
    createAPI(app, resource, Model, extractDataToSend, extractDataFromRequest);
}