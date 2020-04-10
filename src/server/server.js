const path = require("path");
const mongoose = require("mongoose");
const appRoot = require('app-root-path');
const express = require("express");
const app = express();

require('./routes/ArticleAPI')(app);
require('./routes/ProgrammAPI')(app);
require('./routes/ResearchAPI')(app);
require('./routes/RationalizationAPI')(app);
require('./routes/PublicationAPI')(app);
require('./routes/DepartmentAPI')(app);
require('./routes/UsersAPI')(app);

app.use(function (req, res, next) {
    res.header("Cache-Control", "no-cache, no-store, must-revalidate");
    res.header("Pragma", "no-cache");
    res.header("Expires", 0);
    next();
});

app.use('/dist', express.static(path.join(appRoot.path, "/dist/")));

app.use('/media', express.static(path.join(appRoot.path, "/media/")));

app.use('/static', express.static(path.join(appRoot.path, "/static/")));

app.get("/*", (req, res) => {
    res.sendFile((path.join(appRoot.path, "/public/index.html")));
});

mongoose.connect(
    "mongodb://localhost:27017/era",
    {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    })
    .then(() => {
        app.listen(3000, () => {
            console.log("Server has started.");
        });
    })
    .catch(error => console.log(error));