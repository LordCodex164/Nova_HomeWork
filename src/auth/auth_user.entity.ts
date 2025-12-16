import { Table, Column, Model, HasMany } from "sequelize-typescript";
import { Transaction } from "src/transaction/transaction.entity";
import { Wallet } from "src/wallet/wallet.entity";
import * as bcrypt from "bcrypt";

@Table({ timestamps: true, underscored: true })
export class User extends Model {
  @Column({ primaryKey: true, autoIncrement: true })
  id: number;

  @Column
  firstname: string;

  @Column
  lastname: string;

  @Column
  email: string;

  @Column({
    set(val: string) {
      let hashedValue = null;
      if (val) {
        hashedValue = bcrypt.hashSync(val, 10);
      }
      this.setDataValue("password", hashedValue);
    },
  })
  password: string;

  @HasMany(() => Wallet)
  wallets: Wallet[];

  @HasMany(() => Transaction)
  transactions: Transaction[];
}
