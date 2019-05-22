require('dotenv').load();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./queries');
const authorizer = require('./authorizeMiddleware');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

app.use((req, res, next) => {
  if (req.method !== 'GET') return authorizer.authorize(req, res, next);
  return next();
});

app.post('/validate_auth', (req, res) => {
  res.status(200).json({ status: 200, msg: 'Password is correct.' });
});

app.get('/', (req, res) => {
  res.json({ info: 'Node.js, Express, and Postgres API' });
});

app.get('/locations', (req, res) => {
  db.getLocations()
    .then(locations => {
      res.status(200).json(locations);
    })
    .catch(err => {
      res.status(500).send(err);
    });
});

app.get('/cases', (req, res) => {
  const filter = {};
  const validFilters = ['species', 'age', 'LocationId', 'pathogen'];
  validFilters.forEach(f => {
    if (req.param(f) && req.param(f) !== '') filter[f] = req.param(f);
  });

  if (req.param('explorer') && req.param('explorer') === 'true') {
    const validGroupBys = ['age', 'pathogen', 'species', 'Location.name'];
    let groupBy = '';
    if (validGroupBys.includes(req.param('groupBy'))) groupBy = req.param('groupBy');
    db.getDataExplorerCases(filter, groupBy)
      .then(cases => {
        res.status(200).json(cases);
      })
      .catch(err => {
        console.log(err);
        res.status(500).send(err);
      });
  } else {
    db.getCases(req.param('page'), filter)
      .then(cases => {
        res.status(200).json(cases);
      })
      .catch(err => {
        res.status(500).send(err);
      });
  }
});
app.post('/cases', db.createCase);
app.delete('/cases', db.destroyCase);
app.put('/cases', db.updateCase);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App running on port ${PORT}.`);
});
