import { Module } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { TransactionsController } from './transactions.controller';
import { BalanceController } from './balance.controller';

@Module({
  controllers: [TransactionsController, BalanceController],
  providers: [TransactionsService],
})
export class TransactionsModule {}
