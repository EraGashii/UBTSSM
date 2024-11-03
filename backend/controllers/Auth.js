import UserModel from "../models/user.js"

const Register=async(req,res)=>{
    try{
     const{FullName,email,password}=req.body

     const eixtUser=await UserModel.find({email})
     if(!eixtUser){
        return res.status(303).json({success:false,message:"User already exist please login"})
     }
     const imagePath=req.file.filename
      const NewUser=new UserModel({
        FullName,
        email,
        password,
        profile:imagePath
      })
      await NewUser.save()
      return res.status(200).json({success:true,message:"User register succesfully",user:NewUser})

    }catch(error){
     console.log(error)
     return res.status(500).json({success:false,message:"Internal server error"})
    }
}
export {Register}
