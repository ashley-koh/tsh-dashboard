import { Type } from 'class-transformer';
import { IsArray } from 'class-validator';

export class FormDto {
  @IsArray()
  @Type(() => String)
  public questions: string[];
}
