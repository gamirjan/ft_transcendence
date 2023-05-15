import { Get, Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { GoogleStrategy } from "./utils/googleStrategy";
import { PassportModule } from "@nestjs/passport";

@Module({
    imports: [
      PassportModule.register({ defaultStrategy: 'google' }),
    ],
    providers: [
      AuthService,
      GoogleStrategy,
    ],
  })
  export class AuthModule {}

/* @Module({
    controllers:[AuthController],
    providers:[GoogleStrategy],
})
export class AuthModule {
    
} */