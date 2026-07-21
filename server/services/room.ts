import Device from "./device"
import { FRUITS, ADJECTIVES } from "../data/dictionaries"
import { IncomingMessage } from "http"
import { WebSocket } from "ws"

export class Room {
    id: string
    devicesList: Map<string, Device> = new Map()
    nameParts: [string[], string[]]

    constructor(id: string){
        this.id = id
        this.nameParts = [[...FRUITS], [...ADJECTIVES]]
    }

    createDevice(ws: WebSocket, req: IncomingMessage): Device {
        const deviceName = this.generateDeviceName()
        if(this.hasDeviceWithName(deviceName)){
            return this.createDevice(ws, req)
        }
        const device = new Device(req, ws, deviceName)

        this.addDevice(device)
        return device
    }

    addDevice(device: Device){
        if(this.devicesList.has(device.id)) return
        this.devicesList.set(device.id, device)
        console.log('device added to room', device.id, this.devicesList)
    }

    removeDevice(device: Device){
        this.devicesList.delete(device.id)
    }

    getDevicesList(): Device[] {
        return Array.from(this.devicesList.values())
    }

    generateDeviceName(): string {
        if (this.nameParts[0].length === 0) this.nameParts[0] = [...FRUITS]
        if (this.nameParts[1].length === 0) this.nameParts[1] = [...ADJECTIVES]

        const firstNameIndex = this.getRandomPositionInList(this.nameParts[0])
        const secondNameIndex = this.getRandomPositionInList(this.nameParts[1])

        // create the name of device
        const firstName = this.nameParts[0][firstNameIndex]
        const secondName = this.nameParts[1][secondNameIndex]
        const compositeName = `${firstName} ${secondName}`

        if(this.hasDeviceWithName(compositeName)) return this.generateDeviceName()

        // remove the parts of the dictionary 
        this.nameParts[0].splice(firstNameIndex, 1)
        this.nameParts[1].splice(secondNameIndex, 1)

        return compositeName
    }

    getRandomPositionInList(list: string[]){
        return Math.floor(Math.random() * list.length)
    }


    hasDeviceWithName(name: string) {
        return this.getDevicesList().some(device => device.name === name)
    }

    

}