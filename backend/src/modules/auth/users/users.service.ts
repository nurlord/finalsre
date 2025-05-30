import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from '@/src/core/prisma/prisma.service';
import { hash } from 'argon2';
import { User } from '@/prisma/generated';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  public async create(dto: CreateUserDto): Promise<Boolean> {
    const { email, username, firstName, lastName, password } = dto;

    const isUsernameExists = await this.prismaService.user.findUnique({
      where: { username: username },
    });

    if (isUsernameExists) {
      throw new ConflictException('This username is already taken');
    }

    const isEmailExists = await this.prismaService.user.findUnique({
      where: {
        email: email,
      },
    });

    if (isEmailExists) {
      throw new ConflictException('This email is already taken');
    }

    await this.prismaService.user.create({
      data: {
        username: username,
        email: email,
        password: await hash(password),
        firstName,
        lastName,
      },
    });

    return true;
  }

  public async findById(id: string): Promise<User | null> {
    const user = await this.prismaService.user.findUnique({
      where: { id: id },
    });
    return user;
  }

  public async findByLogin(login: string): Promise<User | null> {
    const user = await this.prismaService.user.findFirst({
      where: {
        OR: [
          {
            email: { equals: login },
          },
          {
            username: { equals: login },
          },
        ],
      },
    });
    return user;
  }
}
