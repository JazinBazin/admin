const mongoose = require("mongoose");
const schema = require('../schemas').subdivisionSchema;
const createAPI = require("../utils").createAPI;

const Model = mongoose.model('Subdivision', schema);

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

const resource = "subdivisions";

module.exports = function (app) {
    createAPI(app, resource, Model, extractDataToSend, extractDataFromRequest);
}