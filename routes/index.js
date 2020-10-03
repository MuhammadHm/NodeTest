const fs = require('fs');
const path = require('path');
const express = require('express');
const rout = express.Router();

// Routs
const home = require("./controllers/home");

// Middlewares
rout.use(express.json());
rout.use(express.urlencoded({ extended: false }));


// Req Handlers

// rout.use('/signin',singin);

// rout.use('/logout',logout);

// rout.use('/mysurveys',mysurveys);

rout.use('/',home);


module.exports = rout; 