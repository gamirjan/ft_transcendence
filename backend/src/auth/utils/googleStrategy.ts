import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-google-oauth20';
import { AuthService } from '../auth.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject('AUTH_SERVICE') private readonly authService: AuthService,
  ) {
    super({
      clientID: '472681490682-cofucv7fr3j0v654ti873v4flktohgdq.apps.googleusercontent.com',
      clientSecret: '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',
      callbackURL: 'http://localhost:7000/auth/google/redirect',
      scope: ['profile', 'email'],
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: Profile) {
    console.log(accessToken);
    console.log(refreshToken);
    console.log(profile);
    const user = await this.authService.validateUser({
      email: profile.emails[0].value,
      displayname: profile.displayName,
    });
    console.log('Validate');
    console.log(user);
    return user || null;
  }
}
