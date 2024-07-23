import { IsMongoId, IsString } from 'class-validator';
import { Types } from 'mongoose';

export class CreateFormDto {
  @IsString()
  public name: string;

  @IsString()
  public description: string;

  @IsString()
  public title: string;

  @IsMongoId({ each: true })
  public questions: Types.ObjectId[];
}
