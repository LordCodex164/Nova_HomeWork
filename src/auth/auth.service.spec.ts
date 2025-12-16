import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from './auth.service';

/**
 * =====================================
 * MOCKS
 * =====================================
 */

const mockUsersRepository = {
  findOne: jest.fn(),
  create: jest.fn(),
};

const mockJwtService = {
  signAsync: jest.fn(),
};

const mockResponse = () =>
  ({
    statusCode: 200,
  } as any);

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          /**
           * ⚠️ Token must match what you use in @Inject()
           */
          provide: 'AuthUsersRepository',
          useValue: mockUsersRepository,
        },
        {
          provide: JwtService,
          useValue: mockJwtService,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  /**
   * =====================================
   * SIGN IN TESTS
   * =====================================
   */

  describe('signIn', () => {
    it('should login user successfully', async () => {
      const plainPassword = 'password123';
      const hashedPassword = bcrypt.hashSync(plainPassword, 10);

      mockUsersRepository.findOne.mockResolvedValue({
        id: 1,
        email: 'test@example.com',
        password: hashedPassword,
        dataValues: {
          id: 1,
          email: 'test@example.com',
          password: hashedPassword,
        },
      });

      mockJwtService.signAsync.mockResolvedValue('jwt-token');

      const result = await service.signIn(
        { email: 'test@example.com', password: plainPassword },
        mockResponse(),
      );

      expect(result.status).toBe('success');
      expect(result.message).toBe('Login Successful');
      expect(result.data.access_token).toBe('jwt-token');
      //expect(result.data.user.password).toBeUndefined();
    });

    it('should throw error if user does not exist', async () => {
      mockUsersRepository.findOne.mockResolvedValue(null);

      await expect(
        service.signIn(
          { email: 'wrong@example.com', password: 'password' },
          mockResponse(),
        ),
      ).rejects.toThrow(BadRequestException);
    });

    it('should throw error if password is incorrect', async () => {
      const hashedPassword = bcrypt.hashSync('correct-password', 10);

      mockUsersRepository.findOne.mockResolvedValue({
        id: 1,
        email: 'test@example.com',
        password: hashedPassword,
      });

      await expect(
        service.signIn(
          { email: 'test@example.com', password: 'wrong-password' },
          mockResponse(),
        ),
      ).rejects.toThrow(BadRequestException);
    });
  });

  /**
   * =====================================
   * REGISTER TESTS
   * =====================================
   */

  describe('register', () => {
    const registerDto = {
      firstname: 'John',
      lastname: 'Doe',
      email: 'test@example.com',
      password: 'password123',
    };

    it('should register a new user successfully', async () => {
      mockUsersRepository.findOne.mockResolvedValue(null);

      mockUsersRepository.create.mockResolvedValue({
        id: 1,
        email: registerDto.email,
        password: 'hashed-password',
        dataValues: {
          id: 1,
          firstname: registerDto.firstname,
          lastname: registerDto.lastname,
          email: registerDto.email,
          password: 'hashed-password',
        },
      });

      const result = await service.register(
        registerDto,
        mockResponse(),
      );

      expect(result.status).toBe('success');
      expect(result.message).toBe('Registration Successful');
      //expect(result.data.user.password).toBeUndefined();
    });

    it('should throw error if user already exists', async () => {
      mockUsersRepository.findOne.mockResolvedValue({
        id: 1,
        email: registerDto.email,
      });

      await expect(
        service.register(
          registerDto,
          mockResponse(),
        ),
      ).rejects.toThrow(BadRequestException);
    });
  });
});
