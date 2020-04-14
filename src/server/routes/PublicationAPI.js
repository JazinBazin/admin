const mongoose = require("mongoose");
const schema = require('../schemas').publicationSchema;
const createAPI = require("../utils").createAPI;

const Model = mongoose.model('PublicationPlace', schema);

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

const resource = "publication";

module.exports = function (app) {
    createAPI(app, resource, Model, extractDataToSend, extractDataFromRequest);
}