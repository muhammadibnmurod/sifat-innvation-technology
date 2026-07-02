import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { FaqService } from "./faq.service";
import { CreateFaqDto, UpdateFaqDto } from "./faq.dto";
import { ReorderDto } from "../common/reorder.dto";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";

@ApiTags("FAQ")
@Controller("faq")
export class FaqController {
  constructor(private readonly service: FaqService) {}

  @Get()
  @ApiOperation({ summary: "Savol-javoblar ro'yxati (ommaviy)" })
  findAll() {
    return this.service.findAll(true);
  }

  @Get(":id")
  @ApiOperation({ summary: "Bitta savol-javob" })
  findOne(@Param("id") id: string) {
    return this.service.findOne(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth("access-token")
  @ApiOperation({ summary: "Savol-javob qo'shish" })
  create(@Body() dto: CreateFaqDto) {
    return this.service.create(dto);
  }

  @Put("reorder/all")
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth("access-token")
  @ApiOperation({ summary: "Tartibni o'zgartirish" })
  reorder(@Body() dto: ReorderDto) {
    return this.service.reorder(dto.ids);
  }

  @Put(":id")
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth("access-token")
  @ApiOperation({ summary: "Savol-javobni yangilash" })
  update(@Param("id") id: string, @Body() dto: UpdateFaqDto) {
    return this.service.update(id, dto);
  }

  @Delete(":id")
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth("access-token")
  @ApiOperation({ summary: "Savol-javobni o'chirish" })
  remove(@Param("id") id: string) {
    return this.service.remove(id);
  }
}
