const express = require("express"),
    app = express(),
    serv = require('http').Server(app),
    path = require('path');

const cors = require("cors");
const bodyParser = require ('body-parser');

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

let PORT = process.env.PORT || 2020;

app.use(express.static(path.join(__dirname, 'build')));

let volunteerList = [];

app.get("/api/read", (req, res) => {
    res.send(volunteerList)
});

app.post("/api/create", (req, res) => {
    for(let v in volunteerList){
        if(req.body.email == volunteerList[v].email){
            volunteerList[v].days+=1;
            res.send("success");
            return
        }
    }
    volunteerList.push({...req.body, days:1});
    res.send("success");
});

app.post("/api/clear", (req, res) => {
    volunteerList = [];
    res.send("success");
});

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

serv.listen(PORT);


