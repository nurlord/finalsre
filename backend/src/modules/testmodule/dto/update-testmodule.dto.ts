import { PartialType } from '@nestjs/swagger';
import { CreateTestmoduleDto } from './create-testmodule.dto';

export class UpdateTestmoduleDto extends PartialType(CreateTestmoduleDto) {}
