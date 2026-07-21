import { WebSocketServer, WebSocket } from "ws";
import express from 'express'
import { IncomingMessage } from "http";
import { RoomManager } from "./services/room-manager";
import { SocketManager } from "./services/connection-manager";

const app = express()
const PORT = 4000

const server = app.listen(PORT)
const wss = new WebSocketServer({ server })

const roomManager = new RoomManager()

const socketManager = new SocketManager(roomManager)

wss.on('connection', (ws: WebSocket, req: IncomingMessage) => {
    socketManager.handleConnection(ws, req)
})

