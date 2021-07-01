import * as Influx from "influx";

export interface InfluxModuleOptions {
    host: string;
    port: number;
    protocol?: string;
    username?: string;
    password?: string;
    database: string;
    schema: [
        {
            measurement: string;
            fields: {
                [name: string]: Influx.FieldType
            }
            tags: string[];
        }
    ]
}