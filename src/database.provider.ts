
import { Sequelize } from 'sequelize-typescript';
//import { Cat } from '../cats/cat.entity';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'sqlite',
        database: 'src/db/main.sqlite',
      });
      sequelize.addModels([]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
