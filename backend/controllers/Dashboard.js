import PostModel from "../models/blog.js"
import UserModel from "../models/user.js"
import fs from 'fs'
import path from 'path'


const Getalldate=async(req,res)=>{
    try {
        const Users=await UserModel.find()
        const Posts=await PostModel.find()
        //coments here
        
        if(!Users && !Posts){ 
            return res.status(404).json({success:false,message:"Not Data Found"})
        }
       res.status(200).json({success:true,Users,Posts})
    } catch (error) {
        console.log(error)
        return res.status(500).json({success:false,message:"Internal server error"})
    }
}
const GetUser=async(req,res)=>{
    try {
        const Users=await UserModel.find()

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

        const ExistUser=await UserModel.findById(userId)
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

        const DeleteUser=await UserModel.findByIdAndDelete(userId)
        res.status(200).json({success:true,message:"User Deleted Successfully",user:DeleteUser})
    } catch (error) {
        console.log(error)
        return res.status(500).json({success:false,message:"Internal server error"})
    }
}
export {Getalldate,GetUser,Userdelete}