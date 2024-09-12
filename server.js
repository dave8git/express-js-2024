const express = require('express');
const path = require('path');

const app = express();

app.use((req, res, next) => { // use jakby wprowadzi swoją własną nową metodę do wykonania pomiędzy odpowiedzą a zapytaniem (zapytaniem get, post itd...)
    res.show = (name) => {
        res.sendFile(path.join(__dirname, `/views/${name}`));
    };
    next(); 
});

app.use(express.static(path.join(__dirname, '/public')));

app.get('/', (req, res) => {
    res.show('index.html'); // zanim odpowie co jest pod '/' użyje metody show 
});

app.get('/about', (req, res) => {
  res.show('about.html');
});

app.get('/contact', (req, res) => {
  res.show('contact.html');
});

app.get('/info', (req, res) => {
  res.show('info.html');
});

app.get('/history', (req, res) => {
  res.show('history.html');
});

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