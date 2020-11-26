const config = require('./config/main.json')

const express = require('express')
const cors = require('cors');
const bodyParser = require('body-parser')
const db = require('./queries')

process.on('uncaughtException', function (err) {
  console.error(err);
});

const app = express()

const port = process.env.PORT || config.port;

var rawBodySaver = function (req, res, buf, encoding) {
  if (buf && buf.length) {
    req.rawBody = buf.toString(encoding || 'utf8');
  }
}

app.use(function(req, res, next) {
       res.header("Access-Control-Allow-Origin", "*");
       res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
       res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
          next();
    });
app.use(bodyParser.json({ verify: rawBodySaver }));
app.use(bodyParser.urlencoded({ verify: rawBodySaver, extended: true }));
app.use(bodyParser.raw({ verify: rawBodySaver, type: function () { return true } }));

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.get('/', (request, response) => {
  response.json({info:"yo!"})
})


app.get('/getMovies', cors(), db.getMovies)
app.get('/getMovie/:movieId', cors(), db.getMovie)
app.post('/addMovie', cors(), db.addMovie)
app.put('/updateMovie/:movieId', cors(), db.updateMovie)
app.delete('/deleteMovie/:movieId', cors(), db.deleteMovie)


app.use(function(error, req, res, next) {
  // Will get here
  res.json({ message: error.message });
});

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})
