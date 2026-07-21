export enum MessageType {
    CONNECTION_ESTABLISHED = 'connection_established',
    DEVICE_CONNECTED = 'device_connected',
    DEVICE_DISCONNECTED = 'device_disconnected',
    ALL_DEVICES = 'all_devices',
    MESSAGE = 'message'
}

export interface DeviceData {
    id: string;
    name: string;
}

export interface ConnectionEstablishedMessage {
    type: MessageType.CONNECTION_ESTABLISHED;
    device: DeviceData;
}

export interface DeviceConnectedMessage {
    type: MessageType.DEVICE_CONNECTED;
    deviceId: string;
    name: string;
}

export interface DeviceDisconnectedMessage {
    type: MessageType.DEVICE_DISCONNECTED;
    deviceId: string;
}

export interface AllDevicesMessage {
    type: MessageType.ALL_DEVICES;
    devices: DeviceData[];
}

export interface DirectMessage {
    type: MessageType.MESSAGE | string;
    target: string;
    from?: string;
    [key: string]: string | number | boolean | object | undefined;
}

export type SocketMessage =
    | ConnectionEstablishedMessage
    | DeviceConnectedMessage
    | DeviceDisconnectedMessage
    | AllDevicesMessage
    | DirectMessage;