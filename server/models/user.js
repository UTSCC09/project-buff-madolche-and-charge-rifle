const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userSchema = new Schema({
    firstName:{
        type:String,
        required: true,
    },
    lastName:{
        type:String,
        required: true, 
    },
    email:{
        type:String,
        required: true,
    },
    password:{
        type:String,
        
    },
    otherId:{
        type:String,   
    },
    status:{
        type:String,
    },
    owned:[{
        _id:{
        type: Schema.Types.ObjectId,
        ref:'Project',
        required: true
    },
        name:{
            type: String,
            required: true
    },
    
    }],
    shared:[{
        _id:{
        type: Schema.Types.ObjectId,
        ref:'Project',
        required: true
    },
        name:{
            type: String,
            required: true
    },
    
    }],
    invited:[{
        _id:{
            type: Schema.Types.ObjectId,
            ref:'Project',
            required: true
        },
        name:{
            type: String,
            required: true
        },
    }],
});
module.exports = mongoose.model('User', userSchema);