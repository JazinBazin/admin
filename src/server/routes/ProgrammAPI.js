const mongoose = require("mongoose");
const schema = require('../schemas').programmSchema;
const createAPIwithFile = require("../utils").createAPIwithFile;

const Model = mongoose.model('Programm', schema);
const resource = "programms";
const mimeTypes = ["application/x-rar-compressed", "application/zip"];

function extractDataToSend(data) {
    return {
        id: data.id,
        headline: data.headline,
        description: data.description,
        creationDate: data.creationDate,
        firstCreationDate: data.firstCreationDate,
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
        "description": req.body.description,
        "creationDate": new Date(req.body.creationDate),
        "rota": req.body.rota,
        "department": req.body.department,
        "authors": JSON.parse(req.body.authors)
    }
}

module.exports = function (app) {
    createAPIwithFile(app, resource, mimeTypes, Model, extractDataToSend, extractDataFromRequest);
};