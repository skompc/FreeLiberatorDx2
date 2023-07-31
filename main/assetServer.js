const assetPort = 3000;

// Requirements
const express = require("express");
const http = require("http");
const path = require("path");
const fs = require("fs");

function assetServer(assetPort){
    const server = http.createServer((req, res) => {
        const filePath = path.join(__dirname + "/../static/", req.url);
        console.log(filePath)
        const stream = fs.createReadStream(filePath);
  
        stream.on('error', (err) => {
        res.writeHead(404, {'Content-Type': 'text/plain'});
        res.end('File not found');
        });
  
        res.writeHead(200, {'Content-Type': 'text/html'});
        stream.pipe(res);
    });
  
  server.listen(assetPort, () => {
    console.log(`Asset Server running on port ${assetPort}`);
  });
}

assetServer(assetPort)
module.exports = { assetServer };