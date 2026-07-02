import { Injectable } from "@nestjs/common";
import { CrudService, CrudConfig } from "../common/crud.service";
import { DatabaseService } from "../database/database.service";

@Injectable()
export class PartnersService extends CrudService {
  protected readonly config: CrudConfig = {
    table: "partners",
    fields: [
      { name: "name", required: true },
      { name: "logo" },
      { name: "url" },
      { name: "sort_order", default: 0 },
    ],
  };

  constructor(dbs: DatabaseService) {
    super(dbs);
  }
}
