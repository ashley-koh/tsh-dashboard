import { Type } from 'class-transformer';
import { IsArray, IsNumber, IsString } from 'class-validator';

export class QuestionDto {
  @IsNumber()
  public type: number;

  @IsArray()
  @Type(() => String)
  public questions: string[];

  @IsString()
  public description: string;
}
