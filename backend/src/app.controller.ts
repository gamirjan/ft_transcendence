import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { AppService } from './app.service';
import { 
  createConnection,getConnection } from 'typeorm';
require ('dotenv')


// async function createPostgreSQLConnection() {
//   const connection = await createConnection({
//       type : 'postgres',
//       host: "postgresqltransendence.postgres.database.azure.com",
//       port:parseInt(<string>process.env.PORT),
//       database: "development",
//       username: "admin2",
//       password:  "MekDad!89!",
//       entities: [__dirname + '/**/*.entity{.ts,.js}'],
//       synchronize: true,
//       ssl: true,
//     //synchronize: true,
//     //logging: true,
//     //entities: [__dirname + '/**/*.entity.ts'],
//   });
  
//   console.log('PostgreSQL connection created');
// }

// createPostgreSQLConnection();



async function checkPostgreSQLConnection() {
  // const connection = getConnection('postgresqltransendence.postgres.database.azure.com');
  // const isConnected = await connection.isConnected;
  // if (isConnected) {
  //   console.log('PostgreSQL connection is active');
  // } else {
  //   console.log('PostgreSQL connection is not active');
  // }


}

@Controller("game")
export class AppController {
  constructor(private readonly appService: AppService) {}

  // @Get("/hello")
  // hello(@Req() request: Request): string {
  //   return 'hello';//this.appService.getHello();
  // }  
  @Post()
  create(@Body() userData: string): string {
    console.log(userData);
    return `Post request called with param #${userData}.`;
  }
  @Get()
  gameGet(): string {
    checkPostgreSQLConnection();
    return `Get request.`;
  }
  @Get("/login")
  login(): string {
    return this.appService.getHello();
  }
}
