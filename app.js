const express = require('express');
const app = express();
const http = require('http').createServer(app);
const path = require('path');


http.listen(2019);
console.log('A magia acontece na porta 2019');