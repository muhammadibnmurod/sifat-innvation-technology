import { ApiProperty, ApiPropertyOptional, PartialType } from "@nestjs/swagger";
import {
  IsArray,
  IsIn,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MinLength,
} from "class-validator";
import { PERMISSIONS } from "../auth/permissions";

export class CreateUserDto {
  @ApiProperty({ example: "Aliyev Vali" })
  @IsString()
  @IsNotEmpty({ message: "Ism kiritilishi shart" })
  name: string;

  @ApiProperty({ example: "vali", description: "Kirish uchun username (lotin harflar, raqam, . _ -)" })
  @IsString()
  @MinLength(3, { message: "Username kamida 3 ta belgidan iborat bo'lsin" })
  @Matches(/^[a-zA-Z0-9._-]+$/, {
    message: "Username faqat lotin harflar, raqam va . _ - belgilaridan iborat bo'lsin",
  })
  username: string;

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
