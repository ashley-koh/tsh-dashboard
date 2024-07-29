import { IsString, MinLength } from 'class-validator';
import UpdateUserDto from './users.update.dto';

export default class CreateUserDto extends UpdateUserDto {
  @IsString()
  @MinLength(8)
  public password: string;
}
