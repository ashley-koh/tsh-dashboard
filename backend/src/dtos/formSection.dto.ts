import { IsString, IsNotEmpty, IsArray, IsMongoId } from 'class-validator';
import { Types } from 'mongoose';

export class FormSectionDto {
  @IsString()
  @IsNotEmpty()
  public title: string;

  @IsArray()
  @IsMongoId({ each: true })
  public questions: Types.ObjectId[];
}
