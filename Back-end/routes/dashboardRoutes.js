const express=require(`express`);
const app=express();

const complaint=require("../models/complaintSchema");
const authMiddleware=require("../middleware/authMiddleware");

router.get("/complaints", authMiddleware, async(req,res)=>
{
    try
    {
         const complaints = await complaint.find()
      .populate("user", "name email")
      .sort({ createdAt: -1 });
      
      res.status(200).json(complaints);

    }
    catch(err){
        res.status(500).json({message:"Failed to fetch complaints"});
    }
});

module.exports=router;