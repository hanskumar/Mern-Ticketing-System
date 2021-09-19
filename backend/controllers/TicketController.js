const UserModel     = require("../models/UserModel");
const userService   = require("../services/user-service");
const ticketService  = require('../services/ticket-service');
const TicketDto       = require('../dtos/ticket-dtos'); 


class TicketController {

    async addTicket(req,res){

        const { subject,description } = req.body;

        console.log(req.user._id);

        if (!subject || !description || !req.user._id) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const user = await userService.findUser({_id:req.user._id});
        try {

            if(!user) {
                return res.json({code:401, message: 'No User Found.' });
            } 

            // save ticket 
            let clientId= req.user._id;

            const ticket = await ticketService.createTicket({clientId,subject,description });

            const ticketDto = new TicketDto(ticket); 
            res.status(200).json({code:200, data: ticketDto,message: 'Ticket added Successfully.' });

        } catch (err) {
            console.log(err);
            res.status(400).json({code:400, message: 'Something went wrong!!!.' });
        }
       

    }

    async getTickets(req,res){
   
            if (!req.user._id ) {
                return res.status(400).json({ message: 'All fields are required' });
            }

            const user = await userService.findUser({_id:req.user._id});

            if (!user) {
                return res.status(400).json({ message: 'No User Found.' });
            }

            let clientId= req.user._id;
            
            const tickets = await ticketService.getTickets(clientId);
            try {

                const ticketDto = new TicketDto(tickets); 
                res.status(200).json({code:200, data: tickets,message: 'All Tickets.' });

            } catch (err) {
                console.log(err);
                res.status(500).json({ message: 'Something went wrong!!.' });
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
}

module.exports = new TicketController();