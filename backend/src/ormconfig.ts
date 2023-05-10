import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { MysqlConnectionOptions } from "typeorm/driver/mysql/MysqlConnectionOptions";
import { SqliteConnectionOptions } from "typeorm/driver/sqlite/SqliteConnectionOptions";

const config :TypeOrmModuleOptions= 
{
    type : 'postgres',
    host: "postgresqltransendence.postgres.database.azure.com",
    port:5432,
    database: "development",
    username: "admin2",
    password:  "MekDad!89!",
    autoLoadEntities: true,
    synchronize: true,
    entities:['dist/**/*.entity.ts'],
    ssl: true,


}

export default config