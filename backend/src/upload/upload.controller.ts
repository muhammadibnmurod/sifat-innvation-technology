import {
  BadRequestException,
  Controller,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiTags } from "@nestjs/swagger";
import { diskStorage } from "multer";
import * as path from "path";
import * as crypto from "crypto";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { UPLOADS_DIR } from "../config";

@ApiTags("Rasm yuklash (upload)")
@Controller("upload")
export class UploadController {
  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth("access-token")
  @ApiOperation({ summary: "Rasm yuklash (5MB gacha) → { url }" })
  @ApiConsumes("multipart/form-data")
  @ApiBody({
    schema: {
      type: "object",
      properties: {
        image: { type: "string", format: "binary" },
      },
      required: ["image"],
    },
  })
  @UseInterceptors(
    FileInterceptor("image", {
      storage: diskStorage({
        destination: UPLOADS_DIR,
        filename: (_req, file, cb) => {
          const ext = path.extname(file.originalname).toLowerCase();
          cb(null, `${Date.now()}-${crypto.randomBytes(6).toString("hex")}${ext}`);
        },
      }),
      limits: { fileSize: 5 * 1024 * 1024 },
      fileFilter: (_req, file, cb) => {
        if (/^image\/(png|jpe?g|webp|gif|svg\+xml|avif)$/.test(file.mimetype)) cb(null, true);
        else cb(new BadRequestException("Faqat rasm fayllari qabul qilinadi"), false);
      },
    })
  )
  upload(@UploadedFile() file: Express.Multer.File) {
    if (!file) throw new BadRequestException("Fayl yuborilmadi");
    return { url: `/uploads/${file.filename}` };
  }
}
