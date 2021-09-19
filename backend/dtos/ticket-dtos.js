class TicketDto {
    id;
    clientId;
    subject;
    description;
    openAt;
    status;
    conversations;
    createdAt;

    constructor(ticket) {
        this.id = ticket._id;
        this.clientId = ticket.clientId;
        this.subject = ticket.subject;
        this.description = ticket.description;
        this.openAt = ticket.openAt;
        this.status = ticket.status;
        this.conversations = ticket.conversations;
        this.conversations = ticket.conversations;
        this.createdAt = ticket.createdAt;
    }
}

module.exports = TicketDto;
