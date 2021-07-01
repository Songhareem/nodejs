import { HttpException, HttpStatus, Injectable, Res } from "@nestjs/common";
import { Response } from "express";
import { UsersService } from "src/users/users.service";
import { RegisterDto, RegisterResultDto } from "./dtos/register.dto";
import * as bcrypt from 'bcrypt';
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { TokenPayload } from "./interfaces/tokenPayload.interface";
import { User } from "src/users/entities/user.entity";
import { LoginResultDto } from "./dtos/login.dto";
import { LogoutResultDto } from "./dtos/logout.dto";
import { RefreshResultDto } from "./dtos/refresh.dto";

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  public async register(registrationDto: RegisterDto): Promise<RegisterResultDto> {
    const hashedPassword = await bcrypt.hash(registrationDto.password, 10);
    try {
      const createdUser = await this.usersService.create({
        ...registrationDto,
        password: hashedPassword
      });
      createdUser.password = undefined;
      return {
        user: createdUser
      }
    } catch (error) {
      
      if(error.message === 'User already exist') {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      }
      throw new HttpException('Something went wrong: '+ error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  public async login(user: User, res: Response): Promise<LoginResultDto> {
    try {
      const {
        accessToken,
        ...accessTokenOption
      } = this.getCookieWithJwtAccessToken(user.id);
      
      const { 
        refreshToken,
        ...refreshTokenOption
      } = this.getCookieWithJwtRefreshToken(user.id);

      await this.usersService.setCurrentRefreshToken(refreshToken, user.id);

      res.cookie('Authentication', accessToken, accessTokenOption);
      res.cookie('Refresh', refreshToken, refreshTokenOption);

      user.password = undefined;
      user.currentHashedRefreshToken = undefined;
      return {
        user
      };

    } catch (error) {
      throw new HttpException('Login failure', HttpStatus.BAD_REQUEST)
    }
  }

  public async logout(userId: number, res: Response): Promise<LogoutResultDto> {
    try {
      const {
        accessOption,
        refreshOption
      } = this.getCookiesForLogOut();

      await this.usersService.removeRefreshToken(userId);

      res.cookie('Authentication', '', accessOption);
      res.cookie('Refresh', '', refreshOption);

      return {
        ok: true
      }
    } catch(error) {
      throw new Error(error);
    }
  }

  public async refresh(user: User, res: Response): Promise<RefreshResultDto> {
    const { 
      accessToken,
      ...accessTokenOption
    } = this.getCookieWithJwtAccessToken(user.id);
  
    res.cookie('Authentication', accessToken, accessTokenOption);

    user.password = undefined;
    user.currentHashedRefreshToken = undefined;
    return {
      user
    }
  }

  private getCookieWithJwtAccessToken(userId: number) {
    const payload: TokenPayload = { userId };
    const token = this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_ACCESS_TOKEN_SECRET'),
      expiresIn: `${this.configService.get('JWT_ACCESS_TOKEN_EXPIRATION_TIME')}s`
    });
    // return {
    //   cookie: `Authentication=${token}; HttpOnly; Path=/; Max-Age=${this.configService.get('JWT_ACCESS_TOKEN_EXPIRATION_TIME')}`,
    //   token
    // }
    return {
      accessToken: token,
      domain: 'localhost',
      path: '/',
      httpOnly: true,
      maxAge: Number(this.configService.get('JWT_ACCESS_TOKEN_EXPIRATION_TIME')) * 1000,
    }
  }

  private getCookieWithJwtRefreshToken(userId: number) {
    const payload: TokenPayload = { userId };
    const token = this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_REFRESH_TOKEN_SECRET'),
      expiresIn: `${this.configService.get('JWT_REFRESH_TOKEN_EXPIRATION_TIME')}s`
    });
    // return {
    //   cookie: `Refresh=${token}; HttpOnly; Path=/; Max-Age=${this.configService.get('JWT_REFRESH_TOKEN_EXPIRATION_TIME')}`,
    //   token
    // }
    return {
      refreshToken: token,
      domain: 'localhost',
      path: '/',
      httpOnly: true,
      maxAge: Number(this.configService.get('JWT_REFRESH_TOKEN_EXPIRATION_TIME')) * 1000,
    }
  }

  public getCookiesForLogOut() {
    // return [
    //   'Authentication=; HttpOnly; Path=/; Max-Age=0',
    //   'Refresh=; HttpOnly; Path=/; Max-Age=0'
    // ];
    return {
      accessOption: {
        domain: 'localhost',
        path: '/',
        httpOnly: true,
        maxAge: 0,
      },
      refreshOption: {
        domain: 'localhost',
        path: '/',
        httpOnly: true,
        maxAge: 0,
      },
    }
  }

  public async getAuthenticatedUser(email: string, plainTextPassword: string) {
    try {
      const user = await this.usersService.getByEmail(email);
      await this.verifyPassword(plainTextPassword, user.password);
      return user;
    } catch (error) {
      throw new HttpException('Wrong credentials provided', HttpStatus.BAD_REQUEST);
    }
  }

  private async verifyPassword(plainTextPassword: string, hashedPassword: string) {
    const isPasswordMatching = await bcrypt.compare(
      plainTextPassword,
      hashedPassword
    );
    if (!isPasswordMatching) {
      throw new HttpException('Wrong credentials provided', HttpStatus.BAD_REQUEST);
    }
  }

//   public async getUserFromAuthenticationToken(token: string) {
//     const payload: TokenPayload = this.jwtService.verify(token, {
//       secret: this.configService.get('JWT_ACCESS_TOKEN_SECRET')
//     });
//     if (payload.userId) {
//       return this.usersService.getById(payload.userId);
//     }
//   }
}