import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsIn, IsNotEmpty } from 'class-validator';

export class CreateTodoDto {
  @ApiProperty()
  @IsNotEmpty()
  task: string;

  @ApiPropertyOptional()
  @IsNotEmpty()
  @IsIn([0, 1])
  isDone: number;
}
