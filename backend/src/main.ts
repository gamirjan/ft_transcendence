import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { 
    cors: {
      origin: ['http://localhost:3000','*']
    }
  });

  //const configService = app.get(ConfigService);
  // const port = configService.get('port');
  await app.listen(7000,()=>{console.log("server is listening on port 7000!")});
}
bootstrap();
