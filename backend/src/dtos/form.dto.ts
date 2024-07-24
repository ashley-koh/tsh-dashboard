import { IsString, Validate } from 'class-validator';
import {} from 'mongoose';
import { FormSectionDto } from './formSection.dto';

export class CreateFormDto {
  @IsString()
  public name: string;

  @IsString()
  public description: string;

  @Validate(FormSectionDto)
  public section: FormSectionDto;
}
