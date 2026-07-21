

export interface Peer {
  id: string
  name: string
}

export const DataType = {
  ALL_DEVICES: 'all_devices',
  DEVICE_CONNECTED: 'device_connected',
  DEVICE_DISCONNECTED: 'device_disconnected',
  CONNECTION_ESTABLISHED: 'connection_established',
}