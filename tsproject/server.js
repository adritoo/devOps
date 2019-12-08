"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var metrics_1 = require("./metrics");
var app = express();
var port = process.env.PORT || '3000';

///path
///path = require('path')
///app.use(express.static(path.join(__dirname, 'public')))

///gets 
app.get('/metrics.json', function (req, res) {
    metrics_1.MetricsHandler.get(function (err, result) {
        if (err) {
            throw err;
        }
        res.json(result);
    });
});
app.get('/', function (req, res) {
    res.send('Welcome in the first App : \n\n' +
        'path \'/hello\' to display the -hello name- mode.\n\n' +
        ' Path to be completed with parameter NAME :\n' +
        'it displays \'hello name\' \n' +
        'if no name : \'hello anonymous\'' +
        'else : error 404');
});
app.get(//helloanonymous page
'/hello', function (req, res) { return res.send("hello anonymous"); });

app.get(//hello name page
'/hello/:name', function (req, res) { return res.render("/views/hello.ejs", { name: req.params.name, }); });


///listen
app.listen(port, function (err) {
    if (err) {
        throw err;
    }
    console.log("server is listening on port " + port);
});