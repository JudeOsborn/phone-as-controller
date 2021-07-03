const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const port = 8080;
const staticFiles = 'public';

app.use(express.static(staticFiles));

app.get('*', function response(req, res) {
  res.sendFile('remote.html', { root: __dirname + '/' + staticFiles});
});

server.listen(port, '0.0.0.0', function onStart(err) {
  if (err) {
    console.log(err);
  }

  console.info('Open http://0.0.0.0:%s in your browser to view the remote.', port);
});
