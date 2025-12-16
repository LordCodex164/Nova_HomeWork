import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { DatabaseModule } from 'src/database.module';
import { TransactionModule } from 'src/transaction/transaction.module';
import { JwtModule } from '@nestjs/jwt';
import getEnv from 'src/utils/get_env';
import { authProviders } from './auth.providers';

@Module({
  controllers: [AuthController],
  providers: [...authProviders, AuthService],
  imports: [DatabaseModule, TransactionModule, 
    JwtModule.register({
      global: true,
      secret: getEnv("JWT_SECRET"),
      signOptions: { expiresIn: '45m' },
    }), 
  ]
})
export class AuthModule {}
