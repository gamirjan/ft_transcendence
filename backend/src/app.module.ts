  import { Module } from '@nestjs/common';
  import { AppController } from './app.controller';
  import { AppService } from './app.service';
  import { ShutdownService} from './signal.service'
  import { ConfigModule } from '@nestjs/config';
  import { TypeOrmModule } from '@nestjs/typeorm';
  import config from './ormconfig'
  import { UsersController } from './Users/user.controller';
  import { UsersService } from './Users/user.service';
import { UsersModule } from './Users/users.module';
import { UserRepository } from './Users/user.repository';
import { User } from './Users/user.entity';
import { AddUsersService } from './AddUser/addUser.service';
import { AddUsersController } from './AddUser/addUsers.controller';


  @Module({
    imports: [
      ConfigModule.forRoot({isGlobal:true}),
      TypeOrmModule.forRoot(config),
      UsersModule,
      TypeOrmModule.forFeature([User, UserRepository]),
    ],
    controllers: [AppController,UsersController, AddUsersController],
    providers: [AppService, ShutdownService,UsersService,AddUsersService],
  })
  export class AppModule {
    constructor(){
      console.log("app module called");
      // createPostgreSQLConnection();
      
    }
  }
