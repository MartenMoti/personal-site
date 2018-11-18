var express = require('express');
var app = express();
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

app.use(express.static(__dirname + '/static'));

app.use(bodyParser.urlencoded({
    extended: true
  }));

app.get('/', function(req, res) {
    res.render('index.ejs', {});
});

app.get('/contact', function(req, res) {
    res.render('contact.ejs', {});
});

app.post('/sendcontact', function(req, res) {
    let name = req.body.name;
    let email = req.body.email;
    let message = req.body.message;

    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'mailervoorberg@gmail.com', 
            pass: 'saywhatagain'
        }
    });

    let mailOptions = {
        from: 'mailervoorberg@gmail.com',
        to: 'martenvoorberg@gmail.com',
        subject: 'Message from ' + name,
        text: message
    };

    transporter.sendMail(mailOptions, function(err, info) {
        if (error) {
            res.status(500).send('An error occured whilst sending the email');
            console.log(error);
        }
    });

    res.render('sendcontact.ejs')
});

app.get('/about', function(req ,res) {
    res.render('about.ejs');
});

app.get('/portofolio', function(req, res) {
    res.render('portofolio.ejs');
});

app.listen(3000);