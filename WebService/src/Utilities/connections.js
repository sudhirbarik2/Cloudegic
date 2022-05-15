const { Schema } = require("mongoose");
const Mongoose = require("mongoose")
Mongoose.Promise = global.Promise;
const url = "mongodb://localhost:27017/cloudegic";

let projectSchema = Schema({
    pId:{ type: String, required: true, trim: true },
    pName: { type: String, required: true, trim: true },
    pDescription: { type: String, required: true, trim: true },
    skillSet: [String],
    noOfMembers: String,
    isActive: Boolean,
    creationDate: String
}, { collection: "Project" })


let collection = {};

collection.getProjectCollection = () => {
    return Mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }).then((database) => {
        return database.model('Project', projectSchema)
    }).catch((error) => {
        let err = new Error("Could not connect to Database...");
        err.status = 500;
        throw err;
    })
}

module.exports = collection;