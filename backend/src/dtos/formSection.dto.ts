import {
  IsString,
  IsNotEmpty,
  IsArray,
  IsMongoId,
  IsOptional,
} from 'class-validator';

export class CreateFormSectionDto {
  @IsString()
  @IsNotEmpty()
  public title: string;

  @IsString()
  @IsOptional()
  public description: string;

  @IsArray()
  @IsMongoId({ each: true })
  public questions: string[];
}
