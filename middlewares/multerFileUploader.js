const express = require("express");
const multer = require('multer')
const path = require('path')



const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './images/profileimages')
    },
    filename: function (req, file, cb) {
        const fileName = Math.round(Date.now())
        cb(null, fileName + '-' + file.originalname)
    }
})

function Filter(req, file, cb) {
    if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
      cb(null, true

      );
    } else {
        cb(null, false 

        );
    }
}

uploadFiles = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 10
    },
    fileFilter : Filter
})

module.exports = uploadFiles;