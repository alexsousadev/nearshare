import Device from "./device"

export class Room {
    id: string
    devicesList: Map<string, Device> = new Map()

    constructor(id: string){
        this.id = id
    }

    addDevice(device: Device){
        if(this.devicesList.has(device.id)) return
        this.devicesList.set(device.id, device)
        console.log('device added to room', device.id, this.devicesList)
    }

    removeDevice(device: Device){
        this.devicesList.delete(device.id)
    }
}