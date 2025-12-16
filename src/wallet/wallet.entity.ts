
import { DataTypes } from 'sequelize';
import { Table, Column, Model, BelongsTo, ForeignKey } from 'sequelize-typescript';
import { User } from 'src/auth/auth_user.entity';

@Table({ timestamps: true, underscored: true })
export class Wallet extends Model {
    @Column({ primaryKey: true, autoIncrement: true })
    id: number;

    @Column({
        defaultValue: 0,
    })
    balance: number;

    @Column({
        type: DataTypes.ENUM({
            values: ['USD', 'EUR', 'GBP', 'NGN', 'JPY', 'CNY']
        }), allowNull: false, defaultValue: 'USD',
    })
    currency: string;

    @ForeignKey(() => User)
    @Column
    user_id: string;

    @BelongsTo(() => User)
    user: User

}