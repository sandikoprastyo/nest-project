import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findByUsername(username);
  
    if (!user) {
      // console.log('User not found');
      return null;
    }
  
    // console.log('User found:', user);
  
    const isPasswordValid = await bcrypt.compare(password, user.password);
  
    if (isPasswordValid) {
      // console.log('Password is valid');
      const { password, ...result } = user;
      return result;
    } else {
      // console.log('Password is invalid');
      return null;
    }
  }
  

  async login(user: any) {
    const payload = { username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async signUp(username: string, password: string): Promise<string> {
    try {
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      const existingUser = await this.usersService.findByUsername(username);
      if (existingUser) {
        return 'User already exists';
      }

      const createUserDto: CreateUserDto = {
        username,
        password: hashedPassword,
      };
      
      await this.usersService.create(createUserDto);
      return 'User created successfully';
    } catch (error) {
      console.error('Error during signup:', error);
      throw new Error('Error during signup');
    }
  }
}
