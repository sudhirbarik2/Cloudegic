const connection = require("../utilities/connections")
const usersDB = {}


usersDB.pushProject = (prj) => {
    return connection.getProjectCollection().then((collection) => {
        return collection.create(prj).then((data) => {
            if (data)
                return data;
            else
                return null;
        })
    })
}
usersDB.getAllProjects = () => {
    return connection.getProjectCollection().then((collection) => {
        return collection.find({}, { _id: 0 }).then((p) => {
            if (p != null)
                return p;
            else
                return null;
        })
    })

}

usersDB.deleteProj = (pId) => {
    return connection.getProjectCollection().then((collection) => {
        return collection.deleteOne({ "pId": pId }).then((removedData) => {
            if (removedData)
                return removedData;
            else
                return null;
        })
    })
}

usersDB.searchProjects = (project) => {
    console.log(project);
    let dest = project[0].toUpperCase() + project.slice(1)
    let mergedArray = []
    return connection.getProjectCollection().then((collection) => {
        return collection
            .find({
                $or: [
                    { "pName": { $regex: dest,$options:'i' } },
                    { "pDescription": { $regex: dest,$options:'i' } }
                ]
            })
    }).then((destination) => {
        if (destination) {
            destination.map((dest) => {
                mergedArray.push(dest)
            })
        } return mergedArray

    })

}
usersDB.updateProj = (pId,data) => {
    return connection.getProjectCollection().then((collection) => {
        return collection.findOneAndUpdate({ "pId": pId },data).then((updatedData) => {
            if (updatedData)
                return updatedData;
            else
                return null;
        })
    })
}
//-------------------------------------------------------------------------
usersDB.generateId = () => {
    let matches = []
    return connection.getProjectCollection().then((model) => {
        return model.distinct("pId").then((ids) => {
            console.log(ids);
            ids.map((id) => {
                numId = parseInt(id.match(/(\d+)/))
                matches.push(numId);
            })
            return ("P00" + (Math.max(...matches) + 1));
        })
    })
}
module.exports = usersDB;