import { IsEmail, IsString } from 'class-validator';

export default class LoginUserDto {
  @IsEmail()
  public email: string;

  @IsString()
  public password: string;
}
