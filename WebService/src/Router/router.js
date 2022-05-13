const express = require('express');
const router = express.Router();
const Project=require("../Model/BeanClasses/projectdata")
const setupDb=require("../Model/dbSetup")
const projectservice=require("../Service/service")

//Router to clear the DB and put some initial value on it
router.get("/setup", (req, res, next) => {
    setupDb.userSetup().then((data) => {
        res.send(data)
        res.status=200;
    }).catch(err => next(err));
})
//Router to get all the project data

router.get('/projects', function (req, res, next) {    
    projectservice.getProjects().then(function (projects) {
        res.json(projects);
        res.status=200;
    }).catch(err => next(err));
})

//Router to add new data to DB
router.post('/addData', function (req, res, next) {    
    const project=new Project(req.body)
    projectservice.addData(project).then(function (projDetails) {
        res.json(projDetails);
        res.status=200;
    }).catch(err => next(err));
})
//Router to Modify project data to DB
module.exports = router;
