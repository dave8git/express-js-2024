const express = require('express');
const path = require('path');
const hbs = require('express-handlebars');
const multer = require('multer');
const app = express();

app.engine('.hbs', hbs()); // all files with .hbs extension should be rendered by handlebars engine
app.set('view engine', '.hbs'); // all our views will be using .hbs extension
const storage = multer.diskStorage({
  destination: './uploads',
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '_' + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage, 
  limits: { fileSize: 2000000 },
  fileFilter: (req, file, cb) => {
    checkFileType(file, cb); 
  }
}).single('myImage');

function checkFileType(file, cb) {
  const filetypes = /jpeg|jpg|png|gif/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);
  if(mimetype && extname) {
    return cb(null, true);
  } else {
    cb('Error: Images Only!');
  }
}
// app.use((req, res, next) => { // use jakby wprowadzi swoją własną nową metodę do wykonania pomiędzy odpowiedzą a zapytaniem (zapytaniem get, post itd...)
//     res.show = (name) => {
//         res.sendFile(path.join(__dirname, `/views/${name}`));
//     };
//     next(); 
// });

//app.engine('hbs', hbs({ extname: 'hbs', layoutsDir: './layouts', defaultLayout: 'main' })); --> that line configures hbs to look for main.handlebars layout in /layouts folder instead of /views/layouts as is by default

app.use(express.static(path.join(__dirname, '/public')));

app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.render('index'); // zanim odpowie co jest pod '/' użyje metody show 
});

app.get('/about', (req, res) => {
  res.render('about');
});

app.get('/contact', (req, res) => {
  res.render('contact');
});

app.get('/info', (req, res) => {
  res.render('info');
});

app.get('/history', (req, res) => {
  res.render('history');
});

app.post('/contact/send-message', (req, res) => {
  console.log('Form is submitted.');
  upload(req, res, (err) => {
    if (err) {
      console.log('File upload error:', err);
      return res.render('contact', { isError: true, errorMsg: err });
    }

    const { author, sender, title, message } = req.body;
    console.log('Form data:', req.body);  // This should log the form fields
    console.log('Uploaded file:', req.file);  // This should log the uploaded file

    if (author && sender && title && message) {
      console.log('All fields are present');
      res.render('contact', { isSent: true });
    } else {
      console.log('Some fields are missing');
      res.render('contact', { isError: true });
    }
  });
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