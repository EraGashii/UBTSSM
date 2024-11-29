import PostModel from "../models/blog.js"

const GetSinelpost=async(req,res)=>{
    try {
        const postId=req.params.id 
        const FindPost=await PostModel.findById(postId)
        .populate({
            path:'comments',
            populate:{
                path:"userId"
            }
        })
        if(!FindPost){
            return res.status(404).json({success:false,message:"Blog post not found"});
        }
        res.status(200).json({ success: true, post: FindPost });
    } catch (error) {
        console.log(error)
        return res.status(500).json({success:false,message:"Internal server error"});
        
    }
}
export{GetSinelpost}