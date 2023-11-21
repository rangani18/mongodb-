const express = require('express');
const port = 8003;
const app = express();
const path = require('path');
// const db= require("./config/mongoose");
const mongoose = require('mongoose');
mongoose.connect("mongodb+srv://khushalirangani18:khushi123@cluster0.qmmrbeb.mongodb.net/node-khushi", {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("MongoDB Connected…")
  })
  .catch(err => console.log(err))
const Student = require('./models/Student');
const fs=require('fs');
app.use(express.urlencoded());
app.use('/uploads',express.static(path.join(__dirname,"uploads")));
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));

app.use('/',require('./routes'));
app.use('/post',require('./routes/post'));

app.listen(port,(err)=>{
    if(err) console.log("something wrong");
    console.log(`server is connected succesfuly : ${ port}`);
})