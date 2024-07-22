import { IsString } from 'class-validator';

export class CreateFormDto {
  @IsString({ each: true })
  public questions: string[];
}
