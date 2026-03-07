 import { IsNotEmpty, MinLength,IsEmail } from "class-validator";
export class CreateAuthDto {
      
      @IsEmail()
      email: string;
    
      @IsNotEmpty()
      @MinLength(8)
      password: string;
}
