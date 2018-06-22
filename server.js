const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;

//register Express app
var app = express();
//set template engine
app.set('view engine', 'hbs');
//apply middleweare

app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        console.log('Unable to append to server.log');
    });
    next();

});
/* app.use((req, res, next) => {
    res.render('maintenance.hbs');
});s */
app.use(express.static(__dirname + '/public'));;
//register Handlebars partials and helpers
hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});
hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});
//set routes
app.get('/', (req, res) => {
    res.render('home.hbs', {
        pageTitle: 'Home',
        welcomeMessage: 'Welcome to my website',
    })
});
app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About',
        aboutMessage: 'Info about website',
    });
});

app.get('/projects', (req, res) => {
    res.render('projects.hbs', {
        pageTitle: 'Projects',
    });
});

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'Unable to handle request' 
    });
});
//set localhost port 
app.listen(3000, () => {
    console.log(`Server is up on port ${port}`);
});