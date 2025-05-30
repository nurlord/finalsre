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
import { GoalsService } from './goals.service';
import { CreateGoalDto } from './dto/create-goal.dto';
import { UpdateGoalDto } from './dto/update-goal.dto';
import { Request } from 'express';

@Controller('goals')
export class GoalsController {
  constructor(private readonly goalsService: GoalsService) {}

  @Post()
  public async create(
    @Req() req: Request,
    @Body() createGoalDto: CreateGoalDto,
  ) {
    return this.goalsService.createMyGoal(req, createGoalDto);
  }

  @Get()
  public async findAll(@Req() req: Request) {
    return this.goalsService.getMyGoals(req);
  }

  @Get(':id')
  public async findOne(@Req() req: Request, @Param('id') id: string) {
    return this.goalsService.getGoalById(req, id);
  }

  @Patch(':id')
  public async update(
    @Req() req: Request,
    @Param('id') id: string,
    @Body() updateGoalDto: UpdateGoalDto,
  ) {
    return this.goalsService.updateMyGoal(req, id, updateGoalDto);
  }

  @Delete(':id')
  public async remove(@Req() req: Request, @Param('id') id: string) {
    return this.goalsService.removeMyGoal(req, id);
  }
}
