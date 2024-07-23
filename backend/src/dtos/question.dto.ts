import {
  IsBoolean,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsString,
  Max,
  Min,
} from 'class-validator';
import { Types } from 'mongoose';

export class CreateQuestionDto {
  @IsMongoId()
  public _id: Types.ObjectId;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumber()
  @Min(0)
  @Max(1)
  public type: number;

  @IsBoolean()
  public required: boolean;
}
