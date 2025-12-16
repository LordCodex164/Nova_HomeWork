import {
  BadRequestException,
  HttpStatus,
  Inject,
  Injectable,
} from "@nestjs/common";
import { Wallet } from "./wallet.entity";
import { CreateWalletDto } from "./dto/create-wallet.dto";
import { FundWalletDto } from "./dto/fund-wallet.dto";
import { Response } from "express";
import { TransactionService } from "src/transaction/transaction.service";
import { TransferWalletDto } from "./dto/transer-wallet.dto";
import handleError from "src/utils/handle_error";

@Injectable()
export class WalletService {
  constructor(
    @Inject("WALLETS_REPOSITORY")
    private readonly walletRepository: typeof Wallet,
    private readonly transactionService: TransactionService
  ) {}
  async createWallet(userId: string, createWallet: CreateWalletDto) {
    return await this.walletRepository.create({
      ...createWallet,
      user_id: userId,
    });
  }

  async fundWallet(
    userId: string,
    walletId: string,
    fundWallet: FundWalletDto,
    res: Response
  ) {
    try{
        const existing_wallet = await this.walletRepository.findOne({
            where: {
              user_id: userId,
              id: walletId,
            },
          });
            
          if (!existing_wallet) {
            res.statusCode = HttpStatus.BAD_REQUEST;
            throw new BadRequestException("Wallet already exists");
          }
            
          const transaction = await this.transactionService.createTransaction({
            amount: fundWallet.amount,
            user_id: userId,
            wallet_id: walletId,
            narration: fundWallet.narration,
            type: "Credit"
          });
             
          return transaction;
    }
    catch(error){
        return handleError(error, res)
    }
  }

  async transfer(
    userId: string,
    walletId: string,
    transferWalletDto: TransferWalletDto
  ) {
    const wallet = await this.walletRepository.findOne({
        where: {
            user_id: userId,
            id: walletId
        }
    });
    
    if(wallet.balance < transferWalletDto.amount) {
        throw new BadRequestException("Insufficient Balance")
    }

    const recipientWalletId = await this.walletRepository.findOne({
        where:{
            id: transferWalletDto.recipientWalletId
        },
    })

    if(!recipientWalletId){
        throw new BadRequestException("Invalid Recipient Wallet id")
    }

    let transaction = await this.transactionService.createTransaction({
        amount: transferWalletDto.amount,
        user_id: userId,
        wallet_id: walletId,
        narration: "",
        type: "Debit",
    })

    const recipientTransaction = await this.transactionService.createTransaction({
        amount: transferWalletDto.amount,
        user_id: userId,
        wallet_id: walletId,
        narration: "I just got my alert!!",
        type: "Credit"
    })
    return transaction

  }

  async findOne(userId: string, walletId: string, response: Response) {
    try{
      const wallet = await this.walletRepository.findOne({
        where: {
          id: walletId,
          user_id: userId,
        },
      });
  
      if(!wallet){
        throw new BadRequestException("Invalid Request")
      }
      return wallet
    }
    catch(error){
      return handleError(error, response)
    }

  }
}
