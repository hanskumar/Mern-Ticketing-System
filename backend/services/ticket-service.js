const UserModel = require('../models/UserModel');
const TicketModel = require('../models/TicketModel')

class TicketService {
    async getTickets(clientId) {
        const tickets = await TicketModel.find({clientId});
        return tickets;
    }

    async createTicket(data) {
        const ticket = await TicketModel.create(data);
        return ticket;
    }

    async getTicketById(_id,clientId){
        const ticketbyId = await TicketModel.findOne({_id,clientId});
        return ticketbyId;
    }
    
    async deleteTicketById(_id,clientId){

    }

    async updateStatusClose(_id,clientId){

    }
}

module.exports = new TicketService();
