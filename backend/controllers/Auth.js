import UserModel from "../models/user.js"
import bcryptjs from  'bcryptjs'

// const Register=async(req,res)=>{
//     try{
//      const{FullName,email,password}=req.body

//      const eixtUser=await UserModel.find({email})
//      if(!eixtUser){
//         return res.status(303).json({success:false,message:"User already exist please login"})
//      }
//      const imagePath=req.file.filename
//      const hasepassword=await bcryptjs.hashSync(password,10)
//       const NewUser=new UserModel({
//         FullName,
//         email,
//         password:hasepassword,
//         profile:imagePath
//       })
//       await NewUser.save()
//       return res.status(200).json({success:true,message:"User register succesfully",user:NewUser})

//     }catch(error){
//      console.log(error)
//      return res.status(500).json({success:false,message:"Internal server error"})
//     }
// }
const Register = async (req, res) => {
  try {
    const { FullName, email, password } = req.body;

    const existUser = await UserModel.findOne({ email });
    if (existUser) {
      return res.status(303).json({ success: false, message: "User already exists, please login" });
    }

    const imagePath = req.file.filename;
    const hashedPassword = await bcryptjs.hash(password, 10);

    const NewUser = new UserModel({
      FullName,
      email,
      password: hashedPassword,
      profile: imagePath,
    });

    await NewUser.save();
    return res.status(200).json({ success: true, message: "User registered successfully", user: NewUser });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const Login=async(req,res)=>{
  try{ 
    const {email,password}=req.body
    if(!email || !password){
      return res.status(400).json({success:false,message:"All fields are required"});
    }
    const FindUser=await UserModel.findOne({email})

     if(!FindUser){
      return res.status(400).json({success:false,message:"No User Found Please Register"})
     }
     const comparepassword=await bcryptjs.compare(password,FindUser.password)

     if(!comparepassword){
      return res.status(400).json({success:false,message:"Invalid password"})
     }
     res.status(200).json({success:true,message:"Login successfully",user:FindUser})

  }catch(error){
    console.log(error)
    return res.status(500).json({success:false,message:"Internal server error"})
  }
}
export {Register,Login}
