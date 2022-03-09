const User = require("../../models/user");
const bcrypt = require('bcryptjs');
const {user, projects, transformProject} = require("./populate");
const jwt = require('jsonwebtoken');
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
    users: async () => {
        try {
            const results = await User.find();
            return results.map(result => {
                return {
                    ...result._doc, password: null, _id: result.id, 
                    project: result._doc.project.map(pro => {
                        return { ...pro._doc, _id: pro.id };
                    })
                };
            });
        } catch (err) {
            throw err;
        }
    },
    createUser: async args => {
        try {
            const user = await User.findOne({ email: args.UserInput.email });
            if (user) {
                throw new Error("User email "+ args.UserInput.email+" already exists");
            }
            if(args.UserInput.otherId){
                const otherUser = await User.findOne({ otherId: args.UserInput.otherId });
                //console.log("here");
                if(otherUser){
                    throw new Error("User already signed up by third party");
                }
            }
            const pass = await bcrypt.hash(args.UserInput.password, 12);
            const newUser = new User({
                firstName: args.UserInput.firstName,
                lastName: args.UserInput.lastName,
                email: args.UserInput.email,
                password: pass,
                otherId: args.UserInput.otherId,
                project: [],
            });
            const result = await newUser.save();
            //console.log(result._doc);
            return { ...result._doc, _id: result.id, password: null };
        } catch (err) {
            //console.log(err);
            throw err;
        }
    },
    emailLogin: async args =>{
        const user = await User.findOne({email:args.email});
        if(!user){
            throw new Error("User email "+args.email+" not exits");
        }
        const equal = await bcrypt.compare(args.password,user.password);
        if(!equal){
            throw new Error("Wrong password");
        }
        const token = jwt.sign({userId: user.id, email:user.email}, 'my token secret', {
            expiresIn:'1h'
        });
        return {
            userId: user.id,
            token: token,
            tokenExpiration: 1 //time in hour
        }
    }
}