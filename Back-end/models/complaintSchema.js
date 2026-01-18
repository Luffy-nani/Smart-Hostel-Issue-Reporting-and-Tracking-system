const mongoose=require("mongoose");

const complaintSchema= new mongoose.Schema(
    {
        title:{
            type:String, trim:true, required:true
        },
        userId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:User,
            required:true
        },
        category:{
            type:String, required:true
        },
        description:{
            type:String, required:true, trim:true
        },
        status:{
            type:String,
            enum:["pending","in-progress","done"],
            default:"pending"
        }
    },
    {
        timestamps:true
    }
);

module.exports=mongoose.model("Complaint",complaintSchema);