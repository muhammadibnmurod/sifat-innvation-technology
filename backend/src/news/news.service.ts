import { Injectable } from "@nestjs/common";
import { CrudService, CrudConfig } from "../common/crud.service";
import { DatabaseService } from "../database/database.service";

@Injectable()
export class NewsService extends CrudService {
  protected readonly config: CrudConfig = {
    table: "news",
    orderBy: "date DESC, id DESC",
    publicFilter: "published = 1",
    fields: [
      { name: "title", required: true },
      { name: "excerpt" },
      { name: "body" },
      { name: "image" },
      { name: "category" },
      { name: "date" },
      { name: "published", default: 1 },
    ],
  };

  constructor(dbs: DatabaseService) {
    super(dbs);
  }
}
