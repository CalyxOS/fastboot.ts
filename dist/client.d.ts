import { type FileEntry } from "@zip.js/zip.js";
import { FastbootDevice } from "./device.js";
export declare class FastbootError extends Error {
}
interface Logger {
    log(message: string): void;
}
interface KeyValueDict {
    [key: string]: string;
}
export declare class FastbootClient {
    fd: FastbootDevice;
    logger: Logger;
    var_cache: KeyValueDict;
    constructor(usb_device: USBDevice, logger?: Logger);
    getVar(variable: string): Promise<string>;
    getVarCache(variable: string): Promise<string>;
    lock(): Promise<void>;
    unlock(): Promise<void>;
    reboot(): Promise<void>;
    rebootBootloader(): Promise<void>;
    rebootFastboot(): Promise<void>;
    doFlash(partition: string, blob: Blob, slot?: "current" | "other" | "a" | "b", applyVbmeta?: boolean): Promise<void>;
    resizePartition(name: string, totalBytes: number): Promise<void>;
    flashing(command: "unlock" | "lock"): Promise<true | undefined>;
    fastbootInfo(entries: FileEntry[], text: string, wipe?: boolean): Promise<void>;
    updateSuper(entries: FileEntry[], wipe: boolean): Promise<void>;
    erase(partition: string): Promise<{
        status: "OKAY" | "FAIL" | "DATA" | "INFO" | "TEXT";
        message?: string;
        dataLength?: number;
    }>;
    setActiveOtherSlot(): Promise<{
        status: "OKAY" | "FAIL" | "DATA" | "INFO" | "TEXT";
        message?: string;
        dataLength?: number;
    }>;
    maxDownloadSize(): Promise<number>;
    unlocked(): Promise<boolean>;
    locked(): Promise<boolean>;
    currentSlot(): Promise<string>;
    otherSlot(): Promise<"a" | "b">;
    isUserspace(): Promise<boolean>;
    getUnlockData(): Promise<string>;
    static create(): Promise<FastbootClient>;
    static requestUsbDevice(): Promise<USBDevice>;
    static findOrRequestDevice(serialNumber: string): Promise<USBDevice>;
}
export {};
