import { IsNumber, IsString, Max, Min } from 'class-validator';

export class CreateQuestionDto {
  @IsNumber()
  @Min(0)
  @Max(1)
  public type: number;

  // Not sure if this is necessary or not
  @IsString({ each: true })
  public options: string[];

  @IsString()
  public description: string;
}
