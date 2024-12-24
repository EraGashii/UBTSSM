import User from "../models/user.js";
import PostModel from "../models/blog.js";
import CommentModel from "../models/comment.js"; // Import Comment model

const Getalldate = async (req, res) => {
    try {
        const Users = await User.find();
        const Posts = await PostModel.find();
        const Comments = await CommentModel.find(); 

        // Check if all datasets are empty
        if (!Users.length && !Posts.length && !Comments.length) { 
            return res.status(404).json({ success: false, message: "No data found" });
        }

        res.status(200).json({ success: true, Users, Posts, Comments });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
};

export { Getalldate };

const GetUser=async(req,res)=>{
    try {
        const Users=await User.find()

        //coments here
        
        if(!Users){ 
            return res.status(404).json({success:false,message:"Not Data Found"})
        }
       res.status(200).json({success:true,Users})
    } catch (error) {
        console.log(error)
        return res.status(500).json({success:false,message:"Internal server error"})
    }
}
const Userdelete=async(req,res)=>{
    try {
        const userId=req.params.id

        const ExistUser=await User.findById(userId)
        if(!ExistUser){
            return res.status(404).json({success:false,message:"Not User Found"})
        }
        if(ExistUser.role=='admin'){
            return res.status(404).json({success:false,message:"Sorry your Admin cant delete your account"})
        }
        if(ExistUser.profile){
            const profilepath=path.join('public/images',ExistUser.profile)
            fs.promises.unlink(profilepath)
            .then(()=>console.log('Post image deleted'))
            .catch(error =>console.log('Error deleting post image',error))
        }

        const DeleteUser=await User.findByIdAndDelete(userId)
        res.status(200).json({success:true,message:"User Deleted Successfully",user:DeleteUser})
    } catch (error) {
        console.log(error)
        return res.status(500).json({success:false,message:"Internal server error"})
    }
}
export {Getalldate,GetUser,Userdelete}