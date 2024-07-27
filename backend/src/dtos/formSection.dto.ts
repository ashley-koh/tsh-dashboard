import { IsString, IsNotEmpty, IsArray, IsMongoId } from 'class-validator';

export class CreateFormSectionDto {
  @IsString()
  @IsNotEmpty()
  public title: string;

  @IsString()
  @IsNotEmpty()
  public description: string;

  @IsArray()
  @IsMongoId({ each: true })
  public questions: string[];
}
