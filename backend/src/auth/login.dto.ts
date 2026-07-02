import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class LoginDto {
  @ApiProperty({ example: "admin@sifat.uz", description: "Admin email manzili" })
  @IsEmail({}, { message: "Email noto'g'ri formatda" })
  @IsNotEmpty({ message: "Email va parol kiritilishi shart" })
  email: string;

  @ApiProperty({ example: "admin123", description: "Admin paroli" })
  @IsString()
  @IsNotEmpty({ message: "Email va parol kiritilishi shart" })
  password: string;
}
