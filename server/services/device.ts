import { IncomingMessage } from "http";
import { WebSocket } from "ws";

class Device {
    request: IncomingMessage
    connection: WebSocket
    id: string
    name: string

    constructor(req: IncomingMessage, sock: WebSocket){
        this.request = req
        this.connection = sock
        this.id = Math.random().toString(36).substr(2, 9)
        this.name = this.getName()
    }

    getIP(): string {
        const forwarded = this.request.headers['x-forwarded-for'];
        const ip = typeof forwarded === 'string' 
            ? forwarded.split(',')[0].trim() 
            : this.request.socket.remoteAddress;
        return ip || 'unknown';
    }

    getName(): string {
        return this.id.substring(0, 4)
    }
    
}


export default Device