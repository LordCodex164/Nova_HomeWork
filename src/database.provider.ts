
import { Sequelize } from 'sequelize-typescript';
import { Wallet } from './wallet/wallet.entity';
import { Transaction } from './transaction/transaction.entity';
import { User } from './auth/auth_user.entity';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'sqlite',
        storage: 'src/db/main.sqlite',
      });
      sequelize.addModels([Wallet, Transaction, User]);
      await sequelize.sync();
      return sequelize;
    },
  },
];