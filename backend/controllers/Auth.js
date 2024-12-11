import UserModel from "../models/user.js"
import bcryptjs from  'bcryptjs'
import jwt from "jsonwebtoken";


const Register = async (req, res) => {
//   console.log('req.file:', req.file);
// console.log('req.body:', req.body);
  try {
    const { FullName, email, password} = req.body;

    const existUser = await UserModel.findOne({ email });
    if (existUser) {
      return res.status(303).json({ success: false, message: "User already exists, please login" });
    }

    // const imagePath = req.file.filename;
    console.log("req.file:", req.file);
const imagePath = req.file ? req.file.filename : null;
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

const Login = async (req, res) => {
  try {
    console.log("req.body:", req.body); // Debugging line
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }
    const FindUser=await UserModel.findOne({email})

     if(!FindUser){
      return res.status(400).json({success:false,message:"No User Found Please Register"})
     }
     const comparepassword=await bcryptjs.compare(password,FindUser.password)

     if(!comparepassword){
      return res.status(400).json({success:false,message:"Invalid password"})
     }
     const token=jwt.sign({userId:FindUser._id},process.env.JWT_SECREATE)
     res.cookie('token',token,{
      httpOnly:true,
      secure:false,
      maxAge:3*24*60*60*1000 
     })
     res.status(200).json({success:true,message:"Login successfully",user:FindUser,token})

  }catch(error){
    console.log(error)
    return res.status(500).json({success:false,message:"Internal server error"})
  }
}



const Logout=async(req,res)=>{
  try{
      res.clearCookie('token')
      res.status(200).json({success:true,message:"Logout successfully"})
  }catch(error){
    console.log(error)
    return res.status(500).json({success:false,message:"Internal server error"})
  }
}

export {Register,Login,Logout}
