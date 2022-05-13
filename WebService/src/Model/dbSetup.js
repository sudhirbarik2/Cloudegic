const connection = require("../Utilities/connections")


let projectData = [
{
    pId:"P001",
    pName: "Project 1",
    pDescription: "Project 1’s Description",
    skillSet: ["ReactJs","Node js","Express Js","MongoDb"],
    noOfMembers: 2,
    isActive: true
},
{
    pId:"P002",
    pName: "Project 2",
    pDescription: "Project 2’s Description",
    skillSet: ["ReactJs","Node js","Express Js","MongoDb"],
    noOfMembers: 5,
    isActive: true
}
]
exports.userSetup = () => {
    return connection.getProjectCollection().then((myCollection) => {
        return myCollection.deleteMany().then(() => {
            return myCollection.insertMany(projectData).then((data) => {
                if (data) {
                    return "Insertion Successfull"
                } else {
                    throw new Error("Insertion failed")
                }                
            })
        })

    })
}