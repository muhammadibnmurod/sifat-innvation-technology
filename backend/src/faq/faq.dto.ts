import { ApiProperty, ApiPropertyOptional, PartialType } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateFaqDto {
  @ApiProperty({ example: "Qanday kranlarni ta'mirlaysiz?" })
  @IsString()
  @IsNotEmpty({ message: "Savol kiritilishi shart" })
  question: string;

  @ApiProperty({ example: "Barcha turdagi yuk ko'taruvchi kranlarni ta'mirlaymiz." })
  @IsString()
  @IsNotEmpty({ message: "Javob kiritilishi shart" })
  answer: string;

  @ApiPropertyOptional({ example: 1 })
  @IsOptional()
  sort_order?: number;
}

export class UpdateFaqDto extends PartialType(CreateFaqDto) {}
