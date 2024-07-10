import {
  IsDate,
  IsEmail,
  IsIn,
  IsString,
  IsStrongPassword,
  Length,
} from 'class-validator';

export default class CreateUserDto {
  @IsString()
  public firstName: string;

  @IsString()
  public lastName: string;

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

  @Length(10, 10)
  public employeeID: string;

  @IsIn(['employee', 'head_of_department', 'business_owner'])
  public role: string;

  @IsIn(['hr_manager', 'marketing_manager', 'chief_executive_officer'])
  public jobTitle: string;

  @IsIn(['hr', 'fa', 'mk'])
  public dept: string;

  @IsDate()
  public date: Date;

  @IsIn(['full_time', 'part_time', 'intern', 'temp'])
  public employeeStatus: string;
}
