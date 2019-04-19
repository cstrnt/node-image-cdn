const fs = require('fs');
const sharp = require('sharp');

function getDestination(req, file, cb) {
  cb(null, '/dev/null');
}

function MyCustomStorage(opts) {
  this.getDestination = opts.destination || getDestination;
  this.getFileName = opts.filename;
  this.resize = opts.resize;
}

MyCustomStorage.prototype._handleFile = function _handleFile(req, file, cb) {
  const that = this;
  this.getDestination(req, file, function(err, path) {
    if (err) return cb(err);
    that.getFileName(req, file, (error, filename) => {
      if (error) return cb(error);
      const outStream = fs.createWriteStream(`${path}/${filename}`);
      if (that.resize) {
        const resizer = sharp()
          .resize(400, 400)
          .jpeg();
        file.stream.pipe(resizer).pipe(outStream);
      } else {
        file.stream.pipe(outStream);
      }

      outStream.on('error', cb);
      outStream.on('finish', function() {
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
