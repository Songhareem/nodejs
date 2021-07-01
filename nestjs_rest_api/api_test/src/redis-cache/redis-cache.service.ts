import { CACHE_MANAGER, Inject, Injectable } from "@nestjs/common";
import { Cache } from 'cache-manager';

export enum CacheKeys {
    PrinterTypeIndex = "PrinterTypeIndex",
    PrinterTypeReq = "PrinterTypeReq",
}

@Injectable()
export class RedisCacheService {
    constructor(
        @Inject(CACHE_MANAGER) private readonly cache: Cache
    ) {
        this.init();
    }

    private async init() {
        try {
            const printerTypeIndex = this.cache.get(CacheKeys.PrinterTypeIndex);
            if(!printerTypeIndex) {
                await this.cache.set(CacheKeys.PrinterTypeIndex, 1);
            }
        } catch(error) {
            throw new Error(error);
        }
    }

    async get(key: string) {
        try {
            return await this.cache.get(key);
        } catch(error) {
            throw new Error(error);
        }
    }

    async set(key: string, value: any, ttl: number=null) {
        try {
            await this.cache.set(key, value, { ttl });
        } catch(error) {
            throw new Error(error);
        }
    }

    async del(key: string) {
        try {
            await this.cache.del(key);
        } catch(error) {
            throw new Error(error);
        }
    }

    async reset() {
        try {
            await this.cache.reset();

        } catch(error) {
            throw new Error(error);
        }
    }
}