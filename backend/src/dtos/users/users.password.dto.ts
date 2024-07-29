import { IsString, MinLength } from 'class-validator';

export default class ResetPasswordDto {
  @IsString()
  @MinLength(8)
  public newPassword: string;

  @IsString()
  @MinLength(8)
  public oldPassword: string;
}
