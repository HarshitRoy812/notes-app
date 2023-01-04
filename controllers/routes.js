const path = require('path');
const User = require('../models/User');
const Notes = require('../models/Notes');
const {registerSchema,loginSchema} = require('../validation/UserValidate');
const notesSchema = require('../validation/NoteValidate');
const encryptPassword = require('../validation/encryptPass');
const verifyPassword = require('../validation/verifyPass');
const jwt = require('jsonwebtoken');


const getLoginPage = (req,res) => {
    res.sendFile(path.join(__dirname,'../public/login.html'));
}

const getRegisterPage = (req,res) => {
    res.sendFile(path.join(__dirname,'../public/register.html'));
}

const registerUser = async (req,res) => {
   
        // Validate the user

        var validatedResult;
        
        try {
            validatedResult = await registerSchema.validateAsync(req.body);
        } catch (err){
            return res.status(403).json({msg : err.details[0].message})
        }
        
        // Check whether user has already been registed or not

        const userExists = await User.findOne({email : validatedResult.email});

        if (userExists){
            return res.status(403).json({msg : "User already registered ! Please Login."})
        }   
        // Encrypt the password before storing in the database

        const encryptedPassword = await encryptPassword(validatedResult.password);
        
        validatedResult.password = encryptedPassword;

        // Store the user in the database

        const user = await User.create(validatedResult);

        res.status(201).json({msg : 'User Registered Successfully !'});

    } 

const loginUser = async (req,res) => {

    var validatedResult;

    // Validate the provided user details for login
    try {
        validatedResult = await loginSchema.validateAsync(req.body);
    } catch (err){
        return res.status(403).json({msg : err.details[0].message})
    }


    // Check whether exists or not in the database
    const user = await User.findOne({email : validatedResult.email});

    
    if (!user){
        return res.status(404).json({msg : 'User does not exist ! Please Register.'})
    }


    // Check whether the password input by the user is correct or not
    const isValidPass = await verifyPassword(validatedResult.password,user.password);

    if (!isValidPass){
        return res.status(403).json({msg : 'Invalid Password ! Please try again.'})
    }
    
    // After successful login , assign the user with a token for further resource accesses

    const token = jwt.sign({userId : user._id,name : user.name},process.env.SECRET_KEY,{
        expiresIn : '30d'
    })

    res.status(200).json({msg : "Logged In !",token})
}

const authorizeUser = (req,res) => {
    res.send('OK');
}
const getDashboardPage = (req,res) => {
    res.sendFile(path.join(__dirname,'../public/dashboard.html'));
}

const getNotes = async (req,res) => {
    


    const userId = req.user.userId;

    const notes = await Notes.find({userId : userId});

    res.status(200).json({name : req.user.name,data : notes});

}


const addNote = async (req,res) => {

    
    var validatedResult;

    try {
        validatedResult = await notesSchema.validateAsync(req.body);
    } catch (err){
        return res.status(403).json({msg : err.details[0].message});
    }

    d = new Date();
    utc = d.getTime() + (d.getTimezoneOffset() * 60000);
    nd = new Date(utc + (3600000*+5.5));
    var ist =  nd.toLocaleString();

    var time = ist.split(' ')[1];
    time = time + " " + ist.split(' ')[2];

    validatedResult.createdAt = time;
    validatedResult.userId = req.user.userId;

    const note = await Notes.create(validatedResult);
    
    res.status(201).json(note);
}

const editNote = async (req,res) => {
    

    var validatedResult;

    const {noteID,title} = req.body;

    try {
        validatedResult = await notesSchema.validateAsync({title});
    } catch (err){
        return res.status(403).json({msg : err.details[0].message});
    }

    d = new Date();
    utc = d.getTime() + (d.getTimezoneOffset() * 60000);
    nd = new Date(utc + (3600000*+5.5));
    var ist =  nd.toLocaleString();

    var time = ist.split(' ')[1];
    time = time + " " + ist.split(' ')[2];

    validatedResult.createdAt = time;
    validatedResult.userId = req.user.userId;

    const editedNote = await Notes.findOneAndUpdate({_id : noteID},validatedResult,{
        new : true,
        runValidators : true
    })

    if (!editedNote){
        return res.status(404).json({msg : 'No note found'})
    }

    res.status(200).json({msg : editedNote});
}

const deleteNote = async (req,res) => {

    const {noteID} = req.body;

    const deletedNote = await Notes.findOneAndDelete({_id : noteID});

    if (!deletedNote){
        return res.status(404).json({msg : 'No note found'})
    }

    
    res.status(200).json({msg : deletedNote})


}

module.exports = {
    getLoginPage,
    getRegisterPage,
    registerUser,
    loginUser,
    authorizeUser,
    getDashboardPage,
    getNotes,
    addNote,
    editNote,
    deleteNote
}