const http = require('http'); //looks for a global module //imported


const server = http.createServer( (req, res) => { //http. this is haw we access functions or so-called methods and properties on oject in JS (http object is imported from http module)
    console.log(req.url, req.method, req.headers); //watch what insise there methods url, method, headers
    //process.exit(); //hard exit event loop
    res.setHeader('Content-Type', 'text/html');  //this method allows to set a header for response
    res.write('<html>');
    res.write('<head><title> My First Page</title></head>');
    res.write('<body><h1>Hello from Node.js Server!</h1></body>')
    res.write('</html>');
    res.end(); //done with creating that response
}); 

server.listen(3000);