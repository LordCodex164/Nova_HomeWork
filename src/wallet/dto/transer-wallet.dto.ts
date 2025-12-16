import { IsNotEmpty, IsNumber, Min } from "class-validator";

export class TransferWalletDto {
    @IsNotEmpty()
    @IsNumber()
    @Min(1)
    amount: number;

    @IsNotEmpty()
    recipientWalletId: number;
}