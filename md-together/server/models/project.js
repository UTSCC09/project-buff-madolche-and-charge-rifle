const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const projectSchema = new Schema({
    name:{
        type: String,
        required:true
    },
    owner:{
        type:Schema.Types.ObjectId,
        ref:'User',
        required: true,
    },
    editor:[{
        type:Schema.Types.ObjectId,
        ref:'User',
    }],
    content:{
        type: String,
        required:true
    }
});
module.exports = mongoose.model('Project', projectSchema);