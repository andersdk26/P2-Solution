import { createServer } from 'node:http';
import fs from 'node:fs';
import url from 'node:url';
var a = 2;

const hostname = '127.0.0.1';
const port = 3000;

const server = createServer((req, res) => {
    var query = url.parse(req.url, true);
    if (query.pathname === '/' || query.pathname === '') {
        query.pathname = '/index.html';
    }
    fs.readFile(`../test${query.pathname}`, function (err, data) {
        if (err) {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.write('404 Not Found');
            console.log(err + '\nurl: ' + query.pathname);
            return res.end();
        }
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(data);
        return res.end();
    });
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
