// const { async } = require("jshint/src/prod-params");
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
    project: async (args,req)=>{
        if(!req.isAuth){
            throw new Error("User not authenticated");
        }
        try {
            const user = await User.findById(req.userId);
            if (!user) {
                throw new Error(req.userId + " not found");
            }
            return user.project;
        } catch (err) {
            throw err;
        }
    },
    getContent: async (args,req) =>{
        try{
            let user = await User.findById(args.userId);
            if(!user){
                throw new Error("User not found");
            }
            let project = [...user.project];
            let exist = project.find(pro => pro.id === args.projectId);
            if(!exist){
                throw new Error("Project not found in your user space");
            }
            project = await Project.findById(args.projectId);
            if(!project){
                throw new Error("Project doesn't exist, please contact to the project owner");
            }
            return project.content;

        }catch(err){
            throw err;
        }
    },
    saveContent: async (args,req) =>{
        try{
            let user = await User.findById(args.userId);
            if(!user){
                throw new Error("User not found");
            }
            let project = [...user.project];
            let exist = project.find(pro => pro.id === args.projectId);
            if(!exist){
                throw new Error("Project not found in your user space");
            }
            project = await Project.findById(args.projectId);
            if(!project){
                throw new Error("Project doesn't exist, please contact to the project owner");
            }
            await Project.updateOne(
                {_id: args.projectId},
                {$set:{content:args.content}}
            );
            project = await Project.findById(args.projectId);
            return project.content;

        }catch(err){
            throw err;
        }
    },
    createInv: async (args, req) =>{
        try{
            let user = await User.findById(args.owner);
            let invited = await User.findOne({email:args.email});
            if(!user || !invited){
                throw new Error("user not found");
            }
            let project = [...user.project];
            let exist = project.find(pro => pro.id === args.projectId);
            if(!exist){
                throw new Error("Project not found in your user space");
            }
            project = await Project.findById(args.projectId);
            if(!project){
                throw new Error("project not exist/may be deleted, please contact to the project owner");
            }
            project = [...invited.project];
            let samepro = project.find(pro => pro.id === args.projectId);
            if(samepro){
                throw new Error(invited.email +" has already in the project");
            }
            let invites = [...invited.invited];
            let sameinv = invites.find(inv => inv.id === args.projectId);
            if(sameinv){
                throw new Error(invited.email +" has a same invitation");
            }
            await invited.invited.push(exist);
            await invited.save();
            invited = await User.findOne({email:args.email});
            return invited.invited;
        }catch(err){
            throw err;
        }
    },
    deleteProject: async (args, req) =>{
        try{
            let user = await User.findById(args.userId);
            if(!user){
                throw new Error("User not found");
            }
            let projects = [...user.project];
            let same = projects.find(pro => pro.id === args.projectId);
            if(!same){
                throw new Error("You don't have the project in user space");
            }
            await User.updateOne(
                {_id: args.userId},
                {
                    $pull:{project:{_id:same.id}}
                }

            );
            user = await User.findById(args.userId)
            return user.project;
        }catch(err){
            throw err;
        }
    },
    ownerDelPro: async (args, req) =>{
        try{
            let user = await User.findById(args.userId);
            if(!user){
                throw new Error("User not found");
            }
            let projects = [...user.project];
            let same = projects.find(pro => pro.id === args.projectId);
            if(!same){
                throw new Error("You don't have the project in user space");
            }
            let project = await Project.findById(args.projectId);
            if(!project){
                throw new Error("Cannot find project");
            }
            await User.updateMany(
                {},
                {
                    $pull:{project:{_id:same.id}, invited:{_id:same.id}}
                }

            );
            await Project.deleteOne(
                {_id:same.id},
            );
            user = await User.findById(args.userId)
            return user.project;
        }catch(err){
            throw err;
        }
    },
    acceptInv: async (args,req) =>{
        try{
            let invited = await User.findById(args.userId);
            if(!invited){
                throw new Error("User not found");
            }
            let invites = [...invited.invited];
            let sameinv = invites.find(inv => inv.id === args.projectId);
            if(!sameinv){
                throw new Error("You don't have the invitation");
            }
            let project = await Project.findById(args.projectId);
            if(!project){
                throw new Error("project not exist/may be deleted, please contact to the project owner");
            }
            await User.updateMany(
                {_id: args.userId},
                {
                    $pull:{invited:{_id:sameinv.id}},
                    $push:{project: sameinv},
                }

            );
            invited = await User.findById(args.userId)
            return invited.project;
        }catch(err){
            throw err;
        }
    },
    rejectInv: async (args,req) =>{
        try{
            let invited = await User.findById(args.userId);
            if(!invited){
                throw new Error("User not found");
            }
            let invites = [...invited.invited];
            let sameinv = invites.find(inv => inv.id === args.projectId);
            if(!sameinv){
                throw new Error("You don't have the invitation");
            }
            await User.updateMany(
                {_id: args.userId},
                {
                    $pull:{invited:{_id:sameinv.id}}
                }

            );
            invited = await User.findById(args.userId)
            return invited.invited;
        }catch(err){
            throw err;
        }
    },
    // "6227f6c796810c0a56f8b0c3"
    createProject: async (args,req)=>{
        // if(!req.isAuth){
        //     throw new Error("User not authenticated");
        // }
        try{
            let user = await User.findById(args.ProjectInput.owner);
            if(!user){
                throw new Error("User not found");
            } 
            const project = Project({
                name:args.ProjectInput.name, 
                //owner:req.userId,
                owner:args.ProjectInput.owner,
                content:args.ProjectInput.content,
             });
            await project.save();
            const liteProject = {
                _id: project.id,
                name:project.name,
            }
            await user.project.push(liteProject);
            await user.save();
            return project;

        }
        catch(err){
            throw err;
        }
    },
}