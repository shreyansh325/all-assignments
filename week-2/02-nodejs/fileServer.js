/**
  You need to create an express HTTP server in Node.js which will handle the logic of a file server.
  - Use built in Node.js `fs` module

  The expected API endpoints are defined below,
  1. GET /files - Returns a list of files present in `./files/` directory
    Response: 200 OK with an array of file names in JSON format.
    Example: GET http://localhost:3000/files

  2. GET /file/:filename - Returns content of given file by name
     Description: Use the filename from the request path parameter to read the file from `./files/` directory
     Response: 200 OK with the file content as the response body if found, or 404 Not Found if not found. Should return `File not found` as text if file is not found
     Example: GET http://localhost:3000/file/example.txt

    - For any other route not defined in the server return 404

    Testing the server - run `npm run test-fileServer` command in terminal
 */

const fs = require('fs');
const path = require('path');

const filesDirpath = path.join(__dirname, 'files');

function listFilesDir(req, res){
  fs.readdir(filesDirpath, encoding = 'utf-8', (err, files) => {
    if(err)
      throw err;
    return res.json(files);
  });
}

function getFileContent(req, res){
  const filename = req.params.filename;
  const filepath = path.join(filesDirpath, filename);
  if(!fs.existsSync(filepath))
    return res.status(404).send('File not found');
  fs.readFile(filepath, (err, data) => {
    if(err)
      throw err;
    return res.send(data);
  });
}

function handleError(req, res, next){
  try {
    next();
  } catch (error) {
    console.log(error);
    res.status(500).send();
  }
}

const express = require('express');
const app = express();
const port = 3000;

app.get('/files', listFilesDir);
app.get('/file/:filename', getFileContent);
app.use(handleError);
app.use((req, res)=>{res.status(404).send('Route not found')});

// app.listen(port, console.log("Server listening at port "+port));
module.exports = app;
