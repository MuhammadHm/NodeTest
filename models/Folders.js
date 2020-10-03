const db = require("../config/database")

const addFolder = async (name, parentId, userId) => {
    console.log(name, parentId, userId)
    const res = await db.execute(`Insert into folder (name) values('${name}');`)
    const folderId = res[0].insertId;
    if (parentId == null) {
        db.execute(`Insert into user_folders (user_id,folder_id) values(${userId},${folderId});`)
            .then(res => {
                console.log(res)
            }).catch(err => {
                console.log(err)
            })
    }
    else {
        db.execute(`Insert into sub_folder (parent_id, chiled_id) values (${parentId},${folderId})`)
            .then(res => {
                console.log(res)
            }).catch(err => {
                console.log(err)
            })
    }
}

const deleteFolder = async (id) => {
    console.log(id)
    const subFolders = await db.execute(`Select * from sub_folder where chiled_id= ${id};`);
    // if folder is empty
    if (subFolders[0].length == 0) {
        db.execute(`Delete from folder where id = ${id};`)
            .then(res => {
                console.log(res)
            }).catch(err => {
                console.log(err)
            })
        db.execute(`Delete from sub_folder where chiled_id = ${id};`)
            .then(res => {
                console.log(res)
            }).catch(err => {
                console.log(err)
            })
    }
}

module.exports = {
    addFolder,
    deleteFolder
};