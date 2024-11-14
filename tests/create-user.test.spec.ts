import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserUseCase } from '@/domain/hotel/application/use-cases/create-user';
import { UsersRepository } from '@/domain/hotel/application/repositories/users-repository';
import { HashGenerator } from '@/domain/hotel/application/cryptography/hash-generator';
import { User } from '@/domain/hotel/enterprise/entities/user';

describe('CreateUserUseCase', () => {
  let createUserUseCase: CreateUserUseCase;
  let usersRepository: UsersRepository;
  let hashGenerator: HashGenerator;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateUserUseCase,
        {
          provide: UsersRepository,
          useValue: {
            findByEmail: jest.fn(),
            create: jest.fn(),
          },
        },
        {
          provide: HashGenerator,
          useValue: {
            hash: jest.fn().mockResolvedValue('hashedPassword'),
          },
        },
      ],
    }).compile();

    createUserUseCase = module.get<CreateUserUseCase>(CreateUserUseCase);
    usersRepository = module.get<UsersRepository>(UsersRepository);
    hashGenerator = module.get<HashGenerator>(HashGenerator);
  });

  it('should be defined', () => {
    expect(createUserUseCase).toBeDefined();
  });

  it('should return an error if user already exists', async () => {
    jest.spyOn(usersRepository, 'findByEmail').mockResolvedValueOnce(
        User.create({
            name: 'Test User',
            email: 'test@test.com',
            cpf: '1234567890',
            phone: '123456789',
            password: 'hashedPassword',
        })
    );

    const result = await createUserUseCase.execute({
        name: 'Test User',
        email: 'test@test.com',
        cpf: '12345678900',
        phone: '123456789',
        password: 'password',
    });

    expect(result).toEqual(
        expect.objectContaining({
            left: expect.objectContaining({
                value: expect.objectContaining({
                    message: expect.stringContaining('already exists'), 
                }),
            }),
        })
    );
});





it('should create a user successfully', async () => {
    jest.spyOn(usersRepository, 'findByEmail').mockResolvedValueOnce(null);
    jest.spyOn(usersRepository, 'create').mockResolvedValueOnce(undefined);

    const result = await createUserUseCase.execute({
        name: 'Test User',
        email: 'test@test.com',
        cpf: '12345678900',
        phone: '123456789',
        password: 'password',
    });

    expect(result).toEqual(
        expect.objectContaining({
            right: expect.objectContaining({
                value: expect.objectContaining({
                    user: expect.objectContaining({
                        props: expect.objectContaining({
                            email: 'test@test.com',
                            name: 'Test User',
                        }),
                    }),
                }),
            }),
        })
    );
});

});
