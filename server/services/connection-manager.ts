import { RoomManager } from "./room-manager";
import { RawData, WebSocket } from "ws";
import { IncomingMessage } from "http";
import Device from "./device";
import { Room } from "./room";
import { MessageType } from "../schemas/device.schema";

export class SocketManager {

    constructor(private roomManager: RoomManager){}

    handleConnection(ws: WebSocket, req: IncomingMessage){
        const ip = req.socket.remoteAddress
        if(!ip) return
        
        const room = this.roomManager.getOrCreateRoom(ip)
        const device = room.createDevice(ws, req)

        this.sendAllDevices(ws, room, device.id)

        ws.send(JSON.stringify({
            type: MessageType.CONNECTION_ESTABLISHED,
            device: { id: device.id, name: device.name }
        }))

        this.roomManager.broadcastToRoom(ip, {
            type: MessageType.DEVICE_CONNECTED,
            deviceId: device.id,
            name: device.name
        }, device.id)

        ws.on('message', (data)=> this.handleMessage(ip, data, room))
        ws.on('close', () => this.roomManager.handleDeviceDisconnect(ip, device))
        ws.on('error', (error) => console.error(error))
    }

    sendAllDevices(ws: WebSocket, room: Room, currentDeviceId: string){
        const otherDevices = room.getDevicesList()
            .filter((client) => client.id !== currentDeviceId)
            .map((client) => ({ id: client.id, name: client.name }))

        ws.send(JSON.stringify({ 
            type: MessageType.ALL_DEVICES, 
            devices: otherDevices 
        }))
    }

    handleMessage(sender: string, data: RawData | string, room: Room){
        try {
            // Organization  of message and the target
            const messageJSON = JSON.parse(data.toString())
            const target = room.devicesList.get(messageJSON.target)

            if(target){
                if(target.connection.readyState === WebSocket.OPEN){
                    target.connection.send(JSON.stringify({ ...messageJSON, from: sender }))
                }
            }
    
        } catch (error) {
            console.log(error)
        }
    }


}