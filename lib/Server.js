const express = require('express');
const fs = require('fs');
const { makeParser } = require('./FileParser');

function makeServer({ dir = 'uploads', port = 5555 }) {
  try {
    const app = express();
    app.use('/cdn', express.static(dir));
    app.use(express.static('frontend'));

    const upload = makeParser({
      storagePath: dir,
      addExtention: false,
    });

    app.post('/', upload.single('avatar'), (req, res) => {
      res.send(`http://localhost:5555/cdn/${req.file.filename}`);
    });

    app.get('/all', (req, res) => {
      res.send(
        fs.readdirSync(dir).map(name => `http://localhost:5555/cdn/${name}`)
      );
    });

    app.listen(port, () => {
      console.log(`LocalCDN listening on Port ${port}`);
    });
  } catch (err) {
    console.error(err);
  }
}

module.exports = { makeServer };
