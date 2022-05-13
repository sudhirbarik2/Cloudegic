

class Project {
    constructor(obj) {
        this.pId=obj.pId;
        this.pName = obj.pName;
        this.pDescription = obj.pDescription;
        this.skillSet = obj.skillSet;
        this.noOfMembers = obj.noOfMembers;
        this.isActive = obj.isActive;

    }
}


module.exports = Project;