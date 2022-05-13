const connection = require("../utilities/connections")
const usersDB = {}


usersDB.pushProject=(prj)=>{
    return connection.getProjectCollection().then((collection) => {
        return collection.create(prj).then((data) => {
            if (data)
                return data;
            else
                return null;
        })
    })
}
usersDB.getAllProjects=()=>{
    return connection.getProjectCollection().then((collection) => {
        return collection.find({}, { _id: 0}).then((p) => {
            if (p!=null)
                return p;
            else
                return null;
        })
    })
    
}
//-------------------------------------------------------------------------
usersDB.generateId = () => {
    let matches=[]
    return connection.getProjectCollection().then((model) => {
        return model.distinct("pId").then((ids) => {
            console.log(ids);
            ids.map((id)=>{
                numId=parseInt(id.match(/(\d+)/))
                matches.push(numId);    
            })
            return("P00"+(Math.max(...matches)+1));           
        })
    })
}
module.exports = usersDB;