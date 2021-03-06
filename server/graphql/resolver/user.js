const User = require("../../models/user");
const bcrypt = require('bcryptjs');
const {user, projects, transformProject} = require("./populate");
const jwt = require('jsonwebtoken');
const validator = require("validator");
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
    // users: async () => {
    //     try {
    //         const results = await User.find();
    //         return results.map(result => {
    //             return {
    //                 ...result._doc, password: null, _id: result.id, 
    //                 project: result._doc.project.map(pro => {
    //                     return { ...pro._doc, _id: pro.id };
    //                 })
    //             };
    //         });
    //     } catch (err) {
    //         throw err;
    //     }
    // },
    createUser: async args => {
        try {
            if(!validator.isEmail(args.UserInput.email) 
            || !validator.isAlpha(args.UserInput.firstName) 
            || !validator.isAlpha(args.UserInput.lastName)){
              throw new Error("Wrong format of email or name");
            }
            const user = await User.findOne({ email: args.UserInput.email });
            if (user) {
                throw new Error("User with email "+ args.UserInput.email+" already exists");
            }
            if(args.UserInput.otherId){
                const otherUser = await User.findOne({ otherId: args.UserInput.otherId });
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
                status: "login",
                owned: [],
                shared: [],
            });
            const result = await newUser.save();
            const token = jwt.sign({userId: result.id, email:result.email}, 'my token secret', {
                expiresIn:'1h'
            });
            return {
                userId: result.id,
                email: result.email,
                token: token,
                firstName: result.firstName,
                lastName: result.lastName,
                tokenExpiration: 1
            }
        } catch (err) {
            throw err;
        }
    },
    emailLogin: async args =>{
        const user = await User.findOne({email:args.email});
        if(!user){
            throw new Error("User with email "+args.email+" does not exist");
        }
        const equal = await bcrypt.compare(args.password,user.password);
        if(!equal){
            throw new Error("Wrong password");
        }
        await User.updateOne(
            {email:args.email},
            {$set:{status:"login"}}
        );
        const token = jwt.sign({userId: user.id, email:user.email}, 'my token secret', {
            expiresIn:'1h'
        });
        return {
            userId: user.id,
            email: user.email,
            token: token,
            firstName: user.firstName,
            lastName: user.lastName,
            tokenExpiration: 1
        }
    },
    logout: async (args,req) =>{
        if(!req.isAuth){
            return ("User not found");
        }
        const user = await User.findOne({_id:req.userId});
        await User.updateOne(
            {_id:req.userId},
            {$set:{status:"logout"}}
        );
        return "logout";
    },
}