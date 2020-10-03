const fs = require('fs');
const path = require('path');
const express = require('express');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const _ = require('lodash');
const rout = express.Router();

//Models
const Files = require("../models/Files");
const Folders = require("../models/Folders");

// Middlewares
rout.use(express.json());
rout.use(express.urlencoded({ extended: false }));
rout.use(fileUpload({ createParentPath: true }));
rout.use(cors());

// Req Handlers

// Body : { file : "file" , folder_id : 2 } 
rout.post('/addfile', (req, res) => {
    if (!req.files) {
        res.send({
            status: false,
            message: 'No file uploaded'
        });
    }
    else {
        Files.addFile(req.files.file, req.body.folder_id)
        res.send({
            status: true,
            message: 'file added successfuly'
        });
    }
});

// Params : { id : 2 }
rout.delete('/file', (req, res) => {
    if (!req.query.id) {
        res.send({
            status: false,
            message: 'No file deleted'
        });
    }
    else {
        Files.deleteFile(req.query.id)
        res.send({
            status: true,
            message: 'file deleted successfuly'
        });
    }
})

// Params : { name : "folderName", parent_id : 2, user_id : 1 }
// if there is no parent for folder then parent_id = null
rout.get('/addfolder', (req, res) => {
    if (!req.query.name || !req.query.user_id) {
        res.send({
            status: false,
            message: 'Please pass all params'
        });
    }
    else {
        Folders.addFolder(req.query.name, req.query.parent_id, req.query.user_id)
        res.send({
            status: true,
            message: 'folder added successfuly'
        });
    }
});

// Params : { id : 2 }
rout.delete('/folder', (req, res) => {
    if (!req.query.id) {
        res.send({
            status: false,
            message: 'No folder deleted'
        });
    }
    else {
        Folders.deleteFolder(req.query.id)
        res.send({
            status: true,
            message: 'folder deleted successfuly'
        });
    }
})

// Params : { user_id : 2 , page : 1}
rout.get('/all', async (req, res) => {
    const data = await Files.getAll(req.query.user_id, req.query.page)
    res.send({
        status: true,
        data
    })
})

// Params : { user_id : 2 , search : "search query"}
rout.get('/search', async (req, res) => {
    const data = await Files.search(req.query.page, req.query.search)
    res.send({
        status: true,
        data
    })
})


module.exports = rout; 