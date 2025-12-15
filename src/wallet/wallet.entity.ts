
import { DataTypes } from 'sequelize';
import { Table, Column, Model } from 'sequelize-typescript';

@Table({ timestamps: true, underscored: true })
export class Wallet extends Model {
    @Column({ primaryKey: true, autoIncrement: true })
    id: number;

    @Column
    balance: number;

    @Column({
        type: DataTypes.ENUM({
            values: ['USD', 'EUR', 'GBP', 'NGN', 'JPY', 'CNY']
        }), allowNull: false, defaultValue: 'USD',
    })
    currency: string;
}