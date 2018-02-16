const express = require('express');
const app = express();
const fs = require('fs');
const log = require('./log.csv');
var newCSV;
var JSONobj = [];


app.use((req, res, next) => {
    //Creates a log in CSV format
    var agent = req.headers['user-agent'].replace(/,/,'');
    var time = new Date(); time = time.toISOString();
    var method = req.method;
    var resource = req.url;
    var version = 'HTTP/'+req.httpVersion;
    var status = '200';
    newCSV = '\n' + "'" + agent + ',' + time + ',' + method + ',' + resource + ',' + version + ',' + status + "'";
    fs.appendFile('server/log.csv', newCSV, ()=>{
        console.log(newCSV);
    //Creates and populates JSON obj to be displayed at /logs
    var newObj = {};
    newObj.Agent = agent;
    newObj.Time = time;
    newObj.Method = method;
    newObj.Resource = resource;
    newObj.Version = version;
    newObj.Status = status;
    JSONobj.push(newObj);
    });
    next();
});

//GET to root route 
app.get('/', (req, res) => {
    res.send('OK');
    console.log('Status Code: 200')
    
});

//GET to /logs
app.get('/logs', (req, res) => {
    res.send(JSONobj);
});

module.exports = app;



