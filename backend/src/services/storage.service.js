const ImageKit = require("imagekit");
const { model } = require("mongoose");

const imageKit = new ImageKit({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT
}); 

async function uploadFile(file, fileName) {
    const result = await imageKit.upload({
        file: file,
        fileName: fileName
        
    })

    // return the url of the uploaded file
    return result;
}

module.exports = {
    uploadFile
}

