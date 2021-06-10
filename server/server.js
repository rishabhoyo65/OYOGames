const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const User = require('./model/user');
const Question = require("./model/question");
const Location = require("./model/location");



const app = express();
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());
app.use(express.static(path.join(__dirname, '../build')));

mongoose
    .connect(
        "mongodb+srv://rishabhju65:manna1998@cluster0.mmhcn.mongodb.net/oyogame?retryWrites=true&w=majority", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    })
    .then(() => console.log('DB Connected Successfully'))
    .catch(err => console.log(err));

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});


app.all('*', function (req, res, next) {
    if (req.url.startsWith('/api/')) return next();
    res.sendFile(path.join(__dirname, '../build', 'index.html'));
})

app.post("/api/signin",(req,res) => {
    const { email, password } = req.body;
    User.findOne({ email }, async (err, user) => {
        if (err || !user) {
            const profileName = email.split('@')[0]
            const newUser = new User({
                email: email,
                password: password,
                userName: profileName
            });
            const savedUser = await newUser.save();
            if (!savedUser) {
                return res.status(400).json({
                    error: "User with that email does not exist.",
                });
            } else {
                return res.json({ userId: savedUser.id, userName: savedUser.userName, score : savedUser.score , spinLeft : savedUser.spinLeft});
            }
        }
        if (!user.authenticate(password)) {
            return res.status(401).json({
                error: "Password is incorrect",
            });
        }
        return res.json({ userId: user.id, userName: user.userName, score : user.score , spinLeft : user.spinLeft});
    });
})

app.get("/api/locations",async (req,res) => {
    const locations = await Location.find({}).lean();
    res.status(200).json(locations);
})

app.get("/api/question",async (req,res) => {
    let locationId = req.query.locationId;
    let userId = req.query.userId;
    const user = await User.findById(userId);
    if(!user) {
        return res.status(400).json({
            error: "User with that email does not exist.",
        });
    }
    const question = await Question.aggregate([{$match: { locationId : locationId, _id : { $ne : user.lastQuestion}}},{$sample: {size: 1}}]);
    res.status(200).json({question : question});
})

app.get("/api/leaderboard",async (req,res) => {

    User.find({}, function(err, result) {
      if (err) {
        console.log(err);
      } else {
        res.json(result);
        console.log("here");
      }
    })
    .sort({ score: -1 });

    console.log("here");
})

app.post("/verify-answer",async (req,res) => {
    let answer = req.body.answer;
    let questionId = req.body.id;
    let currentUser;

    Question.findOne({_id : questionId},async (err, question)=>{
        if(err || !question){
            console.log("No such question exists");
        }
        
        let score = currentUser.score;
        if(question.answer == answer){
            score+=1;
        }
        await User.findByIdAndUpdate({_id:currentUser.id},{
            score:score,
            lastQuestion:question.id
        });
    })

    res.status(200).json({message:"Your response was successfully stored"});

})

app.listen(5000);