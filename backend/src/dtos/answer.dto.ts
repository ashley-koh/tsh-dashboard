import {
  IsIn,
  IsMongoId,
  IsNumber,
  IsString,
  Max,
  Min,
  ValidateIf,
} from 'class-validator';

export class CreateAnswerDto {
  @IsMongoId()
  public answerId: string;

  @IsIn([0, 1])
  public type: number;

  // Validate response depending on type of question
  @ValidateIf((o) => o.type === 0)
  @IsString()
  public openEndedAnswer: string;

  @ValidateIf((o) => o.type === 1)
  @IsNumber()
  @Min(1)
  @Max(5)
  public rating: number;
}
