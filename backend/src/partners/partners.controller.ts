import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { PartnersService } from "./partners.service";
import { CreatePartnerDto, UpdatePartnerDto } from "./partners.dto";
import { ReorderDto } from "../common/reorder.dto";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { PermissionGuard, RequirePermission } from "../auth/permission.guard";

@ApiTags("Hamkorlar (partners)")
@RequirePermission("partners")
@Controller("partners")
export class PartnersController {
  constructor(private readonly service: PartnersService) {}

  @Get()
  @ApiOperation({ summary: "Hamkorlar ro'yxati (ommaviy)" })
  findAll() {
    return this.service.findAll(true);
  }

  @Get(":id")
  @ApiOperation({ summary: "Bitta hamkor" })
  findOne(@Param("id") id: string) {
    return this.service.findOne(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard, PermissionGuard)
  @ApiBearerAuth("access-token")
  @ApiOperation({ summary: "Hamkor qo'shish" })
  create(@Body() dto: CreatePartnerDto) {
    return this.service.create(dto);
  }

  @Put("reorder/all")
  @UseGuards(JwtAuthGuard, PermissionGuard)
  @ApiBearerAuth("access-token")
  @ApiOperation({ summary: "Tartibni o'zgartirish" })
  reorder(@Body() dto: ReorderDto) {
    return this.service.reorder(dto.ids);
  }

  @Put(":id")
  @UseGuards(JwtAuthGuard, PermissionGuard)
  @ApiBearerAuth("access-token")
  @ApiOperation({ summary: "Hamkorni yangilash" })
  update(@Param("id") id: string, @Body() dto: UpdatePartnerDto) {
    return this.service.update(id, dto);
  }

  @Delete(":id")
  @UseGuards(JwtAuthGuard, PermissionGuard)
  @ApiBearerAuth("access-token")
  @ApiOperation({ summary: "Hamkorni o'chirish" })
  remove(@Param("id") id: string) {
    return this.service.remove(id);
  }
}
