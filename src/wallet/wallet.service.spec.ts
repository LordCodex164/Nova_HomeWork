import { Test, TestingModule } from '@nestjs/testing';
import { WalletService } from './wallet.service';
import { Wallet } from './wallet.entity';
import { TransactionService } from 'src/transaction/transaction.service';
import { BadRequestException } from '@nestjs/common';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { FundWalletDto } from './dto/fund-wallet.dto';
import { TransferWalletDto } from './dto/transer-wallet.dto';
import { Response } from 'express';

describe('WalletService', () => {
  let service: WalletService;
  let walletRepository: any;
  let transactionService: TransactionService;

  const mockWalletRepository = {
    create: jest.fn(),
    findOne: jest.fn(),
  };

  const mockTransactionService = {
    createTransaction: jest.fn(),
  };

  const mockResponse = {
    statusCode: 200,
  } as unknown as Response;

  const mockWallet = {
    id: 'wallet-123',
    user_id: 'user-123',
    balance: 1000,
    currency: 'NGN',
  };

  const mockTransaction = {
    id: 'transaction-123',
    amount: 500,
    type: 'Credit',
    wallet_id: 'wallet-123',
    user_id: 'user-123',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WalletService,
        {
          provide: 'WALLETS_REPOSITORY',
          useValue: mockWalletRepository,
        },
        {
          provide: TransactionService,
          useValue: mockTransactionService,
        },
      ],
    }).compile();

    service = module.get<WalletService>(WalletService);
    walletRepository = module.get('WALLETS_REPOSITORY');
    transactionService = module.get<TransactionService>(TransactionService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createWallet', () => {
    it('should create a wallet successfully', async () => {
      const createWalletDto: CreateWalletDto = {
        currency: 'NGN',
      };

      mockWalletRepository.create.mockResolvedValue(mockWallet);

      const result = await service.createWallet('user-123', createWalletDto);

      expect(result).toEqual(mockWallet);
      expect(walletRepository.create).toHaveBeenCalledWith({
        ...createWalletDto,
        user_id: 'user-123',
      });
    });
  });

  describe('fundWallet', () => {
    it('should fund a wallet successfully', async () => {
      const fundWalletDto: FundWalletDto = {
        amount: 500,
        narration: 'Test funding',
      };

      mockWalletRepository.findOne.mockResolvedValue(mockWallet);
      mockTransactionService.createTransaction.mockResolvedValue(mockTransaction);

      const result = await service.fundWallet(
        'user-123',
        'wallet-123',
        fundWalletDto,
        mockResponse,
      );

      expect(result).toEqual(mockTransaction);
      expect(walletRepository.findOne).toHaveBeenCalledWith({
        where: {
          user_id: 'user-123',
          id: 'wallet-123',
        },
      });
      expect(transactionService.createTransaction).toHaveBeenCalledWith({
        amount: fundWalletDto.amount,
        user_id: 'user-123',
        wallet_id: 'wallet-123',
        narration: fundWalletDto.narration,
        type: 'Credit',
      });
    });

    it('should throw BadRequestException when wallet does not exist', async () => {
      const fundWalletDto: FundWalletDto = {
        amount: 500,
        narration: 'Test funding',
      };

      mockWalletRepository.findOne.mockResolvedValue(null);

      await service.fundWallet(
        'user-123',
        'wallet-123',
        fundWalletDto,
        mockResponse,
      );

      expect(walletRepository.findOne).toHaveBeenCalledWith({
        where: {
          user_id: 'user-123',
          id: 'wallet-123',
        },
      });
    });
  });

  describe('transfer', () => {
    it('should transfer funds successfully', async () => {
      const transferWalletDto: TransferWalletDto = {
        amount: 300,
        recipientWalletId: 456,
      };

      const recipientWallet = {
        id: 'wallet-456',
        user_id: 'user-456',
        balance: 500,
        currency: 'NGN',
      };

      mockWalletRepository.findOne
        .mockResolvedValueOnce(mockWallet)
        .mockResolvedValueOnce(recipientWallet);
      
      mockTransactionService.createTransaction.mockResolvedValue(mockTransaction);

      const result = await service.transfer(
        'user-123',
        'wallet-123',
        transferWalletDto,
      );

      expect(result).toEqual(mockTransaction);
      expect(walletRepository.findOne).toHaveBeenCalledTimes(2);
      expect(transactionService.createTransaction).toHaveBeenCalledTimes(2);
    });

    it('should throw BadRequestException when balance is insufficient', async () => {
      const transferWalletDto: TransferWalletDto = {
        amount: 2000,
        recipientWalletId: 456,
      };

      mockWalletRepository.findOne.mockResolvedValue(mockWallet);

      await expect(
        service.transfer('user-123', 'wallet-123', transferWalletDto),
      ).rejects.toThrow(BadRequestException);
      await expect(
        service.transfer('user-123', 'wallet-123', transferWalletDto),
      ).rejects.toThrow('Insufficient Balance');
    });

    it('should throw BadRequestException when recipient wallet does not exist', async () => {
      const transferWalletDto: TransferWalletDto = {
        amount: 300,
        recipientWalletId: 456,
      };

      mockWalletRepository.findOne
        .mockResolvedValueOnce(mockWallet)
        .mockResolvedValueOnce(null);

      await expect(
        service.transfer('user-123', 'wallet-123', transferWalletDto),
      ).rejects.toThrow(BadRequestException);
      await expect(
        service.transfer('user-123', 'wallet-123', transferWalletDto),
      ).rejects.toThrow('Invalid Recipient Wallet id');
    });
  });

  describe('findOne', () => {
    it('should find a wallet successfully', async () => {
      mockWalletRepository.findOne.mockResolvedValue(mockWallet);

      const result = await service.findOne('user-123', 'wallet-123');

      expect(result).toEqual(mockWallet);
      expect(walletRepository.findOne).toHaveBeenCalledWith({
        where: {
          id: 'wallet-123',
          user_id: 'user-123',
        },
      });
    });

    it('should return null when wallet is not found', async () => {
      mockWalletRepository.findOne.mockResolvedValue(null);

      const result = await service.findOne('user-123', 'wallet-999');

      expect(result).toBeNull();
      expect(walletRepository.findOne).toHaveBeenCalledWith({
        where: {
          id: 'wallet-999',
          user_id: 'user-123',
        },
      });
    });
  });
});