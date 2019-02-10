const express = require('express');
const bodyParser = require('body-parser');
const db = require('./queries');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());

app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

app.get('/', (req, res) => {
  res.json({ info: 'Node.js, Express, and Postgres API' });
});

app.get('/cases', db.getCases);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App running on port ${PORT}.`);
});
