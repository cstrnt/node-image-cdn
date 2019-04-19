const express = require('express');
const fs = require('fs');
const { makeParser } = require('./FileParser');

function makeServer(dir) {
  const PORT = 5555;
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

  app.listen(PORT, () => {
    console.log(`LocalCDN listening on Port ${PORT}`);
  });
}

module.exports = { makeServer };
