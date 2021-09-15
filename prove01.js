const http = require('http');

const server = http.createServer((req, res) => {
    console.log(req.url, req.method, req.headers);
    // process.exit(); Hard exits the event loop
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>First server</title></head>');
    res.write('<body><h1>Hello! Let us see how this Node.js stuff works!</h1></body>');
    res.write('</html>');
    res.end();
});

server.listen(3000);