import { IsEmail, IsString } from 'class-validator';

export default class AuthLoginDto {
  @IsEmail()
  public email: string;

  @IsString()
  public password: string;
}
