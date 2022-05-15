

class Project {
    constructor(obj) {
        this.pId=obj.pId;
        this.pName = obj.pName;
        this.pDescription = obj.pDescription;
        this.skillSet = obj.skillSet;
        this.noOfMembers = obj.noOfMembers;
        this.isActive = obj.isActive;
        this.creationDate=obj.creationDate;
    }
}


module.exports = Project;