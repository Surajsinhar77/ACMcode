const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const ejs = require('ejs');
const session = require('express-session');


const app = express();
const dUrl = 'mongodb+srv://admin:Rd2lW5Hy3bOe1sXM@atlascluster.l14gp7p.mongodb.net/?retryWrites=true&w=majority'

mongoose.connect(dUrl).then(()=>{
    console.log("Database is connected");
}).catch((error)=>{
    console.log("This is the Error while Connection : ", error);
})

app.use(cors());
app.use(express.json());

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(session({
    secret: 'beteyourname123is@Abhay',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } 
}));

// ------------------------------- Writing Api from here ---------------------------------
app.get('/', (req, res)=>{
    res.render('Login.ejs', {message: "hello people"});
})

app.get('/signup', (req, res)=>{
    res.render('signup.ejs');
})

app.get('/dashboard', (req, res)=>{
    res.render('dashboard.ejs');
})

// --------------------------------- End Api from here -----------------------------------
app.listen(7000, ()=>{
    console.log("http://localhost:"+7000+"/");
})
