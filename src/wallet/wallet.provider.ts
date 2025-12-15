
import { Wallet } from './wallet.entity';

export const walletsProviders = [
  {
    provide: 'WALLETS_REPOSITORY',
    useValue: Wallet,
  },
];
