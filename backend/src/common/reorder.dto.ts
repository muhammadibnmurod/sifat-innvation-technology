import { ApiProperty } from "@nestjs/swagger";
import { IsArray } from "class-validator";

export class ReorderDto {
  @ApiProperty({ example: [3, 1, 2], description: "Yangi tartibdagi ID'lar ro'yxati" })
  @IsArray({ message: "ids massivi kerak" })
  ids: number[];
}
