import { Room } from "./room"
import Device from "./device"
import { MessageType, SocketMessage } from "../schemas/device.schema"

export class RoomManager {
    private rooms = new Map<string, Room>()

    getOrCreateRoom(ip: string) : Room {
        if(!this.rooms.has(ip)){
            this.rooms.set(ip, new Room(ip))
        }

        return this.rooms.get(ip)!
    }

    broadcastToRoom(ip: string, payload: SocketMessage, excludeId?: string){
        this.getOrCreateRoom(ip).devicesList.forEach((device) => {
            if(device.connection.readyState === WebSocket.OPEN && device.id !== excludeId){
                device.connection.send(JSON.stringify(payload))
            }
        })
    }

    handleDeviceDisconnect(ip: string, device: Device){
        const room = this.getOrCreateRoom(ip)
        room.removeDevice(device)

        if(room.devicesList.size === 0){
            this.rooms.delete(ip)
        } else {
            this.broadcastToRoom(ip, { type: MessageType.DEVICE_DISCONNECTED, deviceId: device.id })
        }
    }
}