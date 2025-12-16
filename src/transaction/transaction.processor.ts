import { OnWorkerEvent, Processor, WorkerHost } from "@nestjs/bullmq";
import { Inject, Injectable } from "@nestjs/common";
import { Job } from "bullmq";
import { Transaction } from "./transaction.entity";
import { Wallet } from "src/wallet/wallet.entity";

@Injectable()
@Processor("transaction")
export class TransactionProcessor extends WorkerHost {
    constructor(
        @Inject('TRANSACTIONS_REPOSITORY')
        private readonly transactionRepository: typeof Transaction,
    ) {
        super()
        console.log("worker initialized")
    }

    async process(job: Job<any, any, string>): Promise<any> {
        try{
       const transaction = await this.transactionRepository.findOne({
            where:{
                id: job.data.id,
            },
            include: [Wallet]
        })
        const wallet = transaction.wallet
        let balance:number = (wallet as any).balance
        if(transaction.type == "Credit"){
            balance = balance + transaction.amount
        }
        else {
            balance = balance - transaction.amount
        }
        await wallet.update({
            balance
        })
        }
        catch(error) {
            console.log('error', error)
        }
        
    }

    @OnWorkerEvent("completed")
    onCompleted() {
        console.log("transaction queue completed")
    }

    @OnWorkerEvent('failed')
     onFailed(job: Job, error: Error) {
    console.error(`Failed email job: ${job.name}, error`);
   }

  @OnWorkerEvent('stalled')
  onStalled(job: Job) {
    console.warn(
      `Stalled email job: ${job.name} - Event: ${job.data.eventName}`,
    );
  }

}