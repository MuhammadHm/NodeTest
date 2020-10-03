const db = require("../config/database")
const fs = require('fs');

const addFile = (file, folderId) => {
    const path = 'uploads/' + file.name;
    file.mv(path);
    db.execute(`Insert into file (name,path,folder_id) values('${file.name}','${path}',${folderId});`)
        .then(res => {
            console.log("success", res)
        }).catch(err => {
            console.log("error", err)
        })
}

const deleteFile = async (id) => {
    const filePath = await db.execute(`Select path from file where id= ${id}`);
    fs.unlink(`../${filePath[0][0].path}`);
    db.execute(`Delete from file where id = ${id};`)
        .then(res => {
            console.log("success", res)
        }).catch(err => {
            console.log("error", err)
        })
}

const getAll = async (userId, page) => {
    const items_per_page = 5;
    const offset = page * items_per_page;
    const res = await db.execute(`Select * from user_folders where user_id = ${userId} LIMIT ${offset}, ${items_per_page};`)
    const subFolders = [];
    const files = [];
    getChilds(res[0], subFolders, files);
    return {
        userFolders: res[0],
        subFolders,
        files
    };
}

const getChilds = async (folders, subFolders, files) => {
    if (folders.length != 0) {
        folders.forEach(async (item, index) => {
            const newSubFolders = await db.execute(`Select * from folder where id = ${item.folder_id} ;`)
            const newFiles = await db.execute(`Select * from file where folder_id = ${item.folder_id} ;`)
            subFolders.push(newSubFolders[0]);
            files.push(newFiles[0]);
            await getChilds(newSubFolders[0], subFolders, files);
        })
    }
    return;
}

const search = async (page, search) => {
    const items_per_page = 5;
    const offset = page * items_per_page;
    const res = await db.execute(`Select * from folder where name = ${search} LIMIT ${offset}, ${items_per_page};`)
    const files = await db.execute(`Select * from file where name = ${search} LIMIT ${offset}, ${items_per_page};`)
    const subFolders = [];
    res[0].forEach(async (item, index) => {
        subFolders = await db.execute(`Select * from folder where id = ${item.folder_id} ;`)
    })
    return {
        searchFolder: res[0],
        subFolders,
        files
    };
}

module.exports = {
    addFile,
    deleteFile,
    getAll,
    search,
};