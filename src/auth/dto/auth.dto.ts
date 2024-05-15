import { IsEmail, isNotEmpty, IsNotEmpty } from 'class-validator';

export class signupDTO {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}



export class loginDTO {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}