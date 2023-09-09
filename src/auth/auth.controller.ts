import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { AccessTokenGuard } from 'src/common/guards/accessToken.guard';
import { RefreshTokenGuard } from 'src/common/guards/refreshToken.guard';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  signup(@Body() createUserDto: CreateUserDto) {
    return this.authService.signUp(createUserDto);
  }

  @Post('signin')
  async signin(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const { accessToken, refreshToken } = await this.authService.signIn(
      req.body,
    );

    res.cookie('jwt', refreshToken, {
      httpOnly: true, //accessible only by web server
      secure: true, //https
      sameSite: 'none', //cross-site cookie
      maxAge: 7 * 24 * 60 * 60 * 1000, //cookie expiry: set to match rT
    });

    return { accessToken };
  }

  @UseGuards(AccessTokenGuard)
  @Post('logout')
  logout(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    this.authService.logout(req.user['sub']);
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(204); //No content
    res.clearCookie('jwt', { httpOnly: true, sameSite: 'none', secure: true });
    return { message: 'Cookie cleared' };
  }

  @UseGuards(RefreshTokenGuard)
  @Get('refresh')
  async refreshTokens(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const userId = req.user['sub'];
    const oldRefreshToken = req.user['refreshToken'];
    const { accessToken, refreshToken } = await this.authService.refreshTokens(
      userId,
      oldRefreshToken,
    );

    res.cookie('jwt', refreshToken, {
      httpOnly: true, //accessible only by web server
      secure: true, //https
      sameSite: 'none', //cross-site cookie
      maxAge: 7 * 24 * 60 * 60 * 1000, //cookie expiry: set to match rT
    });

    return { accessToken };
  }
}
