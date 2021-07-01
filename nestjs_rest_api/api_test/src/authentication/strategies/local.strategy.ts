import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { User } from "src/users/entities/user.entity";
import { AuthenticationService } from "../authentication.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    
    constructor (private authenticateService: AuthenticationService) {
        super({
            usernameField: 'email'
        });
    }
    async validate(email: string, password: string): Promise<User> {
        const user = this.authenticateService.getAuthenticatedUser(email, password);
        if(!user) {
            throw new UnauthorizedException();
        }
        return user;
    }
}