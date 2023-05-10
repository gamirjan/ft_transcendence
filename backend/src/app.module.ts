  import { Module } from '@nestjs/common';
  import { AppController } from './app.controller';
  import { AppService } from './app.service';
  import { ShutdownService} from './signal.service'
  import { ConfigModule } from '@nestjs/config';
  import { TypeOrmModule } from '@nestjs/typeorm';
  import { getConnection } from 'typeorm';
  import { UserController } from './db.controller';
  import { UserService } from './db.service';


  @Module({
    imports: [
      ConfigModule.forRoot({isGlobal:true}),
      TypeOrmModule.forRoot({
        name:'replication',
        type : 'postgres',
        host: "postgresqltransendence.postgres.database.azure.com",
        port:5432,
        database: "development",
        username: "admin2",
        password:  "MekDad!89!",
        autoLoadEntities: true,
        synchronize: true,
        ssl: true,
      })
    ],
    controllers: [AppController,UserController],
    providers: [AppService, ShutdownService,UserService],
  })
  export class AppModule {
    constructor(){
      console.log("app module called");
      // createPostgreSQLConnection();
      
    }
  }
