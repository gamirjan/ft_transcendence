"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config = {
    type: 'postgres',
    host: "postgresqltransendence.postgres.database.azure.com",
    port: 5432,
    database: "development",
    username: "admin2",
    password: "MekDad!89!",
    autoLoadEntities: true,
    synchronize: true,
    entities: ['src/**/*.entity.ts'],
    ssl: true,
};
exports.default = config;
//# sourceMappingURL=ormconfig.js.map