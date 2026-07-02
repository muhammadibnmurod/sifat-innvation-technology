import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from "@nestjs/common";
import { Response } from "express";

// Frontend { error: "..." } formatini kutadi (eski Express API bilan moslik).
@Catch()
export class HttpErrorFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const res = host.switchToHttp().getResponse<Response>();

    let status = 500;
    let message = "Server xatosi";

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const body = exception.getResponse() as any;
      if (typeof body === "string") message = body;
      else if (Array.isArray(body?.message)) message = body.message[0];
      else message = body?.message || body?.error || message;
    } else if (exception instanceof Error) {
      console.error(exception);
    }

    res.status(status).json({ error: message });
  }
}
