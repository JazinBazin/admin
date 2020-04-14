const mongoose = require("mongoose");
const schema = require('../schemas').articleSchema;
const createAPIwithFile = require("../utils").createAPIwithFile;

const Model = mongoose.model('Article', schema);
const resource = "articles";
const mimeTypes = ["application/pdf",];

function extractDataToSend(data) {
    return {
        id: data.id,
        headline: data.headline,
        text: data.text,
        creationDate: data.creationDate,
        firstCreationDate: data.firstCreationDate,
        publicationPlace: data.publicationPlace,
        rota: data.rota,
        department: data.department,
        authors: data.authors,
        file: {
            url: data.file,
            title: data.headline
        }
    }
}

function extractDataFromRequest(req) {
    return {
        "headline": req.body.headline,
        "text": req.body.text,
        "creationDate": new Date(req.body.creationDate),
        "publicationPlace": req.body.publicationPlace,
        "rota": req.body.rota,
        "department": req.body.department,
        "authors": JSON.parse(req.body.authors)
    }
}

module.exports = function (app) {
    createAPIwithFile(app, resource, mimeTypes, Model, extractDataToSend, extractDataFromRequest);
};