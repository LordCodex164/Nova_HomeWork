import { InjectQueue } from '@nestjs/bullmq';
import { Inject, Injectable } from '@nestjs/common';
import { Queue } from 'bullmq';
import { Transaction } from './transaction.entity';
import handleError from 'src/utils/handle_error';

@Injectable()
export class TransactionService {
    constructor(
        @InjectQueue("transaction")
        private transactionQueue: Queue,
        @Inject('TRANSACTIONS_REPOSITORY')
        private readonly transactionRepository: typeof Transaction,
    ){}

    async createTransaction(
        transaction: {
            amount: number,
            user_id: string,
            wallet_id: string,
            narration: string,
            type: "Credit" | "Debit"
        }
    ) {
        try{
        const txn = await this.transactionRepository.create(transaction)
        console.log(">>added to the queue")
        this.transactionQueue.add("transaction_update", {
            ...txn.dataValues
        })
        return txn
        }
        catch(error){
            console.log(error, "error")
            //return handleError(error, res)
        }
        
    }



}
