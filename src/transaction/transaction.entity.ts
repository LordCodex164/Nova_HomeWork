
import { DataTypes } from 'sequelize';
import { Table, Column, Model, BelongsTo, ForeignKey } from 'sequelize-typescript';
import { User } from 'src/auth/auth_user.entity';
import { Wallet } from 'src/wallet/wallet.entity';

@Table({ timestamps: true, underscored: true })
export class Transaction extends Model {
    @Column({ primaryKey: true, autoIncrement: true })
    id: number;

    @Column
    amount: number;

    @Column({
        allowNull: true
    })
    narration: string;

    @Column({
        type: DataTypes.ENUM("Credit", "Debit")
    })
    type: "Credit" | "Debit"

    @Column({
        type: DataTypes.ENUM("PENDING", "PROCESSING", "SUCCESSFUL", "FAILED"),
        defaultValue: "PENDING"
    })
    status: "PENDING" | "PROCESSING" | "SUCCESSFUL" | "FAILED"

    @ForeignKey(() => Transaction)
    @Column
    transaction_id: string;

    @BelongsTo(() => Transaction)
    transaction: Transaction;

    @ForeignKey(() => Wallet)
    @Column
    wallet_id: string;

    @BelongsTo(() => Wallet)
    wallet: Wallet

    @ForeignKey(() => User)
    @Column
    user_id: string;
    
    @BelongsTo(() => User)
    user: User

}