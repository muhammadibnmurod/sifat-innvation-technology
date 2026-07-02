import { ApiProperty, ApiPropertyOptional, PartialType } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateNewsDto {
  @ApiProperty({ example: "Yangi GOST standarti qabul qilindi" })
  @IsString()
  @IsNotEmpty({ message: "Sarlavha kiritilishi shart" })
  title: string;

  @ApiPropertyOptional({ example: "Qisqacha mazmun..." })
  @IsOptional()
  excerpt?: string;

  @ApiPropertyOptional({ example: "To'liq matn..." })
  @IsOptional()
  body?: string;

  @ApiPropertyOptional({ example: "/uploads/123.png" })
  @IsOptional()
  image?: string;

  @ApiPropertyOptional({ example: "Standartlar" })
  @IsOptional()
  category?: string;

  @ApiPropertyOptional({ example: "2026-07-02", description: "YYYY-MM-DD" })
  @IsOptional()
  date?: string;

  @ApiPropertyOptional({ example: 1, description: "1 — chop etilgan, 0 — qoralama" })
  @IsOptional()
  published?: number;
}

export class UpdateNewsDto extends PartialType(CreateNewsDto) {}
