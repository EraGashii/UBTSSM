import upload from "../middleware/multer.js"
import PostModel from "../models/blog.js"

const Create=async(req,res)=>{
    try{

        const{title,desc}=req.body
        const imagePath=req.file.filename
        const CreateBlog=new PostModel({
            title,
            desc,
            image:imagePath
        })
        await CreateBlog.save()
        return res.status(200).json({ success: true, message: "Post created successfully", post:CreateBlog });
    }catch(error){
        console.log(error)
    return res.status(500).json({success:false,message:"Internal server error"})
    }
}
const deletePost =async(req,res)=>{
    try {
        const postId=req.params.id

        const FindPost=await PostModel.findById(postId)
        if(!FindPost){
            return res.status(404).json({success:false,message:"Post not found"})
        }
        const deletedPost=await PostModel.findByIdAndDelete(postId)

        return res.status(200).json({success:true,message:"Post deleted successfully",post:deletedPost})

    } catch (error) {
        console.log(error)
        return res.status(500).json({success:false,message:"Internal server error"})
    }
}

const getposts=async(req,res)=>{
     try {
        const posts=await PostModel.find()
        if(!posts){
            return res.status(404).json({success:false,message:"Post not found"})
        }
        return res.status(200).json({success:true,posts})
     } catch (error) {
        console.log(error)
        return res.status(500).json({success:false,message:"Internal server error"})
     }
}

const update=async(req,res)=>{
    try {
       const{title,desc}=req.body
       const postId=req.params.id;

       const postUpdate=await PostModel.findById(postId)
       if(!postUpdate){
           return res.status(404).json({success:false,message:"Post not found"})
       }

       if(title){
         postUpdate.title=title
       }
       if(desc){
        postUpdate.desc=desc
      }
      if(req.file){
        postUpdate.image=req.file.filename
      }
      await postUpdate.save()
      return res.status(200).json({success:true,message:"Post updated successfully",post:postUpdate})
    } catch (error) {
       console.log(error)
       return res.status(500).json({success:false,message:"Internal server error"})
    }
}

export{Create,deletePost,getposts,update}