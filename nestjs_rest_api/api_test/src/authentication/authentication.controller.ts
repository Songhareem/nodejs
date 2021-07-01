import { Body, Controller, Get, HttpCode, Post, Req, Request, Res, UseGuards } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { Response } from "express";
import { AuthenticationService } from "./authentication.service";
import { LogInDto, LoginResultDto } from "./dtos/login.dto";
import { LogoutResultDto } from "./dtos/logout.dto";
import { RefreshResultDto } from "./dtos/refresh.dto";
import { RegisterDto, RegisterResultDto } from "./dtos/register.dto";
import { JwtRefreshGuard } from "./guards/jwt-refresh.guard";
import { LocalAuthenticationGuard } from "./guards/local-authentication.guard";

@Controller('authentication')
@ApiTags('Authentication')
export class AuthenticationController {

    constructor(
        private readonly authenticationService: AuthenticationService,
    ) {}

    @Post('register')
    register(@Body() registrationDto: RegisterDto): Promise<RegisterResultDto> {
        console.log('asdasd');
        return this.authenticationService.register(registrationDto);
    }

    @UseGuards(LocalAuthenticationGuard)
    @Post('login')
    login (
        @Body() LogInDto: LogInDto,                     // for swagger
        @Req() req,                                     // useGuard
        @Res({ passthrough: true }) res: Response       // for setHeader
    ): Promise<LoginResultDto> {
        const { user } = req;
        return this.authenticationService.login(user, res);
    }

    @UseGuards(JwtRefreshGuard)
    @Post('logout')
    logout(
        @Req() req,
        @Res({ passthrough: true }) res: Response
    ): Promise<LogoutResultDto> {
        const { user } = req;
        return this.authenticationService.logout(user.id, res);
    }

    @UseGuards(JwtRefreshGuard)
    @Get('refresh')
    refresh(
        @Req() req,
        @Res({ passthrough: true }) res: Response
    ): Promise<RefreshResultDto> {
        const { user } = req;
        return this.authenticationService.refresh(user, res);
    }
}