import { Transaction } from "./transaction.entity";

export const transactionsProviders = [
    {
        provide: "TRANSACTIONS_REPOSITORY",
        useValue: Transaction
    }
]