// -------------------------------------Imports Start ----------------------------------------

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const ejs = require('ejs');
const session = require('express-session');
const bcrypt = require('bcrypt');
const secretKey = "jh23ij7dv2762354&*2131";
// -------------------------------------Imports End ----------------------------------------

// ---------------------------------------- Database -----------------------------------------------
const dUrl = 'mongodb+srv://admin:Rd2lW5Hy3bOe1sXM@atlascluster.l14gp7p.mongodb.net/?retryWrites=true&w=majority'

mongoose.connect(dUrl).then(()=>{
    console.log("Database is connected");
}).catch((error)=>{
    console.log("This is the Error while Connection : ", error);
})

// Create a User schema
const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['MEMBER', 'LIBRARIAN'], default: 'MEMBER' },
});
    
// Hash the password before saving it to the database
userSchema.pre('save', async function (next) {
    const user = this;
    if (!user.isModified('password')) return next();
    
    try {
        const hash = await bcrypt.hash(user.password, 10);
        user.password = hash;
        next();
    } catch (error) {
        return next(error);
    }
});
// Create a User model
const User = mongoose.model('User', userSchema);

// ---------------------------------------- Database Code end ---------------------------------------

// ----------------------------------------- Middleware Start-------------------------------------
const app = express();
app.use(express.static('public'));
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

// ----------------------------------------- Middleware End ------------------------------------

// ------------------------------------- Writing Api from here --------------------------------
app.get('/', (req, res)=>{
    res.render('Login.ejs', {message: "WelCome"});
})

app.get('/signup', (req, res)=>{
    res.render('signup.ejs');
})

app.get('/dashboard', (req, res)=>{
    res.render('dashboard.ejs');
})

app.post('/signing', async (req, res)=>{
    const { email, password, role } = req.body;
    console.log("got the email and password", email, password, role);
    try {
        // Check if email already exists
        const userExist = await User.findOne({ email });
        if (userExist) {
            return res.redirect('/signup', { message: 'User already exists with this email' });
        }

        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user object
        const newUser = new User({
        email,
        password: hashedPassword,
        role: role.toUpperCase(), // Ensure consistent case
        });

        // Save the new user to the database
        await newUser.save();

        // Send success message or redirect to login page
        res.redirect('/login', { message: 'Account created successfully! Please log in' });
    } catch (err) {
        console.error(err);
        return res.redirect('/signup', { message: err.message });
    }
})

app.post('/loging', async(req, res)=>{
    const { email, password, role} = req.body;

    try{
        const userExist = User.findOne({email:email});
        if(!userExist){
            return res.redirect('/', {message: "User Not Found"});
        }
    
        if(role.toUpperCase() === userExist.role){
            return res.json({message : "User Role is not match "});
        }

        const isUserCredentialsTrue = await bcrypt.compare(password, userExist.password);
        if (isUserCredentialsTrue) {
            const user = {id: 1, email: email, role: role.toUpperCase()};
            const token = jwt.sign(user, secretKey, { expiresIn: '1h' });
            res.cookie('Authorization', `Bearer ${token}`, { httpOnly: true });
            res.redirect('/dashboard'); // Example: Redirect to the dashboard page
        } else {
            res.redirect('/', { message: 'Invalid credentials'});
        }
    }catch(err){
        return res.redirect('/', {message: err.message});
    }
});


// ------------------------------------------- End Api from here -----------------------------------
app.listen(7000, ()=>{
    console.log("http://localhost:"+7000+"/");
})
