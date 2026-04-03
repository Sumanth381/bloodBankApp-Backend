const {registerUser,loginUser,ForgotPassword} = require("../service/loginservice");

const createRegisterUser = async (req, res) => {
  try {
    const loginperson = await registerUser(req.body)
    res.status(200).json({
        status_code: 200,
        message:"user Register sucessfully",
        data:loginperson
    })
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status_code: 400,
      message: error.message,
    });
  }
};


const loginRegisterUser = async(req,res)=>{
    try{
        const loginuser = await loginUser(req.body)
        res.status(200).json({
            status_code:200,
            message:"user Login sucessfully",
            data:loginuser

        })

    }catch(error){
        console.log(error)
        res.status(400).json({
            status_code:400,
            message:error.message
        })
    }
}

const forgotpasswordUser = async(req,res)=>{
    try{
        await ForgotPassword(req.body)
         res.status(200).json({
            status_code:200,
            message:"Password updated successfully",

        })

    }catch(error){
        console.log(error)
        res.status(400).json({
            status_code:400,
            message:error.message
            
        })
    }
}

module.exports = {createRegisterUser,loginRegisterUser,forgotpasswordUser}
