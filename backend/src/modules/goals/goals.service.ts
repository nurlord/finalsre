import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateGoalDto } from './dto/create-goal.dto';
import { UpdateGoalDto } from './dto/update-goal.dto';
import { Goal } from '@/prisma/generated';
import { Request } from 'express';
import { PrismaService } from '@/src/core/prisma/prisma.service';

@Injectable()
export class GoalsService {
  constructor(private readonly prismaService: PrismaService) {}

  public async createMyGoal(
    req: Request,
    createGoalDto: CreateGoalDto,
  ): Promise<Goal> {
    if (!req.session.userId) {
      throw new UnauthorizedException('Session is missing or expired');
    }
    const goal = await this.prismaService.goal.create({
      data: {
        userId: req.session.userId,
        targetAmount: createGoalDto.targetAmount,
        name: createGoalDto.name,
        description: createGoalDto.description,
        deadline: createGoalDto.deadline,
      },
    });

    return goal;
  }

  public async getMyGoals(req: Request): Promise<Goal[]> {
    if (!req.session.userId) {
      throw new UnauthorizedException('Session is missing or expired');
    }
    const goals = await this.prismaService.goal.findMany({
      where: {
        userId: req.session.userId,
      },
    });

    return goals;
  }

  public async getGoalById(req: Request, id: string): Promise<Goal> {
    if (!req.session.userId) {
      throw new UnauthorizedException('Session is missing or expired');
    }
    const goal = await this.prismaService.goal.findUniqueOrThrow({
      where: {
        id: id,
        userId: req.session.userId,
      },
    });
    return goal;
  }

  public async updateMyGoal(
    req: Request,
    id: string,
    updateGoalDto: UpdateGoalDto,
  ): Promise<Goal> {
    if (!req.session.userId) {
      throw new UnauthorizedException('Session is missing or expired');
    }

    const updatedGoal = await this.prismaService.goal.update({
      where: {
        id: id,
        userId: req.session.userId,
      },
      data: {
        ...updateGoalDto,
      },
    });

    return updatedGoal;
  }

  public async removeMyGoal(req: Request, id: string): Promise<Boolean> {
    if (!req.session.userId) {
      throw new UnauthorizedException('Session is missing or expired');
    }

    const removedGoal = await this.prismaService.goal.delete({
      where: {
        id: id,
        userId: req.session.userId,
      },
    });

    return removedGoal ? true : false;
  }
}
