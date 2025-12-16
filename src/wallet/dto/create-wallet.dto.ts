import {
    IsNotEmpty,
    IsEnum
  } from 'class-validator';
  
  export class CreateWalletDto {
    @IsNotEmpty({
        message: "Wallet Currency is required"
    })
    @IsEnum(['USD', 'EUR', 'GBP', 'NGN', 'JPY', 'CNY'], {
        message: "Currency must be one of these options"
    })
    currency: string
  }