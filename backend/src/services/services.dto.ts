import { ApiProperty, ApiPropertyOptional, PartialType } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateServiceDto {
  @ApiProperty({ example: "Ta'mirlash ishlari" })
  @IsString()
  @IsNotEmpty({ message: "Sarlavha kiritilishi shart" })
  title: string;

  @ApiPropertyOptional({ example: "Kranlarni joriy va kapital ta'mirlash." })
  @IsOptional()
  description?: string;

  @ApiPropertyOptional({ example: "Wrench", description: "Lucide icon nomi" })
  @IsOptional()
  icon?: string;

  @ApiPropertyOptional({ example: "/uploads/123.png" })
  @IsOptional()
  image?: string;

  @ApiPropertyOptional({ example: 1 })
  @IsOptional()
  sort_order?: number;

  @ApiPropertyOptional({ example: 1, description: "1 — saytda ko'rinadi, 0 — yashirin" })
  @IsOptional()
  active?: number;
}

export class UpdateServiceDto extends PartialType(CreateServiceDto) {}
