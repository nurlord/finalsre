import { Controller, Get, Req } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { Request } from 'express';

@Controller('balance')
export class BalanceController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Get()
  async getMyBalance(@Req() req: Request) {
    return this.transactionsService.getMyBalance(req);
  }
}
