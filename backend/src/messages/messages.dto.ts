import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsIn, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateMessageDto {
  @ApiProperty({ example: "Aziz Karimov" })
  @IsString()
  @IsNotEmpty({ message: "Ism va xabar to'ldirilishi shart" })
  name: string;

  @ApiPropertyOptional({ example: "+998 90 123 45 67" })
  @IsOptional()
  phone?: string;

  @ApiPropertyOptional({ example: "aziz@example.com" })
  @IsOptional()
  email?: string;

  @ApiProperty({ example: "Kran ta'mirlash narxi qancha?" })
  @IsString()
  @IsNotEmpty({ message: "Ism va xabar to'ldirilishi shart" })
  message: string;
}

export class UpdateMessageStatusDto {
  @ApiProperty({ example: "read", enum: ["new", "read", "answered"] })
  @IsIn(["new", "read", "answered"], { message: "Noto'g'ri status" })
  status: "new" | "read" | "answered";
}
