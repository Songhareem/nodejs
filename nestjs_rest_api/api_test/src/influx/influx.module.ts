import { DynamicModule, Module } from '@nestjs/common';
import { INFLUX_OPTIOS } from './influx.constants';
import { InfluxModuleOptions } from './influx.interfaces';
import { InfluxService } from './influx.service';

@Module({})
export class InfluxModule {
    
    static forRoot(options: InfluxModuleOptions): DynamicModule {
        return {
            module: InfluxModule,
            providers: [
                {
                    provide: INFLUX_OPTIOS,
                    useValue: options,
                },
                InfluxService
            ],
            exports: [InfluxService],
        }
    }
}
