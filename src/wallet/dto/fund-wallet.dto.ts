import { IsNotEmpty, IsNumber, Min } from "class-validator";

export class FundWalletDto {
    @IsNotEmpty()
    @IsNumber()
    @Min(1)
    amount: number;

    narration: string;
}