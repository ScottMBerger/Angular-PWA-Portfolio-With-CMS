"use strict";
exports.__esModule = true;
var express = require("express");
var path = require("path");
var prerender = require("prerender-node");
var app = express();
var port = process.env.PORT || 3000;
app.use(prerender);
app.use(express.static(path.join(__dirname, '/dist/folio')));
app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, '/dist/folio/index.html'));
});
app.listen(port, function () {
    console.log("Listening at http://localhost:" + port + "/");
});
