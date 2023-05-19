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
import { FriendController } from './UserFriend/UserFriend.controller';
import { UserFriendService } from './UserFriend/UserFriend.service';
import { UserFriend } from './UserFriend/UserFriend.entity';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';

  @Module({
    imports: [
      ConfigModule.forRoot({isGlobal:true}),
      TypeOrmModule.forRoot(config),
      UsersModule,
      TypeOrmModule.forFeature([User, UserRepository,UserFriend]),  
    ],
    controllers: [AppController,UsersController, AddUsersController,FriendController,AuthController],
    providers: [AppService, ShutdownService,UsersService,AddUsersService,UserFriendService,AuthService],
  })
  export class AppModule {
    constructor(){
      console.log("app module called");
    /*   // createPostgreSQLConnection();
     let  UID = "Your application uid"
     let SECRET = "Your secret token"
    // Create the client with your credentials
    let client = OAuth2.Client.new(UID, SECRET, site: "https://api.intra.42.fr")
    //   Get an access token
     let token = client.client_credentials.get_token */
      
    }
  }
