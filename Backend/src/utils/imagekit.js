const ImageKit = require('imagekit');

let imagekit;

const getImageKit = () => {
    if (!process.env.IMAGEKIT_PUBLIC_KEY || !process.env.IMAGEKIT_PRIVATE_KEY || !process.env.IMAGEKIT_URL_ENDPOINT) {
        throw new Error('ImageKit environment variables are missing');
    }

    if (!imagekit) {
        imagekit = new ImageKit({
            publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
            privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
            urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT
        });
    }

    return imagekit;
};

const uploadToImageKit = async (file, folder) => {
    const uploadResponse = await getImageKit().upload({
        file: file.buffer,
        fileName: `${Date.now()}-${file.originalname}`,
        folder
    });

    return uploadResponse.url;
};

module.exports = uploadToImageKit;
