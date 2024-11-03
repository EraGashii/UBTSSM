import UserModel from "../models/user.js"

const Register=async(req,res)=>{
    try{
     const{FullName,email,password}=req.body

     const eixtUser=await UserModel.find({email})
     if(!eixtUser){
        return res.status(303).json({succes:false,message:"User already exist please login"})
     }
      const NewUser=new UserModel({
        FullName,email,password
      })
      await NewUser.save()
      return res.status(200).json({succes:true,message:"User resigter succesfully",user:NewUser})

    }catch(error){
     console.log(error)
     return res.status(500).json({succes:false,message:"Internal server error"})
    }
}
export {Register}