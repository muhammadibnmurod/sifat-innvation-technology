import { Injectable } from "@nestjs/common";
import { CrudService, CrudConfig } from "../common/crud.service";
import { DatabaseService } from "../database/database.service";

@Injectable()
export class FaqService extends CrudService {
  protected readonly config: CrudConfig = {
    table: "faq",
    fields: [
      { name: "question", required: true },
      { name: "answer", required: true },
      { name: "sort_order", default: 0 },
    ],
  };

  constructor(dbs: DatabaseService) {
    super(dbs);
  }
}
