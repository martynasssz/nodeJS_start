const http = require('http'); //looks for a global module //imported
const fs = require('fs'); //alows work with file system


const server = http.createServer( (req, res) => { //http. this is haw we access functions or so-called methods and properties on oject in JS (http object is imported from http module)
    const url = req.url;
    const method = req.method;
    if (url === '/') { //if this url match slash /
        res.write('<html>');
        res.write('<head><title> Message</title></head>');
        res.write('<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Sent</button></form></body>');
        res.write('</html>');
        return res.end(); //when is return the code witch are down after this return won't be excuted //retunt quit function executing
    }

    if (url === '/message' && method === 'POST') { //we want to be sure, that we hangling a GET request
        fs.writeFileSync('message.txt', 'DAMMY');
        res.statusCode = 302; //302 stand for redirection
        res.setHeader('Location', '/');
        return res.end();
    }
    res.setHeader('Content-Type', 'text/html');  //this method allows to set a header for response
    res.write('<html>');
    res.write('<head><title> My First Page</title></head>');
    res.write('<body><h1>Hello from Node.js Server!</h1></body>')
    res.write('</html>');
    res.end(); //done with creating that response
}); 

server.listen(3000);