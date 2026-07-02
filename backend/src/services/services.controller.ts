import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiQuery, ApiTags } from "@nestjs/swagger";
import { ServicesService } from "./services.service";
import { CreateServiceDto, UpdateServiceDto } from "./services.dto";
import { ReorderDto } from "../common/reorder.dto";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";

@ApiTags("Xizmatlar (services)")
@Controller("services")
export class ServicesController {
  constructor(private readonly service: ServicesService) {}

  @Get()
  @ApiOperation({ summary: "Xizmatlar ro'yxati (ommaviy — faqat faollari)" })
  @ApiQuery({ name: "all", required: false, description: "1 — barchasi (admin uchun)" })
  findAll(@Query("all") all?: string) {
    return this.service.findAll(all === "1");
  }

  @Get(":id")
  @ApiOperation({ summary: "Bitta xizmat" })
  findOne(@Param("id") id: string) {
    return this.service.findOne(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth("access-token")
  @ApiOperation({ summary: "Yangi xizmat qo'shish" })
  create(@Body() dto: CreateServiceDto) {
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
  @ApiOperation({ summary: "Xizmatni yangilash" })
  update(@Param("id") id: string, @Body() dto: UpdateServiceDto) {
    return this.service.update(id, dto);
  }

  @Delete(":id")
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth("access-token")
  @ApiOperation({ summary: "Xizmatni o'chirish" })
  remove(@Param("id") id: string) {
    return this.service.remove(id);
  }
}
