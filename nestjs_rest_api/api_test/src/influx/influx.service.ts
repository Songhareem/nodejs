import { Inject, Injectable } from "@nestjs/common";
import * as Influx from 'influx';
import { INFLUX_OPTIOS } from "./influx.constants";
import { InfluxModuleOptions } from "./influx.interfaces";

@Injectable()
export class InfluxService {

    private influx;

    constructor(
        @Inject(INFLUX_OPTIOS) private readonly options: InfluxModuleOptions,
    ) {
        // console.log("Influx Options")
        // console.log(options);

        this.influx = new Influx.InfluxDB({
            host: options.host,
            port: options.port,
            database: options.database,
            username: !options.username? "admin":options.username,
            password: !options.password? "adminPassword":options.password,
            schema: options.schema
            // schema: [{
            //     measurement: options.schema[0].measurement,
            //     fields: {
            //         path: Influx.FieldType.STRING,
            //         durations: Influx.FieldType.INTEGER
            //     },
            //     tags: ["1", "2"],
            // }]
        })
    }

    async init() {
        await this.influx.getDatabaseNames()
            .then(names => {
                if (!names.includes('express_response_db')) {
                    return this.influx.createDatabase('express_response_db');
                }
            })
    }
}