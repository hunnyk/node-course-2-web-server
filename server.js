const express = require('express');
const hbs = require('hbs');
const fs =require('fs');
var app = express();

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs');

app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;

    console.log(log);
    fs.appendFile('server.log', log + '\n');
    next();
});

//For Site being in maintenance
// app.use((req, res, next) => {
//   res.render('maintenance.hbs');
// });


hbs.registerHelper('currentyear',()=>{
    return new Date().getFullYear();
});

hbs.registerHelper('screamit',(text)=>{
    return text.toUpperCase();
});

app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) {
   // res.send('Hello World');
    res.render('home.hbs',{
        pagetitle:"Home Page",
        welcomemessage:"Welcome to the home page",
        //currentyear:new Date().getFullYear()
    });
});

app.get('/about', function (req, res) {
    //res.send('About Page');
    res.render('about.hbs',{
        pagetitle:"About Page",
        currentyear:new Date().getFullYear()
    });
});

app.get('/projects',function(req,res){
    res.render('projects.hbs',{
        pagetitle:"Project Page",
        projectmessage:"Dsiplay aLl projects"
    });
});

// /bad - send back json with errorMessage
app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'Unable to handle request'
    });
});


var server = app.listen(8081, function () {
    var host = server.address().address
    var port = server.address().port

    console.log("Example app listening at http://%s:%s", host, port)
})
