import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
} from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { Request } from 'express';
import { Transaction } from '@/prisma/generated';

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Post()
  async create(
    @Req() req: Request,
    @Body() createTransactionDto: CreateTransactionDto,
  ) {
    return this.transactionsService.create(req, createTransactionDto);
  }

  @Get()
  async getMyTransactions(@Req() req: Request): Promise<Transaction[]> {
    return this.transactionsService.getMyTransactions(req);
  }

  @Get(':id')
  async getTransactionById(@Req() req: Request, @Param('id') id: string) {
    return this.transactionsService.getTransactionById(req, id);
  }

  @Patch()
  async update(
    @Req() req: Request,
    @Body() updateTransactionDto: UpdateTransactionDto,
  ) {
    return this.transactionsService.update(req, updateTransactionDto);
  }

  @Delete(':id')
  async remove(@Req() req: Request, @Param('id') id: string) {
    return this.transactionsService.remove(req, id);
  }
}
