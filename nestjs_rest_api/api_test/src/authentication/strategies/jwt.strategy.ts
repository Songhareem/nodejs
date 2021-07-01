import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Reflector } from "@nestjs/core";
import { PassportStrategy } from "@nestjs/passport";
import { Request } from "express";
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersService } from "src/users/users.service";
import { TokenPayload } from "../interfaces/tokenPayload.interface";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor (
        private readonly configService: ConfigService,
        private readonly usersService: UsersService,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([(request: Request) => {
                return request?.cookies?.Authentication;
            }]),
            // jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),   // jwtFromRequest: JWT 추출 방법 설정 (request의 Authorization 에 토큰 제공)
            //                                                             //                  Authorization : Bearer TOKEN_VALUE
            //ignoreExpiration: false,                                    // flase 라면, JWT 만료 확인후, 만료라면 401 에러 발생
            secretOrKey: configService.get('JWT_ACCESS_TOKEN_SECRET'),  // secret 키 설정
        });
    }

    async validate(payload: TokenPayload) {
        return this.usersService.getById(payload.userId);
    }
}