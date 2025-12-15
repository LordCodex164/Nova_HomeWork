import { ValidationSchema } from "src/types/validation";

export class CreateWalletDto {
    id: number;
    currency: string;
    balance: number
}

export const CreateWalletSchema: ValidationSchema = {
    id: {
        required: {message: "wallet id is required to create a wallet"},
    },
    currency: {
        required: {message: "kindly provide a currency"}
    },
    balance: {
        required: {message: "balance is required to create a wallet"}
    }
}