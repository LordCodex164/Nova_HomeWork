import {Controller, Get, Post} from "@nestjs/common"
import { WalletService } from "./wallet.service";

@Controller("wallet")

export class WalletController {
    constructor(private readonly walletService: WalletService) {}

    @Post("/create")
    createWallet() {
        return 
    }
    @Get()
    findAll() {
        return 
    }
}