import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UserResponseDto } from 'src/users/dto/user-response.dto';

@Injectable()
export class AuthService {

  constructor(private usersService: UsersService,private jwtService: JwtService) {}

  async validateUser(createAuthDto: CreateAuthDto) {
    const { email, password } = createAuthDto;
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const { password: _, ...result } = user;
    return { access_token: this.jwtService.sign(result) };
  }

  async register(createUserDto: CreateUserDto): Promise<UserResponseDto> {
    return this.usersService.create(createUserDto);
  }
}
