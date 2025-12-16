
import { DataTypes, NonAttribute } from 'sequelize';
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
        type: DataTypes.ENUM({
            values: ['USD', 'EUR', 'GBP', 'NGN', 'JPY', 'CNY']
        }), allowNull: false, defaultValue: 'USD',
    })
    currency: string;

    @ForeignKey(() => Wallet)
    @Column
    wallet_id: string;

    @BelongsTo(() => Wallet)
    wallet: NonAttribute<typeof Wallet>

    @ForeignKey(() => User)
    @Column
    user_id: string;
    
    @BelongsTo(() => User)
    user: NonAttribute<typeof User>
}