require('dotenv').load();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./queries');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

app.get('/', (req, res) => {
  res.json({ info: 'Node.js, Express, and Postgres API' });
});

app.get('/cases', (req, res) => {
  db.getCases(req.param('page'))
    .then(cases => {
      res.status(200).json(cases);
    })
    .catch(err => {
      res.status(500).send(err);
    });
});
app.post('/cases', db.createCase);
app.delete('/cases', db.destroyCase);
app.put('/cases', db.updateCase);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App running on port ${PORT}.`);
});
