const Project = require("../../models/project");
const User = require("../../models/user");
const transformProject = project =>{
    return { ...project._doc, _id: project.id, owner: user.bind(this, project.owner) };
}
const projects = async projectIds=>{
    try {
        const projects = await Project.find({ _id: { $in: projectIds } });
        return projects.map(project => {
            return { ...project._doc, _id: project.id, owner: user.bind(this, project.owner) };
        });
    } catch (err) {
        throw err;
    }
}
const user = async userId =>{
    try {
        const user = await User.findById(userId);
        return { ...user._doc, _id: user.id, project: projects.bind(this, user._doc.project) };
    } catch (err) {
        throw err;
    }
}
exports.user = user;
exports.projects = projects;
exports.transformProject = transformProject;
