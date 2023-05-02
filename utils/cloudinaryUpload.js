const fs = require('fs')
const cloudinary = require('cloudinary').v2;


// upload file to cloudnary storage 
async function uploadToCloudinary(locaFilePath,fileName) {
    // locaFilePath :
    // path of image which was just uploaded to "uploads" folder
    var mainFolderName = `mystore/images/profileimages`
    return cloudinary.uploader.upload(locaFilePath,{folder: mainFolderName})
    .then((result) => {
      // Image has been successfully uploaded on cloudinary
      // So we dont need local image file anymore
      // Remove file from local uploads folder 
      console.log(result)
      fs.unlinkSync(locaFilePath)   
      return {
        message: "Success",
        url:result.secure_url
      };
    }).catch((error) => {
      // Remove file from local uploads folder 
      console.log(error)
      fs.unlinkSync(locaFilePath)
      return {message: "Fail",};
    });
  }

module.exports= uploadToCloudinary;