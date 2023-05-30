"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GoogleStrategy = void 0;
const passport_1 = require("@nestjs/passport");
const passport_google_oauth20_1 = require("passport-google-oauth20");
class GoogleStrategy extends (0, passport_1.PassportStrategy)(passport_google_oauth20_1.Strategy, 'google') {
    constructor(authService) {
        super({
            clientID: "313268611879-9nm02b6gb6r657fvl686cvtbuhmdf1vk.apps.googleusercontent.com",
            clientSecret: "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",
            callbackURL: 'http://localhost:7000/auth/google/redirect',
            scope: ['email', 'profile'],
        });
        this.authService = authService;
    }
    async validate(accessToken, refreshToken, profile, done) {
        const { name, emails, photos } = profile;
        const user = {
            firstName: name.givenName,
            lastName: name.familyName,
            email: emails[0].value,
            photo: photos[0].value,
            accessToken,
        };
        const result = await this.authService.validateOAuthLogin(user);
        done(null, result);
    }
}
exports.GoogleStrategy = GoogleStrategy;
//# sourceMappingURL=googleStrategy.js.map