const fs = require('fs');
const path = require('path');
const express = require('express');
const rout = express.Router();

rout.get('/', async (req, res, next) => {
    console.log(req.body)
    res.json({
        name: "success"
    })
})


module.exports = rout; 