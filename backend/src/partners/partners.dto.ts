import { ApiProperty, ApiPropertyOptional, PartialType } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreatePartnerDto {
  @ApiProperty({ example: "Kranmash" })
  @IsString()
  @IsNotEmpty({ message: "Nom kiritilishi shart" })
  name: string;

  @ApiPropertyOptional({ example: "/uploads/logo.png" })
  @IsOptional()
  logo?: string;

  @ApiPropertyOptional({ example: "https://kranmash.uz" })
  @IsOptional()
  url?: string;

  @ApiPropertyOptional({ example: 1 })
  @IsOptional()
  sort_order?: number;
}

export class UpdatePartnerDto extends PartialType(CreatePartnerDto) {}
