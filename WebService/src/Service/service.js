const projService = {}
const userDB=require("../Model/model")
//Register as a new user
projService.addData = (projectData) => {
    return userDB.generateId().then((id)=>{
        projectData.pId=id;
        let date=new Date().getDate()
        let month=new Date().getMonth()
        let year=new Date().getFullYear()
        projectData.creationDate=date+"/"+month+"/"+year
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

projService.deleteProject = (pId) => {
    return userDB.deleteProj(pId).then((cancelData) => {
        if (cancelData == null) {
            let err = new Error("Project deletion faild")
                    err.status = 406
                    throw err
        }
        else {
        return cancelData;
            
        }
    })
}
projService.getSearch = (project) => {
    return userDB.searchProjects(project).then((searches) => {
        if (searches == null) {
            let err = new Error("No searched data")
                    err.status = 406
                    throw err
        }
        else {
           return searches;
            
        }
    })
}
projService.updateProject = (pId,data) => {
    return userDB.updateProj(pId,data).then((projData) => {
        if (projData == null) {
            let err = new Error("Project update faild")
                    err.status = 406
                    throw err
        }
        else {
        return projData;
            
        }
    })
}

module.exports = projService