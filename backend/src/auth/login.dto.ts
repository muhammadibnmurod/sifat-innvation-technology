import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class LoginDto {
  @ApiProperty({ example: "admin", description: "Foydalanuvchi nomi (username)" })
  @IsString()
  @IsNotEmpty({ message: "Username va parol kiritilishi shart" })
  username: string;

  @ApiProperty({ example: "admin123", description: "Parol" })
  @IsString()
  @IsNotEmpty({ message: "Username va parol kiritilishi shart" })
  password: string;
}
