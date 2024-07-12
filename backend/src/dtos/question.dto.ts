import { IsNumber, IsString } from 'class-validator';

export class CreateQuestionDto {
  @IsNumber()
  public type: number;

  @IsString({ each: true })
  public options: string[];

  @IsString()
  public description: string;
}
