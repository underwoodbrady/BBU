const express = require("express"),
    app = express(),
    serv = require('http').Server(app),
    path = require('path');


let PORT = process.env.PORT || 2020;

app.use(express.static(path.join(__dirname, 'build')));

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

serv.listen(PORT);