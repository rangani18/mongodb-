const express = require('express');

const routes = express.Router();

const admincontroller = require('../controllers/admincontroller')

const Student = require('../models/Student');

routes.get('/',admincontroller.adddetails);

routes.get("/view_details",admincontroller.view_details)

routes.post("/addstudent",Student.uploadImage,admincontroller.addstudent);

routes.get('/deleteRecord/:id',admincontroller.deleteRecord);

routes.get('/updateRecord/:id',admincontroller.updateRecord);

routes.post('/updatestudent',Student.uploadImage,admincontroller.updatestudent)

module.exports = routes;