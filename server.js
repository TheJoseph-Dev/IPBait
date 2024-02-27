var express = require('express');
var app = express();
const requestIp = require('request-ip')
//var nodemailer = require('nodemailer');

const port = 3000
console.log('Server is running...');

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader("Content-Security-Policy", "default-src 'self'; img-src https://c.tenor.com 'self'; style-src 'self' 'unsafe-inline'; script-src 'self' 'unsafe-inline'; frame-ancestors 'self'; form-action 'self';");
    return next();
});

/*
var transporter = nodemailer.createTransport({
    service: 'Hotmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD
    }
  });
  

  async function sendIpToEmail(email, ip) {
        console.log("Tried to send email with: " + email);

        var mailOptions = {
            from: email,
            to: email,
            subject: 'IP Adress',
            text: 'The IP Adress: ' + ip
        };
      
        await transporter.sendMail(mailOptions);
  }
  */

function printIP(req) {
    var clientIp = requestIp.getClientIp(req)
    console.log("The client PUBLIC IP >>> " + clientIp);
}

function getEndpointPath(endpoint) {
    var path = require('path');
    var filePath = "./Endpoints/" + endpoint;
    var resolvedPath = path.resolve(filePath);
    console.log(resolvedPath);
    return resolvedPath;
}

// Routes
app.get('/', (req, res) => {
    printIP(req);
    var path = require('path');
    var filePath = "./Endpoints/index.html";
    var resolvedPath = path.resolve(filePath);
    console.log(resolvedPath);
    res.sendFile(resolvedPath);
});

app.get('/imagem.jpg', (req, res) => {
    printIP(req);
    //sendIpToEmail(process.env.EMAIL, requestIp.getClientIp(req));
    res.sendFile(getEndpointPath("index.html"));
});

// Initialize server
app.listen(port, () => {
    console.log("Running on port 3000.");
});

// Export the Express API
module.exports = app;