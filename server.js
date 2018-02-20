const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();
hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs');

app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err)=>{
        if(err){
            console.log('Unable to append to teh file');
        }
    })
    next();
});

// app.use((req, res, next) => {
//     res.render('maintenance.hbs');
// })

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (data)=> {
    return data.toUpperCase();
});


app.get('/', (req, res) => {
    // res.send('<h1>Hello Express!</h1>');
    res.render('home.hbs', {
        name: 'Charu',
        age: 22,
        interests: 'Travelling',
        welcome: 'Hello, welcome ot our pageeee!!',
        title: 'Home Page via Server.js',

    })
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        title: 'About Page via Server.js',
    });
});

app.get('/bad', (req, res) => {
    res.send({
        code: 400,
        status: 'Bad Request'
    });
});

app.listen(3000, ()=>{
    console.log('Server is up on port 3000!!');
});
