import { Injectable } from "@nestjs/common";
import { CrudService, CrudConfig } from "../common/crud.service";
import { DatabaseService } from "../database/database.service";

@Injectable()
export class ServicesService extends CrudService {
  protected readonly config: CrudConfig = {
    table: "services",
    publicFilter: "active = 1",
    fields: [
      { name: "title", required: true },
      { name: "description" },
      { name: "icon", default: "Wrench" },
      { name: "image" },
      { name: "sort_order", default: 0 },
      { name: "active", default: 1 },
    ],
  };

  constructor(dbs: DatabaseService) {
    super(dbs);
  }
}
