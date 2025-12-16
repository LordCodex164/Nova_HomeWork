import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { DatabaseModule } from 'src/database.module';
import { TransactionModule } from 'src/transaction/transaction.module';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [DatabaseModule, TransactionModule]
})
export class AuthModule {}
