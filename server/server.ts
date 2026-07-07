import { WebSocketServer, WebSocket } from "ws";
import express from 'express'
import Device from "./services/Device"
import { IncomingMessage } from "http";
import { Room } from "./services/Room";

const app = express()
const PORT = 3000

const server = app.listen(PORT)
const wss = new WebSocketServer({ server })

const rooms = new Map<string, Room>()

wss.on('connection', (ws: WebSocket, req: IncomingMessage) => {
    const device = new Device(req, ws)
    const ip = device.getIP()

    // check if device is already connected
    if(!rooms.has(ip)){
        rooms.set(ip, new Room(ip))
    }

    rooms.get(ip)?.addDevice(device)

    // Notify other devices in room
    rooms.get(ip)?.devicesList.forEach((client) => {
        if(client.connection.readyState === WebSocket.OPEN && client.id !== device.id){
            client.connection.send(JSON.stringify({ type: 'device_connected', deviceId: device.id }))
        }
    })

    ws.on('message', (data: Buffer | string) => {
        try {
            const messageJSON = JSON.parse(data.toString())
            
            const target = rooms.get(ip)?.devicesList.get(messageJSON.target)

            if(target){
                if(target.connection.readyState === WebSocket.OPEN){
                    target.connection.send(JSON.stringify({ ...messageJSON, from: device.id }))
                }
            }
    
        } catch (error) {
            console.log(error)
        }
    })

    ws.on('close', () => {
        console.log('device disconnected', device.id)
        rooms.get(ip)?.removeDevice(device)

        rooms.get(ip)?.devicesList.forEach((client) => {
            if(client.connection.readyState === WebSocket.OPEN){
                client.connection.send(JSON.stringify({ type: 'device_disconnected', deviceId: device.id }))
            }
        })
    })
    
})