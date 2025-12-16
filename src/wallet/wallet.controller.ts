import {Body, Controller, Get, Post, Req, Res, UsePipes, ValidationPipe} from "@nestjs/common"
import { WalletService } from "./wallet.service";
import { create } from "domain";
import { CreateWalletDto } from "./dto/create-wallet.dto";
import { Response, Request } from "express";

@Controller("wallet")

export class WalletController {
    constructor(private readonly walletService: WalletService) {}

    @Post("/create")
    createWallet(
        @Body()
        createWalletDto: CreateWalletDto,
        @Req() req: Request,
        @Res({passthrough: true}) res: Response,
    ) {
        return this.walletService.createWallet(createWalletDto, req, res);
    }
    @Get()
    findAll() {
        return 
    }
}