import { ZipReader, BlobReader } from "@zip.js/zip.js";
import type { FastbootClient } from "./client.js";
export declare class FastbootFlasher {
    client: FastbootClient;
    reader: ZipReader<BlobReader>;
    constructor(client: FastbootClient, blob: Blob);
    runFlashAll(): Promise<void>;
    run(instructions: string): Promise<void>;
}
