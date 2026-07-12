import { useEffect, useRef, useState } from 'react'
import type { Peer } from '../types/device.schema'
import { DataType } from '../types/device.schema'

export function useShare(connectionPath: string) {
    const [peers, setPeers] = useState<Peer[]>([])
    const [myDevice, setMyDevice] = useState<Peer | null>(null)
    const connection = useRef<WebSocket | null>(null)
    
    useEffect(() => {
        const socket = new WebSocket(connectionPath)
        connection.current = socket
    
        socket.onopen = () => {
          console.log('Connected to server')
        }
    
        socket.onmessage = (event) => {
          const data = JSON.parse(event.data)

          switch (data.type) {
            case DataType.CONNECTION_ESTABLISHED:
              setMyDevice(data.device)
              break;
            case DataType.ALL_DEVICES:
              setPeers(data.devices)
              break;
            case DataType.DEVICE_CONNECTED:
              setPeers((prev) => {
                if (prev.some((peer) => peer.id === data.deviceId)) return prev

                return [...prev, {
                  id: data.deviceId,
                  name: data.name
                }]
              })
              break;
            case DataType.DEVICE_DISCONNECTED:
              setPeers((prev) => prev.filter((peer) => peer.id !== data.deviceId))
              break;
            default:
              break;
          }
        }
    
        return () => {
          socket.close()
        }
      }, [connectionPath])
    return { peers, myDevice}
}