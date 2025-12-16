import { Module } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { TransactionController } from './transaction.controller';
import { transactionsProviders } from './transaction.providers';
import { DatabaseModule } from 'src/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [TransactionController],
  providers: [...transactionsProviders, TransactionService],
  exports: [TransactionService]
})
export class TransactionModule {}
