class Room {
    constructor(id)
    {
        this.id = id
        this.active = false
        this.clients = new Set
    }

    join(client)
    {
        return new Promise((resolve, reject) => {
            if (client.room)
                reject('Client already in room');
            else if ([...this.clients].find(el => el.name === client.name))
                reject('duplicated Name')
            else {
                let len = this.clients.size
            
                console.log(len)
                if (len > 3 || this.active)
                    reject('room is inaccessible');
                else
                {
                    if (len === 0)
                        client.admin = true
                    this.clients.add(client);
                    client.room = this;
                    resolve(`welcome cheif`)
                }
            }
        })
    }

    leave(client)
    {
        if (client.room !== this)
        {
            throw new Error('Client not in room');
        }
        this.clients.delete(client);
        client.room = null;
    }

    nextRoomAdmin()
    {
        if (this.clients.size > 0) {
            [...this.clients][0].admin = true
            return [...this.clients][0] 
        }
        console.log(this.clients.size)
        return null
    }

    getRoomAdmin()
    {
        return [...this.clients].find(client => client.admin)
    }

    getClient(id)
    {
        return [...this.clients].find(client => client.id === id)
    }
}

module.exports = Room