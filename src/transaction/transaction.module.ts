import { Module } from "@nestjs/common";
import { TransactionService } from "./transaction.service";
import { TransactionController } from "./transaction.controller";
import { transactionsProviders } from "./transaction.providers";
import { DatabaseModule } from "src/database.module";
import { BullModule } from "@nestjs/bullmq";
import { TransactionProcessor } from "./transaction.processor";

@Module({
  imports: [
    DatabaseModule,
    BullModule.registerQueue({
      name: "transaction",
    }),
  ],
  controllers: [TransactionController],
  providers: [...transactionsProviders, TransactionService, TransactionProcessor],
  exports: [...transactionsProviders, TransactionService],
})
export class TransactionModule {}
