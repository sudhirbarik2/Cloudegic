const projService = {}
const userDB=require("../Model/model")
//Register as a new user
projService.addData = (projectData) => {
    return userDB.generateId().then((id)=>{
        projectData.pId=id;
        return userDB.pushProject(projectData).then((prjData) => {
            if (prjData == null) {
                let err = new Error("Adding project failed !!!")
                err.status = 406
                throw err
            }
            else {
                return prjData;
            }
        })
    })
    
}
projService.getProjects = () => {
    return userDB.getAllProjects().then((projects) => {
        if (projects == null) {
            let err = new Error("No Projects found")
                    err.status = 406
                    throw err
        }
        else {
           return projects;
            
        }
    })
}

module.exports = projService