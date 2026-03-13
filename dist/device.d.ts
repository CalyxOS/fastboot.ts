type CommandPacket = {
    command: string;
};
type ResponsePacket = {
    status: "OKAY" | "FAIL" | "DATA" | "INFO" | "TEXT";
    message?: string;
    dataLength?: number;
};
type FastbootSession = {
    status: null | "OKAY" | "FAIL";
    packets: (CommandPacket | ResponsePacket)[];
};
interface Logger {
    log(message: string): void;
}
export declare class FastbootUsbConnectionError extends Error {
    constructor(message?: string);
}
export declare class FastbootDeviceError extends Error {
    status: string;
    constructor(status: string, message: string);
}
export declare class FastbootDevice {
    device: USBDevice;
    serialNumber: string;
    in: USBEndpoint;
    out: USBEndpoint;
    session: FastbootSession;
    sessions: FastbootSession[];
    logger: Logger;
    constructor(device: USBDevice, logger?: Logger);
    setup(): void;
    connect(): Promise<void>;
    reconnect(): Promise<boolean>;
    waitForReconnect(): Promise<boolean>;
    getPacket(): Promise<ResponsePacket>;
    getPackets(): Promise<void>;
    sendCommand(text: string): Promise<ResponsePacket>;
    exec(command: string): Promise<ResponsePacket>;
    getVar(variable: string): Promise<string>;
    get lastPacket(): CommandPacket | ResponsePacket | null | undefined;
    get isActive(): boolean | null | undefined;
    transferData(buffer: ArrayBuffer): Promise<void>;
}
export {};
