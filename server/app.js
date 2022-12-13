const express = require("express");
const cors = require("cors");
const bodyParser = require ('body-parser');
const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

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

const PORT = process.env.PORT || 2020;
const msg = `Running on PORT ${PORT}`;

app.get("/", (req, res) => {
    res.send(`<h1>Express Server</h1><p>${msg}<p>`);
});

app.listen(PORT, () => {
    console.log(msg);
});