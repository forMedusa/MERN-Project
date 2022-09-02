const express= require('express');
const cors= require('cors');
const bodyparser= require('body-parser');
require('dotenv').config();
var objectId= require('mongodb').ObjectID;
const mongoose=require('mongoose');
const e = require('express');
const { MongoClient }= require('mongodb');
const { query } = require('express');
var coroptions={
    origin: "http://localhost:3000"
};
const app=express();

app.use(express.json());
app.use(function(req,res,next){
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
})
app.use(cors());
app.use(bodyparser.json());

const port = process.env.PORT || 3001;
// Database Connection
const url=`mongodb+srv://Xyzsor:Smackthat%40369@cluster0.dm362or.mongodb.net/?retryWrites=true&w=majority`;
//mongoose.connect(`mongodb://localhost:27017/college-project`);
const client= new MongoClient(url);
client.connect();
mongoose.connect(url);
mongoose.connection.once('open', () => console.log("Successfully connected to Database!"))
.on('error', (error) => {
    console.log('Mongoose Connection Warning!', error);
});

app.listen(port,()=>{
    console.log('server running');
})

// USER SCHEMA
const userSchema =  mongoose.Schema({
    name: String,
    email: String,
    pass: String,
    age: Number,
    ph:Number,
    dob:String,
    gender:String
  });
  const user = mongoose.model('User', userSchema);

  //POST API USER
app.post('/signup', async (req, res) => { //
     const {name, email, pass,age,ph,dob,gender}= req.body
    const data = new user({ //
        name: req.body.name,//
        email: req.body.email,//
        pass: req.body.pass,
        age: req.body.age,
        ph:req.body.ph,
        dob:req.body.dob,
        gender:req.body.gender//
    })
    user.findOne({email: email}, (err,user)=>{
        if(user){
            res.send({message : "User already Exists!"})
            f=1;
        }
        else{
            val= data.save(err =>{
                if(err){
                    res.send({message: "Error occured"})
                }else{
                    res.send({message: "Data Inserted in Database"})
                    console.log("Data Inserted in Database");
                }
            })
        }
    })
})//

// API
app.post("/login", async(req,res)=>{
    console.log("aaya")
    const {email,pass}=req.body
    user.findOne({email: email}, (err,user)=> {
        if(user){
            console.log("chal jaa")
            if(pass==user.pass){
                res.send({message: "Login Successful", user:user})
            }
            else{
                res.send({message: "Incorrect Password"})
            }
        }
        else{
            res.send({message: "User not found"})
        }
    }).catch(err => {
        console.log("yahii to hai",err);
    })
})


app.get("/read", (req,res)=>{
    user.find({},(err,result)=>{
        if(err){
            res.send(err);
        }
        else{
            res.send(result);
        }
    })
})
