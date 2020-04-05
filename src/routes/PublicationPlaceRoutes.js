const jsonParser = require("express").json();
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const listParamsMiddleware = require("./utils").listParamsMiddleware;

const publicationPlaceSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        rating: {
            type: Number,
            min: 1,
            required: true,
        },
        firstCreationDate: {
            type: Date,
            required: true
        },
    },
    { versionKey: false });

const PublicationPlace = mongoose.model('PublicationPlace', publicationPlaceSchema);

module.exports = function (app) {
    // create
    app.post("/api/publication", jsonParser, (req, res) => {
        const { name, rating } = req.body;
        const publicationPlace = new PublicationPlace({
            name,
            rating,
            firstCreationDate: new Date(),
        });
        publicationPlace.save()
            .then(() => {
                const publicationPlaceToSend = {
                    id: publicationPlace.id,
                    name: publicationPlace.name,
                    rating: publicationPlace.rating,
                    firstCreationDate: publicationPlace.firstCreationDate,
                }
                res.json(publicationPlaceToSend);
            })
            .catch(error => console.log(error));
    });

    // update
    app.put("/api/publication/:id", jsonParser, (req, res) => {
        const { name, rating } = req.body;
        const publicationPlace = { name, rating };
        PublicationPlace.findByIdAndUpdate(
            req.params.id,
            publicationPlace,
            { new: true })
            .then(newPublicationPlace => {
                const publicationPlaceToSend = {
                    id: newPublicationPlace.id,
                    name: newPublicationPlace.name,
                    rating: newPublicationPlace.rating,
                    firstCreationDate: newPublicationPlace.firstCreationDate,
                }
                res.json(publicationPlaceToSend);
            })
            .catch(error => console.log(error));
    });

    // delete
    app.delete("/api/publication/:id", (req, res) => {
        PublicationPlace.findByIdAndDelete({ _id: req.params.id })
            .then(publicationPlace => {
                const publicationPlaceToSend = {
                    id: publicationPlace.id,
                    name: publicationPlace.name,
                    rating: publicationPlace.rating,
                    firstCreationDate: publicationPlace.firstCreationDate,
                }
                res.json(publicationPlaceToSend);
            })
            .catch(error => console.log(error));
    });

    // getList
    app.get("/api/publication", listParamsMiddleware, (req, res) => {
        const {
            sortField, sortOrder,
            rangeStart, rangeEnd,
            filter } = req.listParams;

        PublicationPlace.find(filter)
            .sort({ [sortField]: sortOrder })
            .then(publicationPlaces => {
                const contentLength = `publication ${rangeStart}-${rangeEnd - 1}/${publicationPlaces.length}`;
                let publicationPlacesToSend = [];
                publicationPlaces.slice(rangeStart, rangeEnd)
                    .map(publicationPlace =>
                        publicationPlacesToSend.push({
                            id: publicationPlace.id,
                            name: publicationPlace.name,
                            rating: publicationPlace.rating,
                            firstCreationDate: publicationPlace.firstCreationDate,
                        })
                    );
                res.set("Content-Range", contentLength);
                res.status(200);
                res.send(publicationPlacesToSend);
            })
            .catch(error => console.log(error));
    });

    // getOne
    app.get("/api/publication/:id", (req, res) => {
        const id = req.params.id;
        PublicationPlace.findOne({ _id: id })
            .then(publicationPlace => {
                const publicationPlaceToSend = {
                    id: publicationPlace.id,
                    name: publicationPlace.name,
                    rating: publicationPlace.rating,
                    firstCreationDate: publicationPlace.firstCreationDate,
                }
                res.json(publicationPlaceToSend);
            })
            .catch(error => console.log(error));
    });
}