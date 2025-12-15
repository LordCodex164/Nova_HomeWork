import {Body, Controller, Get, Post, Res} from "@nestjs/common"
import { WalletService } from "./wallet.service";
import { create } from "domain";
import { CreateWalletDto } from "./dto/create-wallet.dto";

@Controller("wallet")

export class WalletController {
    constructor(private readonly walletService: WalletService) {}

    @Post("/create")
    createWallet(
        @Body()
        createWalletDto: CreateWalletDto,
        @Res() res,

    ) {
        //return this.walletService.createWallet(createWalletDto, res);
    }
    @Get()
    findAll() {
        return 
    }
}