const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt-nodejs");
const knex = require('knex');

const register = require("./controllers/register");
const signin = require("./controllers/signin");
const profile = require("./controllers/profile");
const image = require("./controllers/image");

const db = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      port : 5432,
      user : 'postgres',
      password : '2682',
      database : 'facerecognition'
    }
  });

db.select("*").from("users").then(data => {
    console.log(data);
}); 

const app = express();
app.use(express.json());
app.use(cors());

const database = {
    users: [
        {
            id: "123",
            name: "John",
            email: "johndoe@gmail.com",
            password: "123456",
            entries: 0,
            joined: new Date()
        },
        {
            id: "124",
            name: "Kathy",
            email: "kathyrc@gmail.com",
            password: "654321",
            entries: 0,
            joined: new Date()
        }
    ]
}


app.get("/", (req,res) => {
    res.send("its working")
})

app.post("/signin", (req,res) => { signin.handleSignIn(req,res,db,bcrypt)});

app.post("/register", (req,res) => { register.handleRegister(req,res,db,bcrypt)});

app.get("/profile/:id", (req, res) => { profile.handleProfile(req,res,db)})

app.put("/image", (req,res) => { image.handleImage(req,res,db)})

app.post("/imageurl", (req,res) => { image.handleApiCall(req,res)})

app.listen(process.env.PORT || 3000, () => {
    console.log(`app is running on port ${process.env.PORT}`)
});

/*
/ --> res = this is working
/signin --> POST = success/fail
/register --> POST = user
/profile/:userId --> GET = user
/image --> PUT --> user 
*/