import { IsNumber, IsString, Max, Min, ValidateIf } from 'class-validator';

export class CreateAnswerDto {
  @IsString()
  public questionID: string;

  @IsNumber()
  @Min(0)
  @Max(1)
  public type: number;

  // Validate response depending on type of question
  @ValidateIf((o) => o.type === 0)
  @IsString()
  public openEndedAnswer: string;

  @ValidateIf((o) => o.type === 1)
  @IsNumber()
  public closedAnswer: number;
}