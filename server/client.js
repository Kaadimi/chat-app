class Client {
    constructor(id, name = 'unkown')
    {
        this.name = name
        this.id = id
        this.room = null
        this.admin = false
    }

    // broadcast(data)
    // {
    //     if (!this.room) {
    //         throw new Error('can not broadcast without room')
    //     }

    //     data.clientId = this.id;
    //     this.room.clients.forEach(client => {
    //         if (this === client)
    //             return ;
    //         client.send(data);
    //     });
    // }

    // send(data)
    // {
    //     const msg = JSON.stringify(data);
    //     console.log(`Sending msg ${msg}`);
    //     this.socket.send(msg, function ack(err) {
    //         if (err) {
    //             console.error('Message failed', msg, err);
    //         }
    //     })
    // }
}

module.exports = Client;