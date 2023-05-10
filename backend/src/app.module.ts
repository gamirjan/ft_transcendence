import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ShutdownService} from './signal.service'
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal:true}),
    TypeOrmModule.forRoot({
      type : 'postgres',
      host: process.env.HOST,
      port:parseInt(<string>process.env.PORT),
      username: <string>process.env.USER_NAME,
      password:<string>process.env.PASS,
      synchronize: true,
    })
  ],
  controllers: [AppController],
  providers: [AppService, ShutdownService],
})
export class AppModule {}
