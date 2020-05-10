const mongoose = require("mongoose");
const schema = require('../schemas').approbationSchema;
const createAPIwithFile = require("../utils").createAPIwithFile;

const Model = mongoose.model('Approbation', schema);
const resource = "approbations";
const mimeTypes = ["application/x-rar-compressed", "application/zip"];

function extractDataToSend(data) {
    return {
        id: data.id,
        headline: data.headline,
        description: data.description,
        creationDate: data.creationDate,
        firstCreationDate: data.firstCreationDate,
        authors: data.authors,
        headPerformer: data.headPerformer,
        customer: data.customer,
        category: data.category,
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
        "authors": JSON.parse(req.body.authors),
        "headPerformer": req.body.headPerformer,
        "customer": req.body.customer,
        "category": req.body.category,
    }
}

module.exports = function (app) {
    createAPIwithFile(app, resource, mimeTypes, Model, extractDataToSend, extractDataFromRequest);
};