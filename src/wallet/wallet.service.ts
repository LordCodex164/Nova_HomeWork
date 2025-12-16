import { Inject, Injectable } from "@nestjs/common";
import { Wallet } from "./wallet.entity";
import { CreateWalletDto } from "./dto/create-wallet.dto";
import { Response } from "express";

@Injectable()
export class WalletService {
     constructor(
        @Inject('WALLETS_REPOSITORY')
        private readonly walletRepository: typeof Wallet,
     ){}
    createWallet(
        createWallet: CreateWalletDto,
        res: Response
    ) {
        this.walletRepository.create({
            ...createWallet
        });
    }
    fundWallet() {
    }
    transfer(){

    }
    fetchWallet() {

    } 
}