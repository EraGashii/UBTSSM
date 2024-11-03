import mongoose from "mongoose";

const DBCon=async()=>{
    try{
       mongoose.connect(process.env.MONDODB_URL)
       console.log('Mongodb is connected')
    }catch(error){
        console.log('Mongodb errorr :(',error)

    }
}
export default  DBCon