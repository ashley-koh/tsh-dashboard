import {
  IsDate,
  IsEmail,
  IsIn,
  IsString,
  IsStrongPassword,
} from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  public email: string;

  @IsStrongPassword({
    minLength: 10,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  })
  public password: string;

  @IsString()
  public firstName: string;

  @IsString()
  public lastName: string;

  @IsIn(['employee', 'head_of_department', 'business_owner'])
  public role: string;

  @IsIn(['hr', 'fa', 'mk'])
  public dept: string;

  @IsDate()
  public date: Date;

  @IsIn(['full_time', 'part_time', 'intern', 'temp'])
  public employeeStatus: string;
}
