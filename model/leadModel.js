const mongoose=require('mongoose')


const leadSchema= new mongoose.Schema({
  name:{
        type:String,
        required:true
    },
  city:{
        type:String,
        required:true
    },
  mobile:{
        type:String,
        required:true
    },
  status:{
        type:String,
        default:'pending'
    },
  orderType:{
    type:String,
  },
  callAttendant:{
    type:String,
  },
  followupDate:{
    type:Date,
    default:Date.now
  }

    
})


const lead=mongoose.model("lead",leadSchema);
module.exports=lead