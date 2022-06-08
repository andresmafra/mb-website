const bodyParser = require('body-parser')
const express = require('express')
const app = express()

const JSON_LIMIT = '5mb'

// to support JSON-encoded bodies
app.use(bodyParser.json({ limit: JSON_LIMIT }))

// to support URL-encoded bodies
app.use(bodyParser.urlencoded({
  limit: JSON_LIMIT,
  extended: true
}))

// Template HTML and View Engine
app.engine('html', require('ejs').renderFile)
app.set('view engine', 'html')

//Public folder
app.use(express.static('public'))

// Static Assets Configuration
app.use('/assets', express.static('assets', {
  dotfiles: 'ignore',
  etag: false,
  index: false,
  maxAge: '1d',
  redirect: false,
  setHeaders: function (res, path, stat) {
    res.set('x-timestamp', Date.now())
  }
}))

// WebServer Pages
app.get('/', (req, res) => res.render('pages/index'))

// APIs
app.use('/brokers', require('./apis/controllers/brokersController'))

// App Listen and Start!
const PORT = process.env.PORT || 3000;
app.listen(PORT, function () {
  console.log(`mb listening on port ${PORT} `);
});