const fs = require('fs');
const sharp = require('sharp');
const imagemin = require('imagemin');
const imageminMozjpeg = require('imagemin-mozjpeg');

function getDestination(req, file, cb) {
  cb(null, '/dev/null');
}

function MyCustomStorage(opts) {
  this.getDestination = opts.destination || getDestination;
  this.getFileName = opts.filename;
  this.dimensions = opts.dimensions;
}

MyCustomStorage.prototype._handleFile = function _handleFile(req, file, cb) {
  // Get File Destination
  this.getDestination(req, file, (err, path) => {
    if (err) return cb(err);
    // Get Filename
    this.getFileName(req, file, async (error, filename) => {
      if (error) return cb(error);
      const outStream = fs.createWriteStream(`${path}/${filename}`);
      // Resize if wanted by user
      if (this.dimensions) {
        const { width, height } = this.dimensions;
        const resizer = sharp()
          .resize(width, height)
          .png();
        file.stream.pipe(resizer).pipe(outStream);
      } else {
        file.stream.pipe(outStream);
      }

      outStream.on('error', cb);
      outStream.on('finish', async function() {
        cb(null, {
          path,
          size: outStream.bytesWritten,
          filename,
        });
      });
    });
  });
};

MyCustomStorage.prototype._removeFile = function _removeFile(req, file, cb) {
  fs.unlink(file.path, cb);
};

module.exports = function(opts) {
  return new MyCustomStorage(opts);
};
