const path = require("path");
const mongoose = require("mongoose");
const appRoot = require('app-root-path');
const express = require("express");
const app = express();
const config = require("../config");

require('./routes/ArticleAPI')(app);
require('./routes/ProgrammAPI')(app);
require('./routes/ResearchAPI')(app);
require('./routes/RationalizationAPI')(app);
require('./routes/PublicationAPI')(app);
require('./routes/AbstractAPI')(app);
require('./routes/PatentsAPI')(app);
require('./routes/UserAPI')(app);
require('./routes/SubdivisionAPI')(app);
require('./routes/ApprobationAPI')(app);
require('./routes/VerificationAPI')(app);
require('./routes/DevelopmentWorkAPI')(app);
require('./routes/ProjectsAPI')(app);

app.use(function (req, res, next) {
    res.header("Cache-Control", "no-cache, no-store, must-revalidate");
    res.header("Pragma", "no-cache");
    res.header("Expires", 0);
    next();
});

app.use('/media', express.static(path.join(appRoot.path, "/media/")));

app.use('/static', express.static(path.join(appRoot.path, "/static/")));

app.use('/public', express.static(path.join(appRoot.path, "/public/")));

app.use('/fonts', express.static(path.join(appRoot.path, "/public/fonts/")));

app.get("/*", (req, res) => {
    res.sendFile((path.join(appRoot.path, "/public/index.html")));
});

mongoose.connect(
    `mongodb://${config.ip}:${config.port}/${config.databaseName}`,
    config.mongodbConfig)
    .then(() => {
        app.listen(config.serverPort, config.serverIP, () => {
            console.log("Server has started.");
        });
    })
    .catch(error => console.log(error));