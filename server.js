const express = require('express');
const path = require('path');
const hbs = require('express-handlebars');
const app = express();

app.engine('.hbs', hbs()); // all files with .hbs extension should be rendered by handlebars engine
app.set('view engine', '.hbs'); // all our views will be using .hbs extension

// app.use((req, res, next) => { // use jakby wprowadzi swoją własną nową metodę do wykonania pomiędzy odpowiedzą a zapytaniem (zapytaniem get, post itd...)
//     res.show = (name) => {
//         res.sendFile(path.join(__dirname, `/views/${name}`));
//     };
//     next(); 
// });

app.use(express.static(path.join(__dirname, '/public')));

app.get('/', (req, res) => {
    res.render('index', { layout: false }); // zanim odpowie co jest pod '/' użyje metody show 
});

app.get('/about', (req, res) => {
  res.render('about', { layout: false });
});

app.get('/contact', (req, res) => {
  res.render('contact', { layout: false });
});

app.get('/info', (req, res) => {
  res.render('info', { layout: false });
});

app.get('/history', (req, res) => {
  res.render('history', { layout: false });
});

app.get('/hello/:name', (req, res) => {
  //res.send(`Hello ${req.params.id}`);
  res.render('hello', {layout: false, name: req.params.name });
})

// app.get('/style.css', (req, res) => {
//     res.sendFile(path.join(__dirname, '/style.css'));
// });

// app.get('/test.jpg', (req, res) => {
//     res.sendFile(path.join(__dirname, '/test.png'));
// });

app.use((req, res) => { 
    res.status(404).send('404 not found...'); // nie potrzeba funkcji next() kiedy adres jest niewłaściwy aplikacja nie idzie dalej
})

app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});