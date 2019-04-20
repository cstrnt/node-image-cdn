const multer = require('multer');
const crypto = require('crypto');
const fs = require('fs');
const myCustomStorage = require('./StorageEnginge');

function makeParser(options = { storagePath: 'uploads/' }) {
  const { storagePath, dimensions } = options;

  // Check if Path exists
  if (!fs.existsSync(storagePath)) {
    fs.mkdirSync(storagePath);
  }

  const storage = myCustomStorage({
    destination(req, file, cb) {
      cb(null, storagePath);
    },
    filename(req, file, cb) {
      const hash = crypto.createHash('sha256');
      const fileName = hash.update(
        `${file.originalname}${file.size}${Date.now()}`
      );
      cb(null, `${fileName.digest('hex')}.png`);
    },
    dimensions,
  });

  return multer({ storage });
}
module.exports = { makeParser };
