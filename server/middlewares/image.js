const { Storage } = require('@google-cloud/storage');
const crypto = require('crypto');
const multer = require('multer');
const path = require('path');

const storage = new Storage({
  projectId: process.env.GCLOUD_PROJECT,
  keyFilename: process.env.KEYFILE_PATH
})

const bucket = storage.bucket(process.env.CLOUD_BUCKET);

function getPublicUrl (filename) {
  return `https://storage.googleapis.com/${process.env.CLOUD_BUCKET}/${filename}`;
}



  const sendUploadToGCS = (req, res, next) => {
    if (!req.file) {
      return next();
    }

    const original = path.parse(req.file.originalname).name;
    const hash = crypto.createHash('md5').update(original).digest('hex');
    const gcsname = `upload/product-${hash}-${Date.now()}${path.extname(req.file.originalname)}`;
    const file = bucket.file(gcsname);
  
    const stream = file.createWriteStream({
      metadata: {
        contentType: req.file.mimetype
      }
    });
  
    stream.on('error', (err) => {
      req.file.cloudStorageError = err;
      next(err);
    });
  
    stream.on('finish', () => {
      req.file.cloudStorageObject = gcsname;
      file.makePublic().then(() => {
        req.file.cloudStoragePublicUrl = getPublicUrl(gcsname);
        next();
      });
    });
  
    stream.end(req.file.buffer);
  };
    
  const upload = multer({
    storage: multer.MemoryStorage,
    limits: {
      fileSize: 10 * 1024 * 1024
    },
  });

  module.exports = {
    sendUploadToGCS,
    upload,
  }



