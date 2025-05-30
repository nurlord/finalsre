import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateGoalDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  description: string | null;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  targetAmount: number;

  @ApiProperty()
  @IsDateString()
  deadline: Date;
}
