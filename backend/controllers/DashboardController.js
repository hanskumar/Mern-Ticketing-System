const UserModel     = require("../models/UserModel");
const userService   = require("../services/user-service");
const tokenService  = require('../services/token-service');
const UserDto       = require('../dtos/user-dtos'); 
const bcrypt        = require('bcrypt');


class DashboardController {

    async dashboard(req,res){

        if(!req._id){
            return res.status(400).json({code:401,status: "fail", message: 'All fields are required' });
        }

        
        const user = await userService.findById(req._id);
        try {

            if(!user) {
                return res.json({code:401, message: 'No User Found.' });
            } 

            const userDto = new UserDto(user);
            res.status(200).json({ code:200,data: userDto, auth: true ,message: 'User Data.' });

        } catch (err) {
            console.log(err);
            res.status(400).json({code:400, message: 'Something went wrong!!!.' });
        }
       

    }

    async register(req,res){
   
        try {
            const { name,email,phone,address,password } = req.body;

            if (!email || !password || !phone || !address ) {
                return res.status(400).json({ message: 'All fields are required' });
            }

            const exist = await UserModel.exists({ email });

            if (exist) {
                return res.status(400).json({ message: 'User with given email id is arleady exist.' });
            }
            
            const user = await userService.createUser({ name,email,phone,address,password });
            try {

              /* const { accessToken, refreshToken } = tokenService.generateTokens({
                    _id: user._id
                });

                res.cookie('refreshToken', refreshToken, {
                    maxAge: 1000 * 60 * 60 * 24 * 30,
                    httpOnly: true,
                });
        
                res.cookie('accessToken', accessToken, {
                    maxAge: 1000 * 60 * 60 * 24 * 30,
                    httpOnly: true,
                }); */

                const userDto = new UserDto(user); 
                res.status(200).json({ data: userDto,message: 'Signup Success.' });

            } catch (err) {
                console.log(err);
                res.status(500).json({ message: 'Something went wrong!!.' });
            }
            
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: 'Something went wrong.' });
        }

    }

    async refreshToken(req,res){

        // get refresh token from cookies
        const { refreshToken } = req.cookies;

        if(!refreshToken){
            return apiResponse.validationErrorWithData(res, "No Token Found"); 
        }

        // verify refresh token
        let userdata;
        try{
            userdata = await tokenService.verifyRefreshToken(refreshToken);
        } catch(err){
            return apiResponse.unauthorizedResponse(res, "Unautharized Error");
        }

        
        // check refresh token from DB
        try{
            const token = tokenService.findRefreshToken(userdata.id,refreshToken);

            if(!token){
                return apiResponse.unauthorizedResponse(res, "No RefToken found in DB ");
            }

        } catch(err){
            return apiResponse.unauthorizedResponse(res, "Internal Error");
        }
        
        // check if valid user
        try{
            const user = userService.findUser({ _id: userdata.id });
            if (!user) {
                return res.status(404).json({ message: 'No user' });
            }

            // genrate new Accesstoken
            const { accessToken, NewrefreshToken } = tokenService.generateTokens({
                _id: userdata._id
            });

            // update refresh token
            const token = tokenService.updateRefreshToken(userdata.id,NewrefreshToken);


            // set new accessToken ,Refresh token in cookies
            res.cookie('refreshToken', NewrefreshToken, {
                maxAge: 1000 * 60 * 60 * 24 * 30,
                httpOnly: true,
            });

            res.cookie('accessToken', accessToken, {
                maxAge: 1000 * 60 * 60 * 24 * 30,
                httpOnly: true,
            });

            // send response to the client
            const userDto = new UserDto(user);
            res.json({ user: userDto, auth: true });

        } catch(err){
            return apiResponse.unauthorizedResponse(res, "Internal Error");
        }
       
    }

    async logout(req,res){

    }

}

module.exports = new DashboardController();