import { MysqlConnectionOptions } from "typeorm/driver/mysql/MysqlConnectionOptions";
import { SqliteConnectionOptions } from "typeorm/driver/sqlite/SqliteConnectionOptions";

const config :SqliteConnectionOptions = 
{
    type:'sqlite',
    database:'postgres',
    entities:['dist/src/**/*.entity.ts'],
    synchronize:true,


}

export default config