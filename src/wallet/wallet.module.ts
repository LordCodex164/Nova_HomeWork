import { Module } from "@nestjs/common";
import { WalletController } from "./wallet.controller";
import { WalletService } from "./wallet.service";
import { walletsProviders } from "./wallet.provider";
import { DatabaseModule } from "src/database.module";
import { TransactionModule } from "src/transaction/transaction.module";

@Module({
    imports: [DatabaseModule, TransactionModule],
    providers:[...walletsProviders, WalletService],
    controllers: [WalletController],
    exports: [WalletService]
})

export class WalletModule{}