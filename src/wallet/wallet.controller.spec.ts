import { Test, TestingModule } from '@nestjs/testing';
import { WalletController } from './wallet.controller';
import { WalletService } from './wallet.service';
import { Response, Request } from 'express';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { FundWalletDto } from './dto/fund-wallet.dto';
import { TransferWalletDto } from './dto/transer-wallet.dto';

describe('WalletController', () => {
  let controller: WalletController;
  let service: WalletService;

  const mockWalletService = {
    createWallet: jest.fn(),
    findOne: jest.fn(),
    fundWallet: jest.fn(),
    transfer: jest.fn(),
  };

  const mockRequest = {
    user: { id: 'user-123' },
  } as unknown as Request;

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
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WalletController],
      providers: [
        {
          provide: WalletService,
          useValue: mockWalletService,
        },
      ],
    }).compile();

    controller = module.get<WalletController>(WalletController);
    service = module.get<WalletService>(WalletService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createWallet', () => {
    it('should create a wallet successfully', async () => {
      const createWalletDto: CreateWalletDto = {
        currency: 'NGN',
      };

      mockWalletService.createWallet.mockResolvedValue(mockWallet);

      const result = await controller.createWallet(
        createWalletDto,
        mockRequest,
        mockResponse,
      );

      expect(result).toEqual({
        status: 'success',
        message: 'Wallet created successfully',
        data: {
          wallet: mockWallet,
        },
      });
      expect(service.createWallet).toHaveBeenCalledWith(
        'user-123',
        createWalletDto,
      );
    });

    it('should handle errors during wallet creation', async () => {
      const createWalletDto: CreateWalletDto = {
        currency: 'NGN',
      };

      const error = new Error('Creation failed');
      mockWalletService.createWallet.mockRejectedValue(error);

      const result = await controller.createWallet(
        createWalletDto,
        mockRequest,
        mockResponse,
      );

      expect(service.createWallet).toHaveBeenCalledWith(
        'user-123',
        createWalletDto,
      );
    });
  });

  describe('findOne', () => {
    it('should retrieve a wallet successfully', async () => {
      mockWalletService.findOne.mockResolvedValue(mockWallet);

      const result = await controller.findOne(
        'wallet-123',
        mockRequest,
        mockResponse,
      );

      expect(result).toEqual({
        status: 'success',
        message: 'Wallet Successfully Retrieved',
        data: {
          wallet: mockWallet,
        },
      });
      expect(service.findOne).toHaveBeenCalledWith('user-123', 'wallet-123');
    });

    it('should handle errors when wallet not found', async () => {
      const error = new Error('Wallet not found');
      mockWalletService.findOne.mockRejectedValue(error);

      await controller.findOne('wallet-123', mockRequest, mockResponse);

      expect(service.findOne).toHaveBeenCalledWith('user-123', 'wallet-123');
    });
  });

  describe('fundWallet', () => {
    it('should fund a wallet successfully', async () => {
      const fundWalletDto: FundWalletDto = {
        amount: 500,
        narration: 'Test funding',
      };

      mockWalletService.fundWallet.mockResolvedValue(mockTransaction);

      const result = await controller.fundWallet(
        fundWalletDto,
        'wallet-123',
        mockRequest,
        mockResponse,
      );

      expect(result).toEqual({
        status: 'success',
        message: 'Fund Wallet request successful',
        data: {
          transaction: mockTransaction,
        },
      });
      expect(service.fundWallet).toHaveBeenCalledWith(
        'user-123',
        'wallet-123',
        fundWalletDto,
        mockResponse,
      );
    });

    it('should handle errors during wallet funding', async () => {
      const fundWalletDto: FundWalletDto = {
        amount: 500,
        narration: 'Test funding',
      };

      const error = new Error('Funding failed');
      mockWalletService.fundWallet.mockRejectedValue(error);

      await controller.fundWallet(
        fundWalletDto,
        'wallet-123',
        mockRequest,
        mockResponse,
      );

      expect(service.fundWallet).toHaveBeenCalledWith(
        'user-123',
        'wallet-123',
        fundWalletDto,
        mockResponse,
      );
    });
  });

  describe('transfer', () => {
    it('should transfer funds successfully', async () => {
      const transferWalletDto: TransferWalletDto = {
        amount: 300,
        recipientWalletId: 956,
      };

      mockWalletService.transfer.mockResolvedValue(mockTransaction);

      const result = await controller.transfer(
        transferWalletDto,
        'wallet-123',
        mockRequest,
        mockResponse,
      );

      expect(result).toEqual({
        status: 'success',
        message: 'Fund Wallet request successful',
        data: {
          transaction: mockTransaction,
        },
      });
      expect(service.transfer).toHaveBeenCalledWith(
        'user-123',
        'wallet-123',
        transferWalletDto,
      );
    });

    it('should handle errors during transfer', async () => {
      const transferWalletDto: TransferWalletDto = {
        amount: 300,
        recipientWalletId: 98876,
      };

      const error = new Error('Transfer failed');
      mockWalletService.transfer.mockRejectedValue(error);

      await controller.transfer(
        transferWalletDto,
        'wallet-123',
        mockRequest,
        mockResponse,
      );

      expect(service.transfer).toHaveBeenCalledWith(
        'user-123',
        'wallet-123',
        transferWalletDto,
      );
    });
  });
});