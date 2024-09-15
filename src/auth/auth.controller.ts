import {
  Controller,
  Post,
  Body,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  async signUp(
    @Body() body: { username: string; password: string },
    @Res() res: Response,
  ) {
    // Validasi panjang password
    if (body.password.length < 6) {
      return res
        .status(400)
        .json({
          response: 'error',
          message: 'Password must be longer than 6 characters',
        });
    }

  try {
      const user = await this.authService.signUp(body.username, body.password);
      return res.json({ response: 'success', message: user });
    } catch (error) {
      return res.status(500).json({ response: 'error', message: 'Error during signup' });
    }
  }

  @Post('login')
  async login(
    @Body() body: { username: string; password: string },
    @Res() res: Response,
  ) {
    const user = await this.authService.validateUser(
      body.username,
      body.password,
    );
    if (!user) {
      res
        .status(401)
        .json({ response: 'success', message: 'Invalid credentials' });
      throw new UnauthorizedException('Invalid credentials');
    }
    const token = await this.authService.login(user);
    return res.status(200).json({ response: 'success', token });
  }
}
