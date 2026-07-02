import { ApiProperty, ApiPropertyOptional, PartialType } from "@nestjs/swagger";
import {
  IsArray,
  IsEmail,
  IsIn,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from "class-validator";
import { PERMISSIONS } from "../auth/permissions";

export class CreateUserDto {
  @ApiProperty({ example: "Aliyev Vali" })
  @IsString()
  @IsNotEmpty({ message: "Ism kiritilishi shart" })
  name: string;

  @ApiProperty({ example: "vali@sifat.uz" })
  @IsEmail({}, { message: "Email noto'g'ri formatda" })
  email: string;

  @ApiProperty({ example: "parol123", minLength: 6 })
  @IsString()
  @MinLength(6, { message: "Parol kamida 6 ta belgidan iborat bo'lsin" })
  password: string;

  @ApiPropertyOptional({ enum: ["admin", "user"], default: "user" })
  @IsOptional()
  @IsIn(["admin", "user"], { message: "Rol admin yoki user bo'lishi kerak" })
  role?: "admin" | "user";

  @ApiPropertyOptional({
    example: ["services", "news"],
    description: `Ruxsat berilgan bo'limlar: ${PERMISSIONS.join(", ")}`,
  })
  @IsOptional()
  @IsArray({ message: "permissions massiv bo'lishi kerak" })
  @IsIn(PERMISSIONS as unknown as string[], {
    each: true,
    message: "Noto'g'ri bo'lim nomi",
  })
  permissions?: string[];
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}
