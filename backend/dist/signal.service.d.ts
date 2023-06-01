/// <reference types="node" />
import { Server } from 'http';
export declare class ShutdownService {
    private server;
    constructor();
    init(server: Server): void;
    private handleSignal;
}
