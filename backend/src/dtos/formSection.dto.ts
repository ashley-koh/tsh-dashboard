import { IsString, IsNotEmpty, IsArray, IsMongoId } from 'class-validator';

export class FormSectionDto {
  @IsString()
  @IsNotEmpty()
  public title: string;

  @IsArray()
  @IsMongoId({ each: true })
  public questions: string[];
}
