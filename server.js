const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const PORT = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use((request, response, next) => {
    var now = new Date().toString();
    var accessLog =  `${now}: ${request.method} ${request.url}`;
    console.log(accessLog);
    fs.appendFile('server.log', accessLog + "\n", null, (err)=>{
        if(err)
            console.log('unable to append log. ' + err);
    });
    next();
});

app.use(express.static(__dirname + '/public'));

// app.use((request, response, next) => {
//
//     response.render('maintenance.hbs',{
//
//     });
// });



app.get('/', (request, response) => {
    //response.send("index express!");
    response.render('home.hbs', {
        'name':"Rohith Kodakandla",
        'copyRight':"2019"
    });
});

app.get('/hello', (request, response) => {
    //response.send("hello express!");
    response.send({name:'Rohith', birthDate:'01/01/1980'});
});

app.get('/error', (request, response) => {
    response.send("Unexpected error.");
});

app.get('/about', (request, response) => {
    response.render('about.hbs', {
        'name':"Rohith",
        'dob':"01/01/1980",
        'copyRight':"2019"
    });
});


app.get('/projects', (request, response) => {
    response.render('projects.hbs');
});


app.listen(PORT, () => console.log(`Server started successfully. Listening on port ${PORT}`));
