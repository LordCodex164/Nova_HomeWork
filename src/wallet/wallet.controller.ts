import { Body, Controller, Get, Param, Post, Req, Res, UseGuards } from "@nestjs/common"
import { WalletService } from "./wallet.service";
import { CreateWalletDto } from "./dto/create-wallet.dto";
import { Response, Request } from "express";
import { AuthGuard } from "src/auth/auth.guard";
import handleError from "src/utils/handle_error";
import { FundWalletDto } from "./dto/fund-wallet.dto";
import { TransferWalletDto } from "./dto/transer-wallet.dto";
import { Transaction } from "src/transaction/transaction.entity";
import { IResponse } from "src/types/response";
import { Wallet } from "./wallet.entity";

@Controller("wallet")
export class WalletController {
    constructor(private readonly walletService: WalletService) { }

    @UseGuards(AuthGuard)
    @Post("/create")
    async createWallet(
        @Body()
        createWalletDto: CreateWalletDto,
        @Req() req: Request,
        @Res({ passthrough: true }) res: Response,
    ) {
        try {
            const wallet = await this.walletService.createWallet(req["user"]?.id, createWalletDto);
            return {
                status: "success",
                message: "Wallet created successfully",
                data: {
                    wallet
                }
            }
        } catch (error) {
            return handleError(error, res)
        }

    }

    @Get("/all")
    findAll() {
        return
    }

    @UseGuards(AuthGuard)
    @Get("/:id")
    async findOne(
        @Param("id")
        id: string,
        @Req() req: Request,
        @Res({ passthrough: true }) res: Response,
    ): Promise<IResponse<{
        wallet: Wallet
    }>>  {
        try {
            const wallet = await this.walletService.findOne(req["user"]?.id, id)
            return {
                status: "success",
                message: "Wallet Successfully Retrieved",
                data: {
                    wallet
                }
            }
        } catch (error) {
            return handleError(error, res)
        }
    }

    @UseGuards(AuthGuard)
    @Post("/:id/fund")
    async fundWallet(
        @Body()
        fundWalletDto: FundWalletDto,
        @Param("id")
        id: string,
        @Req() req: Request,
        @Res({ passthrough: true }) res: Response,
    ) :Promise<IResponse<{
        transaction: any
    }>> {
        try {
          const transaction = await this.walletService.fundWallet(
            req["user"].id, 
            id, 
            fundWalletDto, 
            res)
          return {
            status: "success",
            message: "Fund Wallet request successful",
            data: {
                transaction
            }
          }
        } catch (error) {
            return handleError(error, res)
        }
    }

    @UseGuards(AuthGuard)
    @Post("/:id/transfer")
    async transfer(
        @Body()
        transferWalletDto: TransferWalletDto,
        @Param("id")
        id: string,
        @Req() req: Request,
        @Res({ passthrough: true }) res: Response,
    ) : Promise<IResponse<{
        transaction: Transaction
    }>> {
        try {
          const transaction = await this.walletService.transfer(req["user"].id, id, transferWalletDto)
          return {
            status: "success",
            message: "Fund Wallet request successful",
            data: {
                transaction
            }
          }
        } catch (error) {
            console.log("error", error)
            return handleError(error, res)
        }
    }
}