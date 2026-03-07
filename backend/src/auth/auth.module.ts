import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from 'src/users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [UsersModule,PassportModule,ConfigModule,
    JwtModule.registerAsync({
    imports: [ConfigModule],
    useFactory: (configService: ConfigService): JwtModuleOptions => ({
      secret: configService.get<string>('JWT_SECRET'),
      signOptions: { expiresIn: configService.get('JWT_EXPIRES_IN', '1d') },
    }),
    inject: [ConfigService],
  })
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
