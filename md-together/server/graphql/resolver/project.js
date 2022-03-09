const Project = require("../../models/project");
const User = require("../../models/user");
const {user, projects, transformProject} = require("./populate");
module.exports = {

    // getprojct:() =>{
    //     Project.find().populate("owner")
    //     .then(results => {
    //         return results.map(result =>{
    //             return {...result._doc, _id:result.id, owner:{
    //                 ...result._doc.owner._doc,
    //                 _id:result._doc.owner.id
    //             }}
    //         })
    //     })
    // }
    project: async args =>{
        try {
            const user = await User.findById(args.userId);
            if (!user) {
                throw new Error(args.userId + " not found");
            }
            return user.project;
        } catch (err) {
            throw err;
        }
    },
    // "6227f6c796810c0a56f8b0c3"
    createProject: (args,req)=>{
        if(!req.isAuth){
            throw new Error("User not authenticated");
        }
        const project = Project({
           name:args.ProjectInput.name, 
           owner:req.userId,
           content:args.ProjectInput.content,
        });
        let newProject;
        return project.save()
        .then(result =>{
            newProject = {...result._doc, _id:result.id};
            //console.log(newProject);
            return User.findById(args.ProjectInput.owner);
        })
        .then(user =>{
            if(!user){
                throw new Error("User not found");
            }
            const liteProject = {
                _id: newProject._id,
                name:newProject.name,
            }
            user.project.push(liteProject);
            return user.save();
        })
        .then(result =>{
            //console.log(newProject);
            return newProject;
        })
        .catch(err =>{
            throw err;
        })
    },
}