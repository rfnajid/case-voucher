import { Injectable } from "@nestjs/common";
import { DataSource } from "typeorm";

@Injectable()
export class VoucherService {
  constructor(private dataSource: DataSource) {}
}