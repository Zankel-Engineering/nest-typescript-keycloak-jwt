import { TerminusOptionsFactory, DNSHealthIndicator, TerminusModuleOptions, DiskHealthIndicator } from '@nestjs/terminus';
export declare class TerminusOptionsService implements TerminusOptionsFactory {
    private readonly dNSHealthIndicator;
    private readonly diskHealthIndicator;
    constructor(dNSHealthIndicator: DNSHealthIndicator, diskHealthIndicator: DiskHealthIndicator);
    createTerminusOptions(): TerminusModuleOptions;
}
