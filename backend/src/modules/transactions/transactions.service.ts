import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { Request } from 'express';
import { PrismaService } from '@/src/core/prisma/prisma.service';
import { Transaction } from '@/prisma/generated';

@Injectable()
export class TransactionsService {
  public constructor(private readonly prismaService: PrismaService) {}

  public async create(
    req: Request,
    createTransactionDto: CreateTransactionDto,
  ) {
    if (!req.session.userId) {
      throw new UnauthorizedException('Session is missing or expired');
    }

    const transaction = await this.prismaService.transaction.create({
      data: {
        userId: req.session.userId,
        category: createTransactionDto.category,
        type: createTransactionDto.type,
        amount: createTransactionDto.amount,
        dateOfTransaction: createTransactionDto.dateOfTransaction,
        description: createTransactionDto.description,
      },
    });

    if (createTransactionDto.type === 'INCOME') {
      await this.prismaService.user.update({
        where: {
          id: req.session.userId,
        },
        data: {
          balance: {
            increment: createTransactionDto.amount,
          },
        },
      });
    } else {
      await this.prismaService.user.update({
        where: {
          id: req.session.userId,
        },
        data: {
          balance: {
            decrement: createTransactionDto.amount,
          },
        },
      });
    }
    return transaction;
  }

  public async getMyTransactions(req: Request): Promise<Transaction[]> {
    if (!req.session.userId) {
      throw new UnauthorizedException('Session is missing or expired');
    }

    const transactions = await this.prismaService.transaction.findMany({
      where: { userId: req.session.userId },
    });

    return transactions;
  }

  public async getTransactionById(
    req: Request,
    id: string,
  ): Promise<Transaction> {
    if (!req.session.userId) {
      throw new UnauthorizedException('Session is missing or expired');
    }
    const transaction = await this.prismaService.transaction.findFirstOrThrow({
      where: {
        userId: req.session.userId,
        id: id,
      },
    });
    return transaction;
  }

  public async getMyBalance(req: Request) {
    if (!req.session.userId) {
      throw new UnauthorizedException('Session is missing or expired');
    }
    const balance = await this.prismaService.user.findUnique({
      where: {
        id: req.session.userId,
      },
      select: {
        balance: true,
      },
    });
    return balance;
  }

  async update(req: Request, updateTransactionDto: UpdateTransactionDto) {
    if (!req.session.userId) {
      throw new UnauthorizedException('Session is missing or expired');
    }
    const { id, ...updateData } = updateTransactionDto;
    const newTransaction = await this.prismaService.transaction.update({
      where: {
        id,
      },
      data: {
        ...updateData,
      },
    });

    return newTransaction;
  }

  async remove(req: Request, id: string): Promise<Boolean> {
    if (!req.session.userId) {
      throw new UnauthorizedException('Session is missing or expired');
    }

    const deletedTransaction = await this.prismaService.transaction.delete({
      where: {
        userId: req.session.userId,
        id: id,
      },
    });
    return deletedTransaction ? true : false;
  }
}
